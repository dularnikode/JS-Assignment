

function profileUpdate(){
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));    
    
    document.getElementById("fname").value=user.firstNames;
    document.getElementById("lname").value=user.lastNames;
    document.getElementById("username").value=user.userNames;
    document.getElementById("password").value=user.passwords;
    document.getElementById("gender").value=user.genders;
    document.getElementById("address").value=user.addresss;
    document.getElementById("profilepic").src=user.profileImages;
}

document.addEventListener('DOMContentLoded',profileUpdate());