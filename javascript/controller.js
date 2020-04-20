/*Module Local storage*/
var LocalStorage=(function(){
    /*Getting user object*/
    var getUser =function(){
        let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')))
        return user;
    }

    /*Setting Userr Object*/
    var setUser=function(user){
        localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
    }

    /*Public Method*/
    return {
        getUser:getUser,
        setUser:setUser,
    };
})();


/*function to load Profile on page load*/
(function(){
    try{
        let user=LocalStorage.getUser();
        document.getElementById("showuserName").innerHTML=user.userNames;
        if(user.profileImages!=null){
            document.getElementById("profile").src=user.profileImages;
        }
        else
        {
            document.getElementById("profile").src="../images/default_user.jpg";
        }
    }
    catch(err){
        console.log("source not found ! Error occued "+err);
    }
})();


/*To check user login or not */
function checklogin(){
    let a=sessionStorage.getItem("userid");
    if(a==null){
        alert("*Please login first");
        window.location.href="../html/index.html";
    }
}

/**Validation Global flags*/
let flagFirstname=false;
let flagLastname=false;
let flagUsername=false;
let flagPassword=false;
let flagValidDate=false;

/*clear session storage when logout*/
function clearLog(){
    sessionStorage.clear();
}