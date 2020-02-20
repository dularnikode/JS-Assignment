"use strict";

function submitk(){

    let firstName=document.getElementById("fname").value;
    let lastName=document.getElementById("lname").value;
    let userName=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    let address=document.getElementById("address").value;
    let profileImage=document.getElementById("profilephoto").value;

    let gender;
    let fem=document.getElementById("male").value;
    let mal=document.getElementById("female").value;

    let errorMessage;

    if(firstName=="" || lastName=="" || userName=="" || password=="")
    {
        alert("*Please fill required details.");
    }
    else
    {
        if(fem=="Female"){
            gender=fem;
        }
        else if (mal="Male"){
            gender=mal;
        }
        console.log(firstName,lastName,address,userName,password,profileImage,gender);
        
        let user={
            userNames:userName,
            passwords:password,
            firstNames:firstName,
            lastNames:lastName,
            genders:gender,
            addresss:address,
            profileImages:profileImage,
            todotask:[],
        };
        localStorage.setItem(userName,JSON.stringify(user));
        let data=JSON.parse(localStorage.getItem(userName));
        console.log(data);
        alert(`${firstName} you signed in sucessfully`);
        let a=confirm("Do you want to login ?");
        if(a==true){windows.location.href="../html/login.html";}
    }
}


function validfName(){
    let firstName=document.getElementById("fname").value;
    let errField=document.getElementById("fnameError");
    let errorMessage="";
    if(firstName==""){errorMessage="*Field can't be empty";}
    else if(isNaN(firstName)!=true){errorMessage="*First Name can't be number";}
    else if((firstName.length)<2 || (firstName.length)>15){
        errorMessage="*Name can't be less than 2 and greather than 15 character";
    }
    else {
        errField.innerHTML="";
    }
    errField.innerHTML=errorMessage;
}

function validlName(){
    let lastName=document.getElementById("lname").value;
    let errField=document.getElementById("lnameError");
    let errorMessage="";
    if(lastName==""){errorMessage="*Field can't be empty";}
    else if(isNaN(lastName)!=true){errorMessage="*Last Name can't be number";}
    else if((lastName.length)<2 || (lastName.length)>15){
        errorMessage="*Last Name can't be less than 2 and greather than 15 character";
    }
    else {
        errField.innerHTML=errorMessage;
    }
    errField.innerHTML=errorMessage;
}

function validuName(){
    let userName=document.getElementById("username").value;
    let errField=document.getElementById("usernameError");
    let errorMessage="";
    if(userName==""){errorMessage="*Field can't be empty";}
    else if(isNaN(userName)!=true){errorMessage="*Username can't be number";}
    else if((userName.length)<8 || (userName.length)>20){
        errorMessage="*Username can't be less than 8 and greather than 20 character";
    }
    else {
        errField.innerHTML=errorMessage;
    }
    errField.innerHTML=errorMessage;
}

function validPassword(){
    let password=document.getElementById("password").value;
    let errField=document.getElementById("passwordError");
    let errorMessage="";
    if(password==""){errorMessage="Field can't be empty";}
    else if((password.length)<8 || (password.length)>15){
        errorMessage="Password can't be less than 8 and greather than 15 character";
    }
    else {
        errField.innerHTML=errorMessage;
    }
    errField.innerHTML=errorMessage;
}
