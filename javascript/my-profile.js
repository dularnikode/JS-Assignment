SessionStorage.checklogin();
/*Profie Module */
var profile=(function(){
    let user=LocalStorage.getUser();

    /**Update Profile*/
    var profileUpdate=function(){  
        document.getElementById("fname").value=user.firstNames;
        document.getElementById("lname").value=user.lastNames;
        document.getElementById("username").value=user.userNames;
        document.getElementById("password").value=user.passwords;
        document.getElementById("address").value=user.addresss;
        if(user.profileImages!=null){
            document.getElementById("profilepic").src=user.profileImages;
        }
        else{
            document.getElementById("profilepic").src="../images/default_user.jpg";
        }
        if(user.genders=="Male"){
            document.getElementById("male").checked=true;
        }
        else{
            document.getElementById("female").checked=true;
        }
    };

    /** change Pofile Pic*/
    var changeProfilePic= function(){

        let Image = document.getElementById("profilephoto").files[0];
        let imagereader = new FileReader();
        imagereader.readAsDataURL(Image);

        imagereader.onload = function ()
        {
            let imgdata = imagereader.result;
            sessionStorage.setItem("displayImage", imgdata);
            document.getElementById("profilepic").src = imgdata;
        };
        
    };

    /**Save changed data*/
    var adding=function(){
        let flagPassword=Validation.validPassword();
        let flagFName=Validation.validfName();
        let flagLName=Validation.validlName();
        if(flagFName && flagLName && flagPassword)
        {
            user.firstNames=document.getElementById("fname").value;
            user.lastNames=document.getElementById("lname").value;
            user.passwords=document.getElementById("password").value;
            user.addresss=document.getElementById("address").value;
            let mal=document.getElementById("male").checked;
            let fem=document.getElementById("female").checked;
            let mypic;
            try{
            mypic=sessionStorage.getItem("displayImage");
            sessionStorage.removeItem("displayImage");
            if(mypic!=null){
                document.getElementById("profilepic").src=mypic;
            }
            else{
                document.getElementById("profilepic").src="../images/default_user.jpg";
            }
            }
            catch(err){
                console.log("image not found");
            }
            let gender;
            if(fem){
                gender="Female";
            }
            else{
                gender="Male";
            }
            user.genders=gender;
            user.profileImages=document.getElementById("profilepic").src;
            document.getElementById('profile').src=user.profileImages;
            localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
            console.log("Profile edited sucesslully");
            alert("Edited Sucessfully");
        }
        else{
            alert("*Please fill valid details");
        }
    };

    /**Public Method*/
    return {
        adding:adding,
        changeProfilePic:changeProfilePic,
        profileUpdate:profileUpdate
    };

})();
document.addEventListener('DOMContentLoaded',profile.profileUpdate());
