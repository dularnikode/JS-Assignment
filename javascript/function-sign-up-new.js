"use strict";
let flagFirstname=false;
let flagLastname=false;
let flagUsername=false;
let flagPassword=false;



function submitk(){

    let firstName=document.getElementById("fname").value;
    let lastName=document.getElementById("lname").value;
    let userName=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    let address=document.getElementById("address").value;
    let profileImage=document.getElementById("profilephoto").value;

    let fem=document.getElementById("male").value;
    let mal=document.getElementById("female").value;
    
    let errorMessage;
    let gender;
    if(fem=="Female"){
        gender=fem;
    }
    else if (mal=="Male"){
        gender=mal;
    }

    let exeUser=JSON.parse(localStorage.getItem(userName));
    console.log(exeUser);
    try{
        if(exeUser.userNames==userName){
            document.getElementById("exeuserError").innerHTML="*Username should be unique";
        }
    }
    catch(err)
    {
        console.log("new user signup");
    }
    
    validPassword();
    validfName();
    validlName();
    validuName();

    if(exeUser==null){
        document.getElementById("exeuserError").innerHTML="";
        if(firstName=="" || lastName=="" || userName=="" || password=="" || gender=="")
        {
            alert("*Please fill required details.");
        }
        else if(flagFirstname && flagLastname && flagPassword && flagUsername)
        {
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
            if(a==true){window.location.href="../html/login.html";}
        }
        else{
            alert("*Please fill valid details");
            validuName();
            validPassword();
            validfName();
            validlName();
        }

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
        errorMessage="Field can't be empty";
        flagPassword=false;
    }
    else if((password.length)<8 || (password.length)>15){
        errorMessage="Password can't be less than 8 and greather than 15 character";
        flagPassword=false;
    }
    else {
        errField.innerHTML=errorMessage;
        flagPassword=true;
    }
    errField.innerHTML=errorMessage;
}
