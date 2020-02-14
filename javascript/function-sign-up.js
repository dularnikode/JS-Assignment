"use strict";

function submitk(){

let firstName=document.getElementById("fname").value;
let lastName=document.getElementById("lname").value;
let address=document.getElementById("address").value;
let userName=document.getElementById("username").value;
let password=document.getElementById("password").value;
let profileImage=document.getElementById("profilephoto").value;
let gender=document.getElementById("male").value || document.getElementById("female").value;
console.log(firstName,lastName,address,userName,password,profileImage,gender);

let user={
    userNames:userName,
    passwords:password,
    firstNames:firstName,
    lastNames:lastName,
    genders:gender,
    addresss:address,
    profileImages:profileImage,
};
localStorage.setItem(userName,JSON.stringify(user));
let data=JSON.parse(localStorage.getItem(userName));
console.log(Object.value(data));
}


function login(){
    let uid=document.getElementById("username").value;
    let pass=document.getElementById("password").value;
    let user=JSON.parse(localStorage.getItem(uid));
    
    if(user.userNames==uid && user.passwords==pass)
    {
        alert("sucessfully loged in");
        console.log("sucessful");
        window.location="../html/main.html";
    }
    else
    {   
        console.log("unsucessfull");
        document.getElementById("error").innerHTML="Incorrect Email or Password";

    }    
    let profileurl=user.profileImages;
    document.getElementById("profile").src=profileurl;
}

