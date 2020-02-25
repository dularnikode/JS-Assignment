function login(){ 
    let uid=document.getElementById("username").value;
    let pass=document.getElementById("password").value;   
    let errorMessage="";
    try{
        let user=JSON.parse(localStorage.getItem(uid));
        if(user.userNames==uid && user.passwords==pass)
        {
            //alert("sucessfully loged in");
            document.getElementById('error').innerHTML=errorMessage;
            alert(`${uid} you logged in sucessfully`);
            sessionStorage.setItem('userid',uid);
            window.location.href="../html/main.html";
        }
        else{
            errorMessage="Incorrect Username/Password";
        }
    }
    catch(err){
        console.log("unsucessfull");
        errorMessage="Incorrect Username/Password";    
    } 
    finally{
        function checkup(){
            if(checknull(uid)==true || checknull(pass)==true){
                return false;
            }
        }
        if(checkup()==false){
            errorMessage="username or password can't be empty";
        }
        document.getElementById("error").innerHTML=errorMessage;
    }
}
// function checkup(){
//     if(checknull(uid)==true || checknull(pass)==true){
//         return false;
//     }
// }
function checknull(entry){
    if(entry==''){
        return true;
    }
    else{
        return false;
    }
}