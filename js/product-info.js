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
document.getElementById('container').innerHTML += showCarrousel();


//  CARROUSEL DE IMAGENES
function showCarrousel(){
    let carrousel = ` <div id="carouselExampleControls" class="carousel slide w-75 container" data-bs-ride="carousel" style="max-height:400px;">
<button class="carousel-control-prev bg-secondary" type="button"style="width:8%;" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
<span class="carousel-control-prev-icon  aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next bg-secondary" style="width:8%;" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>
<div class="carousel-inner" >
    <div class="carousel-item active" style="height:400px;">
      <img src="${data.images[0]}" class="d-block m-auto" style="height:100%;width:100%;"  alt="...">
    </div>`
    for(i=1;i< data.images.length;i++){
    carrousel += 
    `
    
     <div class="carousel-item " style="height:400px;">    
      <img src="${data.images[i]}" class="d-block m-auto" style="height:100%;width:100%;"alt="...">
    </div>`}
    carrousel += `
  </div>
</div>`
    
return carrousel

}


   

// PRODUCTOS RELACIONADOS
document.getElementById('relatedProds').innerHTML += `<hr>
<h4>Productos relacionados</h4>`

for(relatedProds of data.relatedProducts){
    document.getElementById('relatedProds').innerHTML += `


<div class="col">

<img onclick="setProdID(${relatedProds.id})"class="card-img-top" style="width: 19rem; cursor:pointer;" src="${relatedProds.image}" alt="Card image cap" onclick="setProdID()">
<h5 class="ms-1">${relatedProds.name}</h5>


</div> ` 
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
            <div class="list-group-item" style="background-color:#EAF5F0; border: 1px solid black;">
            <div class="row" style="background-color:#EAF5F0">
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

// FUNCION PARA MOSTRAR LAS ESTRELLAS
function showStars(cantidad){
    let starsHTML = "";
    for(i=0;i<cantidad;i++){
        starsHTML += `<span class="fa fa-star checked"></span>`;
    }
    for(i=cantidad; i < 5;i++){
        starsHTML += `</span> <span class="fa fa-star"></span>`;
    }
    return starsHTML
}
function setProdID(id){
    localStorage.setItem('prodID', id );
    window.location = "product-info.html"
  }                       



  // MOSTRAR PERFIL // BOTON INICIO DE SESIONJ
sesionOn();
function showUser(){
    document.getElementById('showUser').innerHTML = 
    
    ` <a class="nav-link dropdown-toggle text-dark fw-bold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    ${localStorage.getItem('user') || sessionStorage.getItem('user')}
    </a>
    <ul class="dropdown-menu bg-light">
    <li><a class="dropdown-item text-dark" href="./cart.html">Carrito</a></li>
    <li><a class="dropdown-item text-dark" href="./my-profile.html">Mi perfil</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item text-dark" href="#" onclick="cerrarSesion()">Cerrar Sesión</a></li>
    </ul>`
    
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


