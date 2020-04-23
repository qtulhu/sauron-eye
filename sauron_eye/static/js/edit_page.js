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
