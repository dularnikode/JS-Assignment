
function login(){
    let uid=document.getElementById("username").value;
    let pass=document.getElementById("password").value;
    let user=JSON.parse(localStorage.getItem(uid));
    
    if(user.userNames==uid && user.passwords==pass)
    {
        //alert("sucessfully loged in");
        console.log("sucessful");
        window.location="../html/main.html";
    }
    else
    {   
        console.log("unsucessfull");
    }    
    sessionStorage.setItem('userid',uid);
}

