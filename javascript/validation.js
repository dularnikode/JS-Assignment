// function checknull(entry){
//     if(entry==null){
//         return true;
//     }
//     else{
//         return false;
//     }
// }


// let commError="Incorrect username/password";
// let incorrectUser="Username can't be empty";
// let incorrectPass="Password can't be empty";

(function(){
    let a=sessionStorage.getItem("userid");
    if(a==null){
        alert("*Please login first");
        window.location.href="../html/login.html";
    }
}
)();
