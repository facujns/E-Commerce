const btn = document.querySelector('#btn');
const googleBtn = document.querySelector('#googleBtn');
const email = document.getElementById('inputEmail');
btn.addEventListener('click', function() {
    if(verificarPass() && verificarEmail() && verificarTerminos()){
       localStorage.setItem('user', email.value.split("@")[0]);
      
       window.location.href ='./index.html';
    }
    else if(verificarPass() && verificarEmail()){
        sessionStorage.setItem('user', email.value.split('@')[0]);
        window.location.href ='./index.html';
    }
    else if(!verificarPass() && !verificarEmail()){
        mostrarErrorEmail();
        mostrarErrorPassword();
    }
    else if(verificarEmail()){
       
        document.getElementById('alertError2').style.display = "block";
        document.getElementById('alertError2').style.color = "red";
        document.getElementById('alertError2').style.fontStyle = "bold";
        document.getElementById('inputPassword').style.border = "solid 2.5px red"

    }
    else if(verificarPass()){
      
        document.getElementById('alertError').style.display = "block";
        document.getElementById('alertError').style.color = "red";
        document.getElementById('alertError').style.fontStyle = "bold";
        document.getElementById('inputEmail').style.border = "solid 2.5px red"

    }
    
   
});
function mostrarErrorEmail(){
    document.getElementById('alertError').style.display = "block";
    document.getElementById('alertError').style.color = "red";
    document.getElementById('alertError').style.fontStyle = "bold";
    document.getElementById('inputEmail').style.border = "solid 2.5px red"
}
function mostrarErrorPassword(){
    document.getElementById('alertError2').style.display = "block";
    document.getElementById('alertError2').style.color = "red";
    document.getElementById('alertError2').style.fontStyle = "bold";
    document.getElementById('inputPassword').style.border = "solid 2.5px red"
}
function verificarTerminos(){
    if(document.getElementById('check').checked){
        return true;
    }
    else{
        return false;
    }}

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
