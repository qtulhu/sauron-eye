const file_selectors = document.querySelectorAll('.form-control-file.border')
const all_checkbox_element = document.querySelectorAll('.form-check-input')
const all_comment_element = document.querySelectorAll('input.form-control-sm')
const all_ratings_element = document.querySelectorAll('select.form-control-sm')

const all_checkbox = [];

class Checkbox {
  constructor(id,porch){
    this.id = id;
    this.porch = porch;
    this.rating = parseInt(1,10);
    this.comment = '';
    this.checked_status = false;
    this.photo = 'blank';
  }
  porch;
  id;
  checked_status;
  photo;
  comment;
  rating;


  updatePhoto(photo){
    this.photo = photo;
  }
  updateComment(comment){
    this.comment = comment;
  }
  updateRating(rating){
    this.rating = rating;
  }
  updateCheckedStatus(checked_status){
    this.checked_status = checked_status;
  }
}

Array.from(file_selectors).forEach(el => {
  id = el.id
  porch = id.slice(id.indexOf('p=')+'p='.length,id.indexOf('&'));
  c_id = id.slice(id.indexOf('&p=')+'&p='.length,id.length);
  all_checkbox.push(new Checkbox(c_id,porch))

  el.addEventListener('change',
    async function (event) {
      let id = event.target.id
      porch = id.slice(id.indexOf('p=')+'p='.length,id.indexOf('&'));
      c_id = id.slice(id.indexOf('&p=')+'&p='.length,id.length);
      num = (parseInt(porch, 10)-1) * 24 + parseInt(c_id, 10) -1;
      let selectedElement = all_checkbox[num];
      let photo = event.target.files[0];
      let compressedPhoto = await CompressPhoto(photo,selectedElement);
    }
  )
})

Array.from(all_checkbox_element).forEach(el => {
  el.addEventListener('change',
    function (event) {
      let id = event.target.id.replace('p=1&p=','');
      porch = id.slice(id.indexOf('p=')+'p='.length,id.indexOf('&'));
      c_id = id.slice(id.indexOf('c=')+'c='.length,id.length);
      num = (parseInt(porch, 10)-1) * 24 + parseInt(c_id, 10) -1;
      let selectedElement = all_checkbox[num];
      selectedElement.updateCheckedStatus(event.target.checked);
    }
  )
})

Array.from(all_comment_element).forEach(el => {
  el.addEventListener('change',
    function (event) {
      let id = event.target.id
      porch = id.slice(id.indexOf('p=')+'p='.length,id.indexOf('&'));
      c_id = id.slice(id.indexOf('f=')+'f='.length,id.length);
      num = (parseInt(porch, 10)-1) * 24 + parseInt(c_id, 10) -1;
      let selectedElement = all_checkbox[num];
      selectedElement.updateComment(event.target.value);
    }
  )
})

Array.from(all_ratings_element).forEach(el => {
  el.addEventListener('change',
    function (event) {
      let id = event.target.id
      porch = id.slice(id.indexOf('p=')+'p='.length,id.indexOf('&'));
      c_id = id.slice(id.indexOf('s=')+'s='.length,id.length);
      num = (parseInt(porch, 10)-1) * 24 + parseInt(c_id, 10) -1;
      let selectedElement = all_checkbox[num];
      selectedElement.updateRating(event.target.value);
    }
  )
})

let push_info_button = document.getElementById('push_porch_info_to_base')

push_info_button.addEventListener('click',
  function (event) {
    json = []
    Array.from(all_checkbox).forEach(el => {
      if (el.checked_status == true){
        json.push(el);
      }
    })
    json = JSON.stringify(json);

    let url = 'push_porch_info_to_base';
    let push_porch_info_request = new XMLHttpRequest();
    push_porch_info_request.open('POST',url,true);
    let token = getCookie('csrftoken');
    push_porch_info_request.setRequestHeader("X-CSRFToken", token);

    if (window.FormData !== undefined){
        let data = new FormData();
        data.append("id", document.getElementById('id_id').innerHTML );
        data.append('json_house_info',json);
        push_porch_info_request.send(data);
        push_porch_info_request.onreadystatechange = function(){
            if (push_porch_info_request.readyState != 4){
                // cssload.style = 'display:block';
                return false;
            };

            if (push_porch_info_request.status !=200){
              }
            else{
              location.href = "/";
              // location.reload();
              return false;
            }
        }
    }




  })

function CompressPhoto(photo, element){
  let fileType = photo.type;
  let reader = new FileReader();
  var photo_obj
  reader.readAsDataURL(photo);
  reader.onload = function(){
    let image = new Image();
    image.src = reader.result;
    image.onload = async function () {
      let maxWidth = 720,
      maxHeight = 1280,
      imageWidth = image.width,
      imageHeight = image.height;
      if (imageWidth > imageHeight) {
        if (imageWidth > maxWidth) {
          imageHeight *= maxWidth / imageWidth;
          imageWidth = maxWidth;
        }
      }
      else {
        if (imageHeight > maxHeight) {
          imageWidth *= maxHeight / imageHeight;
          imageHeight = maxHeight;
        }
      }
      let canvas = document.createElement('canvas');
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      let ctx = await canvas.getContext("2d");
      await ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
      let finalFile = await canvas.toDataURL('image/jpeg', 0.3);
      // photo_obj =  {
      //   // 'name' : event.target.id,
      //   'data' : finalFile,
      // }
      element.updatePhoto(finalFile);
    }
  }
  return false;
}
