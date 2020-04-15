var LocalStorage=(function(){
    
    var getUser =function(){
        let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')))
        return user;
    }
    var setUser=function(user){
        localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
    }
    return {
        getUser:getUser,
        setUser:setUser,
    }
})();

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

function checklogin(){
    let a=sessionStorage.getItem("userid");
    if(a==null){
        alert("*Please login first");
        window.location.href="../html/index.html";
    }
}

let flagFirstname=false;
let flagLastname=false;
let flagUsername=false;
let flagPassword=false;
let flagValidDate=false;

function clearLog(){
    sessionStorage.clear();
}