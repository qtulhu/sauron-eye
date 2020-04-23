// let img = document.createElement("img");
// let reader = new FileReader();
// reader.readAsDataURL(card_pic);
// reader.onload = function(e) {img.src = e.target.result}
// console.log(reader);

// let MAX_WIDTH = 800;
// let MAX_HEIGHT = 600;
// let width = img.width;
// let height = img.height;
//
// if (width > height) {
//     if (width > MAX_WIDTH) {
//     height *= MAX_WIDTH / width;
//     width = MAX_WIDTH;
//     }
// } else {
//     if (height > MAX_HEIGHT) {
//     width *= MAX_HEIGHT / height;
//     height = MAX_HEIGHT;
//     }
// }
// let canvas = document.createElement('canvas');
// canvas.width = width;
// canvas.height = height;
// let ctx = canvas.getContext("2d");
// ctx.drawImage(img, 0, 0, width, height);
//
// console.log('ctx',ctx);
// console.log('canvas',canvas);
//
// let imgData = ctx.createImageData(width, height);
// let data = imgData.data;
// let pixels = ctx.getImageData(0, 0, width, height);
// for (let i = 0, ii = pixels.data.length; i < ii; i += 4) {
//     let r = pixels.data[i + 0];
//     let g =pixels.data[i + 1];
//     let b = this.pixels.data[i + 2];
//     data[i + 0] = (r * .393) + (g *.769) + (b * .189);
//     data[i + 1] = (r * .349) + (g *.686) + (b * .168)
//     data[i + 2] = (r * .272) + (g *.534) + (b * .131)
//     data[i + 3] = 255;
// }
// ctx.putImageData(imgData, 0, 0);
// let file = canvas.mozGetAsFile("foo.png");
// console.log(file);



                        // let reader = new FileReader();
                        // reader.readAsDataURL(card_pic);
                        //
                        // reader.onload = function(){
                        //   let image = new Image();
                        //   image.onload = function () {
                        //     console.log('1',image);
                        //     image.src = reader.result;
                        //     console.log('2',image);
                        //
                        //     let canvas = document.createElement('canvas');
                        //     canvas.width = 300;
                        //     canvas.height = 234;
                        //     let ctx = canvas.getContext('2d');
                        //     ctx.drawImage(image, 0,0,300,234);
                        //     console.log('ctx',ctx);
                        //     console.log('canvas',canvas);
                        //     document.body.appendChild(canvas);
                        //   }
                        //
                        // }



                        // let BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
                        // //получаем данные в виде base64, второй параметр задает качество (от 0 до 1)
                        // // let sBase64 = canva.toDataURL(type, 1);
                        //
                        //
                        // let aBase64 = finalFile.split(',');
                        // //раскодируем обратно
                        // let sData = atob(aBase64[1]);
                        // let aBufferView = new Uint8Array(sData.length);
                        // //создаем ArrayBuffer на основе строки
                        // for (let i = 0; i < aBufferView.length; i++) {
                        //     aBufferView[i] = sData.charCodeAt(i);
                        // }
                        // // с помощью BlobBuilder переводим в blob
                        // let builder = new BlobBuilder();
                        // builder.append(aBufferView.buffer);
                        // let new_photo = builder.getBlob(type);

                        //
                        // let blob_finalFile = new Blob([finalFile], {type: 'image/jpeg'})
                        // console.log('blob_finalFile - ',blob_finalFile);
                        //
                        // let new_photo = canvas.getImageData
                        // let blob_new_photo = new Blob([new_photo], {type: 'image/jpeg'})
                        // data.append('photo',blob_finalFile);
                        // data.append('photo',blob_new_photo);
                        // console.log('blob_new_photo - ',blob_new_photo);
                        // console.log('new_photo - ',new_photo);





// let new_photo = canvas.toBlob(function(blob){
//     data.append('photo',blob,photo_id+'.jpg');
//     console.log('blob - ',blob,photo_id+'.jpg');       это вроде работает
//     console.log('4',data);
//     push_porch_info_request.send(data);
// })
                //
                // let BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
                //
                // let sBase64 = canvas.toDataURL('image/jpeg', 0.7);
                // let aBase64 = sBase64.split(',');
                // let sData = atob(aBase64[1]);
                // let aBufferView = new Uint8Array(sData.length);
                // for (let i = 0; i < aBufferView.length; i++) {
                //     aBufferView[i] = sData.charCodeAt(i);
                // }
                // let builder = new BlobBuilder();
                // builder.append(aBufferView.buffer);
                // var blobData = builder.getBlob('image/jpeg');


                // let new_photo = new Blob([decodedFinal], {type: 'image/jpeg'})
                // console.log('new_photo - ',new_photo);
                // data.append('photo',new_photo,photo_id+'.jpg');
