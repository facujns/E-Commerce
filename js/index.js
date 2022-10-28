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