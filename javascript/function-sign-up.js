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
let mal=document.getElementById("female").value;;
if(fem=true){
    gender=fem;
}
else{
    gender=male;
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
alert("all sucessfull");
}

