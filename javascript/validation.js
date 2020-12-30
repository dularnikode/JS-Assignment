/*Module Validation */
var Validation=(function(){
    
    /**Validation Global flags*/
    let flagFirstname=false;
    let flagLastname=false;
    let flagUsername=false;
    let flagPassword=false;
    let flagValidDate=false;


    let firstName,lastName,userName,password,start,due;
    let errorMessage="";
    var _checkForSpaces=function(text){
        let pattern=/\s/;
        return pattern.test(text);
    };

    /*Update Profile on display*/
    var changeProfilePic= function(){

        let Image = document.getElementById("profilephoto").files[0];
        let imagereader = new FileReader();
        imagereader.readAsDataURL(Image);

        imagereader.onload = function ()
        {
            let imgdata = imagereader.result;
            SessionStorage.setData("displayImage", imgdata);//from module SessionStorage;
            document.getElementById("profileImage").src = imgdata;
        };
        
    };

    /*validation for first Name*/
    var validfName = function(){
        firstName=document.getElementById("fname").value;
        errField=document.getElementById("fnameError");    
        if(firstName==""){
            errorMessage="*Field can't be empty";
            flagFirstname=false;
        }
        else if(_checkForSpaces(firstName)==true){
            errorMessage="*Space is not allowed";
            flagFirstname=false;
        }
        else if(isNaN(firstName)!=true){
            errorMessage="*First Name can't be number";
            flagFirstname=false;
        }
        else if((firstName.length)<2 || (firstName.length)>15){
            errorMessage="*Name can't be less than 2 and greather than 15 character";
            flagFirstname=false;
        }
        else {
            errField.innerHTML="";
            flagFirstname=true;
        }
        errField.innerHTML=errorMessage;
        errorMessage="";
        return flagFirstname;
    };

    /*Validation for lastName*/
    var validlName=function(){
        lastName=document.getElementById("lname").value;
        errField=document.getElementById("lnameError");
        if(lastName==""){errorMessage="*Field can't be empty";flagLastname=false;}
        else if(_checkForSpaces(lastName)==true){
            errorMessage="*Space is not allowed";
            flagLastname=false;
        }
        else if(isNaN(lastName)!=true){
            errorMessage="*Last Name can't be number";
            flagLastname=false;
        }
        else if((lastName.length)<2 || (lastName.length)>15){
            errorMessage="*Last Name can't be less than 2 and greather than 15 character";
            flagLastname=false;
        }
        else {
            errField.innerHTML=errorMessage;
            flagLastname=true;
        }
        errField.innerHTML=errorMessage;
        errorMessage="";
        return flagLastname;
    };

    /*validation for userName*/
    var _validuName =function(){
        userName=document.getElementById("username").value;
        errField=document.getElementById("usernameError");
        if(userName==""){
            errorMessage="*Field can't be empty";
            flagUsername=false;
        }
        else if(_checkForSpaces(userName)==true){
            errorMessage="*Space is not allowed";
            flagUsername=false;
        }
        else if(isNaN(userName)!=true){
            errorMessage="*Username can't be number";
            flagUsername=false;
        }
        else if((userName.length)<8 || (userName.length)>20){
            errorMessage="*Username can't be less than 8 and greather than 20 character";
            flagUsername=false;
        }
        else {
            errField.innerHTML=errorMessage;
            flagUsername=true;
        }
        errField.innerHTML=errorMessage;
        errorMessage="";
    };

    /*validation for Password */
    var validPassword = function(){
        password=document.getElementById("password").value;
        errField=document.getElementById("passwordError");
        if(password==""){
            errorMessage="*Field can't be empty";
            flagPassword=false;
        }
        else if(_checkForSpaces(password)==true){
            errorMessage="*Space is not allowed";
            flagPassword=false;
        }
        else if((password.length)<8 || (password.length)>15){
            errorMessage="*Password can't be less than 8 and greather than 15 character";
            flagPassword=false;
        }
        else {
            errField.innerHTML=errorMessage;
            flagPassword=true;
        }
        errField.innerHTML=errorMessage;
        errorMessage="";
        return flagPassword;
    };

    /*validation for start and end date of task*/
    var validDate= function(){
        start=document.getElementById("sdate").value;
        due=document.getElementById("ddate").value;
        let message=document.getElementById("errdue");
        message.innerHTML="";
        if(start>due && start!="" && due!=""){
            flagValidDate=true;
            message.innerHTML=`Due date should be greather than start date : ${start}`;
        }
        else{
            flagValidDate=false;
        }
        return flagValidDate;
    };

    /*On clik function for sign up*/
    var submitSignUp=function(){


        let firstName=document.getElementById("fname").value;
        let lastName=document.getElementById("lname").value;
        let userName=document.getElementById("username").value;
        let password=document.getElementById("password").value;
        let address=document.getElementById("address").value;
        let profileImage=document.getElementById("profilephoto").value;

        let mal=document.getElementById("male").checked;
        let fem=document.getElementById("female").checked;
        
        let errorMessage;
        let gender="";
        if(fem){
            gender="Female";
        }
        else if (mal){
            gender="Male";
        }

        let exeUser=LocalStorage.getData(userName);//from module LocalStorage
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
        _validuName();
        validPassword();
        validfName();
        validlName();
        if(exeUser==null){
            document.getElementById("exeuserError").innerHTML="";
            if(firstName=="" || lastName=="" || userName=="" || password=="" || gender=="")
            {
                alert("*Please fill required details.");
            }
            else if(flagFirstname && flagLastname && flagPassword && flagUsername)
            {
                console.log(firstName,lastName,address,userName,password,profileImage,gender);
                let profilesrc=SessionStorage.getData("displayImage");//from module SessionStorage
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
                LocalStorage.setData(userName,user); //from module LocalStorage
                let data=LocalStorage.getData(userName); //from module LocalStorage
                console.log(data);
                alert(`${firstName} you signed in sucessfully`);
                let a=confirm("Do you want to login ?");
                if(a==true){window.location.href="../html/index.html";}
            }
            else{
                alert("*Please fill valid details");
            }

        }
    };

    /*Pubic Methods */
    return{
        submitSignUp:submitSignUp,
        validDate:validDate,
        validfName:validfName,
        validlName:validlName,
        validPassword:validPassword,
        changeProfilePic:changeProfilePic
    };

})();

