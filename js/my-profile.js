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

