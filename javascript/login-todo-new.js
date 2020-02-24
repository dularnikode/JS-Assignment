
function login(){ 
    let uid=document.getElementById("username").value;
    let pass=document.getElementById("password").value;   
    let errorMessage="";
    document.getElementById("error").innerHTML="";
    document.getElementById("logUserError").innerHTML="";
    document.getElementById("logPassError").innerHTML="";
    try{
        let user=JSON.parse(localStorage.getItem(uid));
        if(user.userNames==uid)
        {
            if(user.passwords==pass)
            {
                document.getElementById('error').innerHTML=errorMessage; 
                sessionStorage.setItem('userid',uid);
                window.location.href="../html/main.html";
                alert(`${uid} you logged in sucessfully`);
            }
            else{
                errorMessage="Incorrect Password";
            }
        }
        else{
            errorMessage="User dosen't exist ! Please signup";
        }
    }
    catch(err){
        console.log("unsucessfull");
        errorMessage="User dosen't exist ! Please signup";
    } 
    finally{
        function checkup(){
            if(checknull(uid)==true && checknull(pass)==true){
                return false;
            }
        }
        function checku(){
            if(checknull(uid)==true){
                return false;
            }
        }
        function checkp(){
            if(checknull(pass)==true){
                return false;
            }
        }
        if(checkup()==false){
            errorMessage="username and password can't be empty";
        }
        else if(checku()==false || checkp()==false){
            errorMessage="";
            if(checku()==false){
            document.getElementById("logUserError").innerHTML="username can't be empty";
            }
            if(checkp()==false){
                document.getElementById("logPassError").innerHTML="Password can't be empty";
            }
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