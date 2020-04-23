let selector = document.getElementById("adr_selector");
let selected_adr = document.getElementById("new_invent_adr");
let htmlfloorCount = document.getElementById("floor_count");
let htmlporchCount = document.getElementById("porch_count");
let htmlapartamentCount = document.getElementById("apartament_count");
let modal_form_save_button = document.getElementById("ModalFormSaveButton");
let no_info_block = document.getElementById("no_info");

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

selector.addEventListener("click",
    function(event) {
        modal_form_save_button.disabled = false;
        let request = $('#suggest').val();
        selected_adr.innerHTML = request;
        event.preventDefault();
        url = 'base_check?adr='+request;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url ,true);
        xhr.send();
        xhr.onreadystatechange = function(){
          if (xhr.readyState != 4) return;
          if (xhr.status !=200){
            no_info_block.style = 'display:block'
          }
          else{
            let response = JSON.parse(xhr.responseText);
            htmlfloorCount.innerHTML = "Этажей: " + response['floor_count'];
            htmlporchCount.innerHTML = "Подъездов: " + response['porch_count'];
            htmlapartamentCount.innerHTML = "Количество жилых помещений: " + response['apartament_count'];
            if (response['no_info'] == 'true'){
              no_info_block.style = 'display:block'
            } else {
              no_info_block.style = 'display:none'
            }
          }
        }
    }
);

modal_form_save_button.addEventListener("click",
    function(event) {
        let url = 'create';
        let new_req = new XMLHttpRequest();
        new_req.open('POST',url);
        let token = getCookie('csrftoken');
        new_req.setRequestHeader("X-CSRFToken", token);

        let inventor_name_id = document.getElementById("users").value;

        let card_pic = document.getElementById("card_pic");
        let file = card_pic.files[0];

        if (window.FormData !== undefined){
            let data = new FormData();
            data.append("photo",file);
            data.append("adr",selected_adr.innerHTML);
            data.append("floor",htmlfloorCount.innerHTML.replace('Этажей: ','').replace('Этажей:','0'));
            data.append("porch",htmlporchCount.innerHTML.replace('Подъездов: ','').replace('Подъездов:','0'));
            data.append("apart",htmlapartamentCount.innerHTML.replace('Количество жилых помещений: ','').replace('Количество жилых помещений:','0'));
            data.append("techType",check_radio());
            data.append("inventor_id",inventor_name_id);
            new_req.send(data);
            window.location.href = "/";
        }

    }
);

function check_radio(){
    let inp = document.getElementsByName('techType');
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].type == "radio" && inp[i].checked) {
            return inp[i].id;
        }
    }
};

let refresh_info_button = document.getElementById('refresh_info')

refresh_info_button.addEventListener("click",
    function(event){
        let cssload = document.getElementById('bowlG');
        let url = 'confirm_edit';
        let refresh_info_request = new XMLHttpRequest();
        refresh_info_request.open('POST',url);
        let token = getCookie('csrftoken');
        refresh_info_request.setRequestHeader("X-CSRFToken", token);

        if (window.FormData !== undefined){
            let data = new FormData();
            let user = document.getElementById('users');
            let techtype = document.getElementById('techType');

            data.append("id", document.getElementById('id_id').innerHTML );
            data.append("floor_count",$('#edit_floor_count').val());
            data.append("porch_count",$('#edit_porch_count').val());
            data.append("apartament_count",$('#edit_apartament_count').val());
            data.append("inventor_id_id",user.value.replace('Исполнители',''));
            data.append("tech_type",techtype.value.replace('Технология подключения',''));
            refresh_info_request.send(data);

            refresh_info_request.onreadystatechange = function(){
              if (refresh_info_request.readyState != 4){
                  cssload.style = 'display:block';
                  return false;
              };

              if (refresh_info_request.status !=200){
                }
              else{
                location.reload();
                return false;
              }
            }
        }
    }
)
let push_info_button = document.getElementById('push_porch_info_to_base')

push_info_button.addEventListener("click",
    function(event){
        let url = 'push_porch_info_to_base';
        let push_porch_info_request = new XMLHttpRequest();
        push_porch_info_request.open('POST',url);
        let token = getCookie('csrftoken');
        push_porch_info_request.setRequestHeader("X-CSRFToken", token);
        let porch_count = document.getElementById('edit_page_porch_count')
        let house_info = {};

        for (let p = 1;p<=porch_count.innerHTML;p++){
            let porch_name = 'porch_' + p;
            house_info[porch_name] = {'number':p};
            for (let c = 1;c<=24;c++){
                let checkbox_id = 'p=' + p + '&c=' + c;
                let checkbox = document.getElementById(checkbox_id);
                if (checkbox.checked == true){
                    let input_id = 'p=' + p + '&f=' + c;
                    let input = document.getElementById(input_id);
                    let select_id = 'p=' + p + '&s=' + c;
                    let select = document.getElementById(select_id);
                    let object_checkbox = {
                        'id':c,
                        'input' :{'value' : input.value,},
                        'select' :{'value' : select.value,},
                    }
                    house_info[porch_name]['checkbox_'+c] = object_checkbox;
                }
            }
        }


        json_house_info = JSON.stringify(house_info);

        // var json_house_info = encode( json_house_info );


        let blob_house_info = new Blob([json_house_info], { type: "application/json"});
      	// var blob = new Blob( [ data ], {
      	// 	type: 'application/octet-stream'
      	// });



        if (window.FormData !== undefined){
            let data = new FormData();
            data.append("id", document.getElementById('id_id').innerHTML );
            data.append('house_info',house_info);
            data.append('json_house_info',json_house_info);
            data.append('blob_house_info',blob_house_info);
            console.log(data);
            console.log(data['house_info']);
            console.log(data['blob_house_info']);
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
        return false;
    }
)
