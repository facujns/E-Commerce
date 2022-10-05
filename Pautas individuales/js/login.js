const btn = document.querySelector('#btn');
const googleBtn = document.querySelector('#googleBtn');
const email = document.getElementById('inputEmail');
btn.addEventListener('click', function() {
    if(verificarPass() && verificarEmail() && verificarTerminos()){
        localStorage.setItem('user', email.value);
        window.location.href ='./index.html';
    }
    else if(verificarPass() && verificarEmail()){
        sessionStorage.setItem('user', email.value);
        window.location.href ='./index.html';
    }
    else{
        showAlertError();
    }
});

function verificarTerminos(){
    if(document.getElementById('check').checked){
        return true;
    }
    else{
        return false;
    }}
function showAlertError(){
    document.getElementById("alert-danger").classList.add("show");
}
function verificarEmail(){
    if(email.value.length < 1){
        return false;
    }
    else{
        return true;
    }}
function verificarPass(){
    if(document.getElementById('inputPassword').value.length < 1 ){
        return false;
    }
    else{
        return true;
    }}
function onSignIn(googleUser) {
var profile = googleUser.getBasicProfile();
console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
console.log('Name: ' + profile.getName());
console.log('Image URL: ' + profile.getImageUrl());
console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
googleBtn.addEventListener('click', function(){
    setTimeout(function(){
        window.location.href ='./index.html';
    }, 7000);
   
    });