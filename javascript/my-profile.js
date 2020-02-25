checklogin();
let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid'))); 
function profileUpdate(){  
    document.getElementById("fname").value=user.firstNames;
    document.getElementById("lname").value=user.lastNames;
    document.getElementById("username").value=user.userNames;
    document.getElementById("password").value=user.passwords;
    document.getElementById("address").value=user.addresss;
    document.getElementById("profilepic").src=user.profileImages;
    if(user.genders=="Male"){
        document.getElementById("male").checked=true;
    }
    else{
        document.getElementById("female").checked=true;
    }
}
document.addEventListener('DOMContentLoaded',profileUpdate());

function adding(){
/************************* */
    validPassword();
    validfName();
    validlName();
    if(flagFirstname && flagLastname && flagPassword)
    {
        user.firstNames=document.getElementById("fname").value;
        user.lastNames=document.getElementById("lname").value;
        user.passwords=document.getElementById("password").value;
        user.addresss=document.getElementById("address").value;
        let mal=document.getElementById("male").checked;
        let fem=document.getElementById("female").checked;
        try{
        user.profile=sessionStorage.getItem("displayImage");
        sessionStorage.removeItem("displayImage");
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
        localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
        console.log("Profile edited sucesslully");
        alert("Edited Sucessfully");
    }
    else{
        alert("*Please fill valid details");
        validPassword();
        validfName();
        validlName();
    }
/***************************/
}

function changeProfilePic(){

    let Image = document.getElementById("profilephoto").files[0];
    let imagereader = new FileReader();
    imagereader.readAsDataURL(Image);

    imagereader.onload = function ()
    {
        let imgdata = imagereader.result;
        sessionStorage.setItem("displayImage", imgdata);
        document.getElementById("profilepic").src = imgdata;
    };
    
}