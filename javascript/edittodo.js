

let i=sessionStorage.getItem('index');
let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
(function(){
    document.getElementById("title").value=user.todotask[i].Title;
    document.getElementById("category").value=user.todotask[i].Category;
    document.getElementById("des").value=user.todotask[i].Description;
    document.getElementById("stat").value=user.todotask[i].Status;
    document.getElementById("sdate").value=user.todotask[i].Start;
    document.getElementById("ddate").value=user.todotask[i].Due;
})();

function saveEdited(){
    user.todotask[i].Title=document.getElementById("title").value=user.todotask[i].Title;
    user.todotask[i].Category=document.getElementById("category").value;
    user.todotask[i].Description=document.getElementById("des").value;
    user.todotask[i].Status=document.getElementById("stat").value;
    user.todotask[i].Start=document.getElementById("sdate").value;
    user.todotask[i].Due=document.getElementById("ddate").value;
    localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
    alert("Edited Sucessfully");
    let a=confirm("Go to MY TODO");
    if(a==true){
        window.location.href="../html/main.html";
    }
}

function validDate(){
    let start=document.getElementById("sdate").value;
    let due=document.getElementById("ddate").value;
    let message=document.getElementById("errdue");
    message.innerHTML="";
    if(start>due){
        message.innerHTML=`Due date should be greather than start date : ${start}`;
    }
}