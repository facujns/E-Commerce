const prodID = localStorage.getItem('prodID');


                                //  INFORMACION DEL PRODUCTO
fetch(PRODUCT_INFO_URL + prodID + EXT_TYPE)
.then(resp => resp.json())
.then(data => {

document.getElementById('container').innerHTML += `<div class="list-group-item infoYcomm">
<div class="row">
<div class="col-12"><h3>${data.name}</h3>
<hr>
<strong>Precio</strong>
<p>${data.currency} ${data.cost}</p>
<strong>Descripción</strong>
<p>${data.description}</p>
<strong>Categoria</strong>
<p>${data.category}</p>
<strong>Cantidad de vendidos</strong>
<p>${data.soldCount}</p>
<strong>Imagenes Ilustrativas</strong>
</div>    
</div>
</div>
`
for(i=0;i< data.images.length;i++){
    document.getElementById('container').innerHTML +=
        `<img src="${data.images[i]}" class="m-3" style="width:20%;border: solid 1.5px grey;"></img> `
}
})
// FETCH DE LOS COMENTARIOS
const commentBtn = document.getElementById('comment-btn');
const textArea = document.getElementById('product-info-textarea');
const prodScore = document.getElementById('comment-select');

fetch(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE)
.then(resp => resp.json())
.then(data => {  

document.getElementById('container2').innefurHTML +=`
<h4>Comentarios</h4>`

for(let comment of data){ 
    document.getElementById('container2').innerHTML +=`
        <div class="list-group-item infoYcomm">
        <div class="row">
        <div class="col-12">
        <strong>${comment.user}</strong> - ${comment.dateTime} - ${showStars(comment.score)}
        <p>${comment.description}</p>
        </div>
        </div>
        </div>`
    
    }

// AGREGAR COMENTARIOS
    commentBtn.addEventListener('click', function crearComentario(){
            console.log(textArea.value);
            console.log(prodScore.value);
            console.log(localStorage.getItem('user'));
            
            let today = new Date();
            const fecha = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
            const hora =  `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
            if((textArea.value != "") && (localStorage.getItem('user') != null || sessionStorage.getItem('user') != null)){ 
            document.getElementById('container2').innerHTML +=`
            <div class="list-group-item">
            <div class="row">
            <div class="col-12">
            <strong>${localStorage.getItem('user') || sessionStorage.getItem('user')}</strong> - ${fecha} ${hora} - ${showStars(prodScore.value)}
            <p>${textArea.value}</p>
            </div>
            </div>
            </div>`
        }
        showAlerts(); 
    })  
})
function showAlerts(){
    
    if(localStorage.getItem('user') == null && sessionStorage.getItem('user') == null ){
       
         alertify.alert('<i class="fa fa-close" style="font-size:30px;color:red;"></i><strong style="font-size:23px;"> Error al comentar</strong>', '<p style="font-size: 18px;">Debes iniciar sesión para poder comentar</p>', 'Iniciar Sesion');

     }
    else if((localStorage.getItem('user') != null || sessionStorage.getItem('user') != null) && (textArea.value == '')){
        document.getElementById('product-info-textarea').style.border = "solid 2px red"
        document.getElementById('alertError').style.display = "block"
        document.getElementById('alertError').style.color = "red"
        }
        
}
    document.getElementById('product-info-textarea').addEventListener('click', function(){
        document.getElementById('alertError').style.display = "none"
        document.getElementById('product-info-textarea').style.border = "solid 1px black"

    })


function showStars(cantidad){
    let starsHTML = "";
    for(i=0;i<cantidad;i++){
        starsHTML += `<span class="fa fa-star checked"></span>`;
    }
    for(i=cantidad; i < 5;i++){
        starsHTML += `<span class="fa fa-star"></span>`;
    }
    return starsHTML
}   



  // MOSTRAR PERFIL // BOTON INICIO DE SESIONJ
sesionOn();
function showUser(){
document.getElementById('showUser').innerHTML = 
`<div class="dropdown"><a class="nav-link usuario">${localStorage.getItem('user') || sessionStorage.getItem('user')}</a>
    <div class="dropdown-content">
    <a class="nav-link" onclick="cerrarSesion()">Cerrar Sesion</a>
    </div>
</div> `;
}
function sesionOn(){
if(localStorage.getItem('user') || sessionStorage.getItem('user'))
showUser();
else{
document.getElementById('showUser').innerHTML = 
`<button type="button" class="button-15" id="indexBtn" role="button">Iniciar Sesion</button>`
document.querySelector('#indexBtn').addEventListener('click', function(){
window.location.href = './login.html';
})
}}
function cerrarSesion(){
localStorage.removeItem('user') , sessionStorage.removeItem('user');
location.reload();
};     


