"use strict";
function submitk(){

    let firstName=document.getElementById("fname").value;
    let lastName=document.getElementById("lname").value;
    let userName=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    let address=document.getElementById("address").value;
    let profileImage=document.getElementById("profilephoto").value;

    let mal=document.getElementById("male").checked;
    let fem=document.getElementById("female").checked;
    
    let errorMessage;
    let gender;
    if(fem){
        gender="Female";
    }
    else if (mal){
        gender="Male";
    }

    let exeUser=JSON.parse(localStorage.getItem(userName));
    console.log(exeUser);
    try{
        if(exeUser.userNames==userName){
            document.getElementById("exeuserError").innerHTML="*Username should be unique";
        }
    }
    catch(err)
    {
        console.log("new user signup");
    }
    
    validPassword();
    validfName();
    validlName();
    validuName();

    if(exeUser==null){
        document.getElementById("exeuserError").innerHTML="";
        if(firstName=="" || lastName=="" || userName=="" || password=="" || gender=="")
        {
            alert("*Please fill required details.");
        }
        else if(flagFirstname && flagLastname && flagPassword && flagUsername)
        {
            console.log(firstName,lastName,address,userName,password,profileImage,gender);
            let profilesrc=sessionStorage.getItem("displayImage");
            sessionStorage.removeItem("displayImage");
            let user={
                userNames:userName,
                passwords:password,
                firstNames:firstName,
                lastNames:lastName,
                genders:gender,
                addresss:address,
                profileImages:profilesrc,
                todotask:[],
            };
            localStorage.setItem(userName,JSON.stringify(user));
            let data=JSON.parse(localStorage.getItem(userName));
            console.log(data);
            alert(`${firstName} you signed in sucessfully`);
            let a=confirm("Do you want to login ?");
            if(a==true){window.location.href="../html/login.html";}
        }
        else{
            alert("*Please fill valid details");
            validuName();
            validPassword();
            validfName();
            validlName();
        }

    }
}


function changeProfilePic(){

    let Image = document.getElementById("profilephoto").files[0];
    let imagereader = new FileReader();
    imagereader.readAsDataURL(Image);

    imagereader.onload = function ()
    {
        let imgdata = imagereader.result;
        sessionStorage.setItem("displayImage", imgdata);
        document.getElementById("profileImage").src = imgdata;
    };
}
