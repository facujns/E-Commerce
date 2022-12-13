let producto = {};
let precioUni = 0;
let cantidad = 0
let subtotal = 0;
let costoEnvio = 0;
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          paywayError();
          event.preventDefault()
          event.stopPropagation()
                
        }
      
        else if(form.checkValidity()){

             document.getElementById('successMessage').classList.replace('d-none','d-block');
   }
          form.classList.add('was-validated')        
    
  }, false)

     })
})()

fetch(CART_INFO_URL + "25801" + EXT_TYPE)
.then(resp => resp.json())
.then(data => {
producto = data;
console.log(producto)
  showArticulo(producto)
  tipoEnvio();
  costos();


})

function showArticulo(){

  precioUni = producto.articles[0].unitCost;
  listaDesplegable = `
  <td><img class="img-thumbnail" src="${producto.articles[0].image}" style="width:100px"</td>
  <td>${producto.articles[0].name}</td>
  <td>${producto.articles[0].currency} ${producto.articles[0].unitCost}</td>
  <td> <input type="number" id="articleCount" value=1 onchange="subTotal(),precioFinal()" min="1" style="width:50px;"></td>
  <td id="subtotalCost"><strong>${producto.articles[0].currency} ${precioUni}</strong></td>
  `

  document.getElementById('tableInfo').innerHTML = listaDesplegable;
}


function subTotal(){
  precioUni = producto.articles[0].unitCost;
  cantidad = document.getElementById('articleCount').value;
  subtotal = precioUni * cantidad ;
  subtotalFinal = producto.articles[0].currency + " " + subtotal;
  document.getElementById('subtotalCost').innerHTML =    `<strong>${producto.articles[0].currency} ${subtotal}</strong>  ` ;
  document.getElementById('subtotalFinal').innerHTML =  subtotalFinal;

}
document.getElementById('subtotalFinal').innerHTML = subtotalFinal;

function tipoEnvio(){
   cantidad = document.getElementById('articleCount').value;
  
  subtotal = precioUni * cantidad ;
  premium = subtotal * 0.15;
  express = subtotal * 0.07;
  standard = subtotal * 0.05;
  costoEnvio = premium;
  document.getElementById('costoEnvio').innerHTML = producto.articles[0].currency + " " + costoEnvio;
  document.getElementById('precioTotal').innerHTML = producto.articles[0].currency +" " + (subtotal + costoEnvio) ;

  document.getElementById('premium').addEventListener('click', function(){
  costoEnvio = premium;
  document.getElementById('costoEnvio').innerHTML = producto.articles[0].currency + " " + costoEnvio;
  document.getElementById('precioTotal').innerHTML = subtotal + costoEnvio;
  })
  document.getElementById('express').addEventListener('click', function(){
  costoEnvio = express;
  document.getElementById('costoEnvio').innerHTML =  producto.articles[0].currency + " " +  costoEnvio;
  document.getElementById('precioTotal').innerHTML = producto.articles[0].currency +" " + (subtotal + costoEnvio) ;
  })
  document.getElementById('standard').addEventListener('click', function(){
  costoEnvio = standard;
  document.getElementById('costoEnvio').innerHTML = producto.articles[0].currency + " " +  costoEnvio;
  document.getElementById('precioTotal').innerHTML = producto.articles[0].currency +" " + (subtotal + costoEnvio) ;
})
}

function costos(){
  precioUni = producto.articles[0].unitCost;
  cantidad = document.getElementById('articleCount').value;
  subtotal = precioUni * cantidad ;
  costoEnvio = premium;
  subtotalFinal = producto.articles[0].currency + " " + subtotal;
  document.getElementById('subtotalFinal').innerHTML = subtotalFinal;
  
   
}
function precioFinal(){
  document.getElementById('precioTotal').innerHTML = producto.articles[0].currency +" " + (subtotal + costoEnvio) ;
}

let creditCard = document.getElementById('creditCard');
creditCard.addEventListener('click',function(){

  document.getElementById('creditField').removeAttribute('disabled',"")
  document.getElementById('bankField').setAttribute('disabled',"")
  document.getElementById('paywaymethod').innerHTML = "Tarjeta de Crédito";
})
let bankTransfer = document.getElementById('bankTransfer')
bankTransfer.addEventListener('click',function(){
  document.getElementById('bankField').removeAttribute('disabled',"")
  document.getElementById('creditField').setAttribute('disabled',"")
  document.getElementById('paywaymethod').innerHTML = "Transferencia bancaria";
})
  
function paywayError(){
  
  if(!creditCard.checked && !bankTransfer.checked){
    document.getElementById('paywayError').innerHTML = "Debes seleccionar un método de pago";
  }
else if(creditCard.checked || bankTransfer.checked){
    document.getElementById('paywayError').innerHTML = "";
  }
}
  
  
  // MOSTRAR PERFIL // BOTON INICIO DE SESION
  sesionOn();
  function showUser(){
    document.getElementById('showUser').innerHTML = 
    
    ` <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    ${localStorage.getItem('user') || sessionStorage.getItem('user')}
    </a>
    <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="./cart.html">Carrito</a></li>
    <li><a class="dropdown-item" href="./my-profile.html">Mi perfil</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#" onclick="cerrarSesion()">Cerrar Sesión</a></li>
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
    localStorage.removeItem('user'), sessionStorage.removeItem('user');
    location.reload();
    };     

