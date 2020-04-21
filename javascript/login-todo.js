
/*Login Module*/
var login =(function(){
    let uid;
    let pass;



    /*check username and password field are empty or not */
    var _checkUserPassword=function (){
            if(_checknull(uid)==true && _checknull(pass)==true){
                return false;
            }
        };
    
    /*Check If username field id empty */
    var _checkUser=function(){
        if(_checknull(uid)==true){
            return false;
        }
    };

    /*check if Password field is empty */
    var _checkPassword=function(){
        if(_checknull(pass)==true){
            return false;
        }
    };
    /*Check for Null value*/
    var _checknull=function(entry){
        if(entry==''){
            return true;
        }
        else{
            return false;
        }
    };

    /*For Login Validation*/
    var userLogin=function(){  
        uid=document.getElementById("username").value;
        pass=document.getElementById("password").value; 
        let errorMessage="";
        document.getElementById("error").innerHTML="";
        document.getElementById("logUserError").innerHTML="";
        document.getElementById("logPassError").innerHTML="";
        try{
            let user=LocalStorage.getData(uid);//from module LocalStorage
            if(user.userNames==uid)
            {
                if(user.passwords==pass)
                {
                    document.getElementById('error').innerHTML=errorMessage; 
                    SessionStorage.setData('userid',uid);//from module SessionStorage
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
            if(_checkUserPassword()==false){
                errorMessage="username and password can't be empty";
            }
            else if(_checkUser()==false || _checkPassword()==false){
                errorMessage="";
                if(_checkUser()==false){
                document.getElementById("logUserError").innerHTML="username can't be empty";
                }
                if(_checkPassword()==false){
                    document.getElementById("logPassError").innerHTML="Password can't be empty";
                }
            }
            document.getElementById("error").innerHTML=errorMessage;
        }
    };

    /*Public Method*/
    return {
        userLogin:userLogin
        };
})();

