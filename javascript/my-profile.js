
let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid'))); 
function profileUpdate(){  
    document.getElementById("fname").value=user.firstNames;
    document.getElementById("lname").value=user.lastNames;
    document.getElementById("username").value=user.userNames;
    document.getElementById("password").value=user.passwords;
    document.getElementById("gender").value=user.genders;
    document.getElementById("address").value=user.addresss;
    document.getElementById("profilepic").src=user.profileImages;
}

document.addEventListener('DOMContentLoded',profileUpdate());

function adding(){
    user.firstNames=document.getElementById("fname").value;
    user.lastNames=document.getElementById("lname").value;
    user.userNames=document.getElementById("username").value;
    user.passwords=document.getElementById("password").value;
    user.genders=document.getElementById("gender").value;
    user.addresss=document.getElementById("address").value;
    user.profileImages=document.getElementById("profilepic").src;
    localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
    alert("Edited Sucessfully");
}