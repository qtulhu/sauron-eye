let selector = document.getElementById("adr_selector");
let modal_form_save_button = document.getElementById("ModalFormSaveButton");
let selected_adr = document.getElementById("new_invent_adr");
let htmlfloorCount = document.getElementById("floor_count");
let htmlporchCount = document.getElementById("porch_count");
let htmlapartamentCount = document.getElementById("apartament_count");
let no_info_block = document.getElementById("no_info");

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

function check_radio(){
    let inp = document.getElementsByName('techType');
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].type == "radio" && inp[i].checked) {
            return inp[i].id;
        }
    }
};

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


            new_req.onreadystatechange = function(){
                if (new_req.readyState != 4) return;
                if (new_req.status !=200){
                }
                else{
                    window.location.href = "/";
                }
            }
        }
    }
);
