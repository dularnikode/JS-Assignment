// function checknull(entry){
//     if(entry==null){
//         return true;
//     }
//     else{
//         return false;
//     }
// }


// let commError="Incorrect username/password";
// let incorrectUser="Username can't be empty";
// let incorrectPass="Password can't be empty";

let flagFirstname=false;
let flagLastname=false;
let flagUsername=false;
let flagPassword=false;

function checklogin(){
    let a=sessionStorage.getItem("userid");
    if(a==null){
        alert("*Please login first");
        window.location.href="../html/login.html";
    }
}

function validfName(){
    let firstName=document.getElementById("fname").value;
    let errField=document.getElementById("fnameError");
    let errorMessage="";
    if(firstName==""){
        errorMessage="*Field can't be empty";
        flagFirstname=false;
    }
    else if(checkForSpaces(firstName)==true){
        errorMessage="*Space is not allowed";
        flagFirstname=false;
    }
    else if(isNaN(firstName)!=true){
        errorMessage="*First Name can't be number";
        flagFirstname=false;
    }
    else if((firstName.length)<2 || (firstName.length)>15){
        errorMessage="*Name can't be less than 2 and greather than 15 character";
        flagFirstname=false;
    }
    else {
        errField.innerHTML="";
        flagFirstname=true;
    }
    errField.innerHTML=errorMessage;
}

function validlName(){
    let lastName=document.getElementById("lname").value;
    let errField=document.getElementById("lnameError");
    let errorMessage="";
    if(lastName==""){errorMessage="*Field can't be empty";flagLastname=false;}
    else if(checkForSpaces(lastName)==true){
        errorMessage="*Space is not allowed";
        flagLastname=false;
    }
    else if(isNaN(lastName)!=true){
        errorMessage="*Last Name can't be number";
        flagLastname=false;
    }
    else if((lastName.length)<2 || (lastName.length)>15){
        errorMessage="*Last Name can't be less than 2 and greather than 15 character";
        flagLastname=false;
    }
    else {
        errField.innerHTML=errorMessage;
        flagLastname=true;
    }
    errField.innerHTML=errorMessage;
}

function validuName(){
    let userName=document.getElementById("username").value;
    let errField=document.getElementById("usernameError");
    let errorMessage="";
    if(userName==""){
        errorMessage="*Field can't be empty";
        flagUsername=false;
    }
    else if(checkForSpaces(userName)==true){
        errorMessage="*Space is not allowed";
        flagUsername=false;
    }
    else if(isNaN(userName)!=true){
        errorMessage="*Username can't be number";
        flagUsername=false;
    }
    else if((userName.length)<8 || (userName.length)>20){
        errorMessage="*Username can't be less than 8 and greather than 20 character";
        flagUsername=false;
    }
    else {
        errField.innerHTML=errorMessage;
        flagUsername=true;
    }
    errField.innerHTML=errorMessage;
}

function validPassword(){
    let password=document.getElementById("password").value;
    let errField=document.getElementById("passwordError");
    let errorMessage="";
    if(password==""){
        errorMessage="*Field can't be empty";
        flagPassword=false;
    }
    else if(checkForSpaces(password)==true){
        errorMessage="*Space is not allowed";
        flagPassword=false;
    }
    else if((password.length)<8 || (password.length)>15){
        errorMessage="*Password can't be less than 8 and greather than 15 character";
        flagPassword=false;
    }
    else {
        errField.innerHTML=errorMessage;
        flagPassword=true;
    }
    errField.innerHTML=errorMessage;
}


function checkForSpaces(text){
    let pattern=/\s/;
    return pattern.test(text);
}
