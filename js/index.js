sesionOn();
function showUser(){
    document.getElementById('showUser').innerHTML = 
    
    ` <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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




document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});