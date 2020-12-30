/*Module Local storage*/
var LocalStorage=(function(){
    let data;
    let key;
    /*Getting user object*/
    var getUser =function(){
        let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')))
        return user;
    }

    /*Setting Userr Object*/
    var setUser=function(user){
        localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
    }

    function getData(data){
        let value;
        try{
            value=JSON.parse(localStorage.getItem(data));
        }
        catch(e){
            console.log("can't fetch")
        }
        return value;
    }
    function setData(key,data){
        localStorage.setItem(key,JSON.stringify(data));
    }
    /*Public Method*/
    return {
        getUser:getUser,
        setUser:setUser,
        getData:getData,
        setData:setData
    };
})();


/**Module Session Storage*/
var SessionStorage=(function(){
      /*To check user login or not */

      let data;
      let key;
    function checklogin(){
        let a=sessionStorage.getItem("userid");
        if(a==null){
            alert("*Please login first");
            window.location.href="../html/index.html";
        }
    }
    
    /*clear session storage when logout*/
    function clearLog(){
            sessionStorage.clear();
    }

    function getData(data){
        return sessionStorage.getItem(data);
    }
    function setData(key,data){
        sessionStorage.setItem(key,data);
    }
    return{
        checklogin:checklogin,
        clearLog:clearLog,
        getData:getData,
        setData:setData
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

/*Fallback scenario*/
(function(){
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
    } catch(e) {
        alert("Local Storage is not availabel")
    }
})();