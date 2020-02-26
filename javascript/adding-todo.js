checklogin();
function addtodo(){
    let title=document.getElementById("title").value;
    let category=document.getElementById("category").value;
    let description=document.getElementById("des").value;
    let start=document.getElementById("sdate").value;
    let due=document.getElementById("ddate").value;
    let todoObj={
        Title:title,
        Category:category,
        Description:description,
        Status:"Pending",
        Start:start,
        Due:due,
    };
    if(title=="" || start=="" || due==""){
      alert("*Please fill required details");  
    }
    else if(flagValidDate==true){
        alert("Please fill valid details");
    }
    else{
        let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
        user.todotask.push(todoObj);
        localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
        alert("Todo added Sucessfully");
        let gotoMain=confirm("Add Another Todo?");
        if (gotoMain==true){
            window.location.href="../html/addtodo.html";
        }
        else{
            window.location.href="../html/main.html";
        }
    }
}

function clearLog(){
    sessionStorage.clear();
}
function showtodo(){
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    let arr=user.todotask;
    let node =document.getElementById("todotable");
    document.getElementById("multipleDelButton").style.display="none";
    document.getElementById("multipleDoneButton").style.display="none";
    if(arr.length<=1){
        document.getElementById("commonCheckbox").style.display="none";
    }
    else{
        document.getElementById("commonCheckbox").style.display="inline-block";
    }
    node.innerHTML="";
    let i;
    let scriptButton="";
    for(i=0;i<arr.length;i++){
        if(arr[i].Status=="Done"){
            scriptButton="<td><input type='button' id='button-del' class='button-del delete-button' onclick='deleteSingleToDo("+i+")' value='Delete'></td>";                
        }
        else if(arr[i].Status=="Pending")
        {
            scriptButton="<td><input type='button' class='button-edit' onclick='editToDo("+i+")' value='Edit'></td>";
        }
        appendData(i);

    }  
     function appendData(i){
        const row=document.createElement("tr");
        let checkbox='<input type="checkbox" class="checkbox">';
        const dataitem=
            "<td>"+checkbox+"</td>"+
            "<td>"+arr[i].Title+"</td>"+
            "<td>"+arr[i].Category+"</td>"+
            "<td class='elip-description'>"+arr[i].Description+"</td>"+
            "<td>"+arr[i].Status+"</td>"+
            "<td>"+arr[i].Start+"</td>"+
            "<td>"+arr[i].Due+"</td>"+
            scriptButton;
            // "<td><input type='button' class='button-edit' onclick='editToDo("+i+")' value='Edit'><input type='button' id='button-del' class='button-del' onclick='deleteToDo("+i+") value='Delete'></td>";
            //<button id="button-del" class="button-del" onclick="deleteToDo('+i+')">Delete</button></td>';
        row.innerHTML=dataitem;
        node.appendChild(row);
    }
    let DonePending=CheckAllDone();//element0 =done and element 1=pending
    if (DonePending[0]>1){
        document.getElementById("multipleDelButton").style.display="block";
    }
    if(DonePending[1]>0){
        document.getElementById("multipleDoneButton").style.display="block";
    }
    if(DonePending[1]==0 && DonePending[0]==0)
    {
        document.getElementById("showInfoMessage").innerHTML="NO TODO SEEN ! Please Add TODO";
    }
}

function editToDo(i){
    let index=sessionStorage.setItem('index',i);
    window.location.href="../html/edittodo.html";
}

function deleteSingleToDo(i){
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    user.todotask.splice(i,1);
    localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
    showtodo();
}

function deleteToDo(){
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    let arr1=user.todotask;
    let i;
    let x=document.getElementsByClassName("checkbox");
    for(i=0;i<arr1.length;i++){
        if(x[i].checked==true){
            user.todotask.splice(i,1,undefined);
            console.log("iteration",i,"array:",user.todotask);
        }
        else{
            console.log("inside else : ",i);
        }
    }

    arr1 = arr1.filter(function(element){
        return element !== undefined;
     });
    user.todotask=arr1;
    localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
    showtodo();
}

document.addEventListener('DOMContentLoaded',showtodo());

function classFilter(){
    let filterClass=document.getElementById('filter').value;
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    let arr=user.todotask;
    let i;
    let todoTable=document.getElementById('todotable');
    todoTable.innerHTML="";
    document.getElementById("showInfoMessage").innerHTML="";
    let scriptButton="";
    let flagCategoryfound=false;
    let count=0;
    if(filterClass=='Personal'  || filterClass=='Social' ||filterClass=='Office')
    {
        for(i=0;i<arr.length;i++)
        {
            if(arr[i].Category==filterClass)
           {   
               count+=1;  
               flagCategoryfound="true";
               if(arr[i].Status=="Done"){
                    scriptButton="<td><input type='button' id='button-del' class='button-del delete-button' onclick='deleteSingleToDo("+i+")' value='Delete'></td>";              
                }
                else if(arr[i].Status=="Pending")
                {
                    scriptButton="<td><input type='button' class='button-edit' onclick='editToDo("+i+")' value='Edit'></td>";
                }
                const row=document.createElement("tr");
                let checkbox='<input type="checkbox" class="checkbox">';
                const dataitem=
                    "<td>"+checkbox+"</td>"+
                    "<td>"+arr[i].Title+"</td>"+
                    "<td>"+arr[i].Category+"</td>"+
                    "<td>"+arr[i].Description+"</td>"+
                    "<td>"+arr[i].Status+"</td>"+
                    "<td>"+arr[i].Start+"</td>"+
                    "<td>"+arr[i].Due+"</td>"+
                    scriptButton;
                    // "<td><input type='button' class='button-edit' onclick='editToDo("+i+")' value='Edit'><input type='button' id='button-del' class='button-del' onclick='deleteToDo("+i+") value='Delete'></td>";
                    //<button id="button-del" class="button-del" onclick="deleteToDo('+i+')">Delete</button></td>';
                row.innerHTML=dataitem;
                todoTable.appendChild(row);
            }       
        }
        if(count<=1){
            document.getElementById("commonCheckbox").style.display="none";
        }
        else{
            document.getElementById("commonCheckbox").style.display="inline-block";
        }
    
        if(flagCategoryfound==false){
            document.getElementById("showInfoMessage").innerHTML=`NO TODO SEEN of category ${filterClass}! Please Add TODO`;
        }
    }
    else{
        showtodo();
    }
}



function markDone(){
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    let arr1=user.todotask;
    let i;
    let x=document.getElementsByClassName("checkbox");
    for(i=0;i<arr1.length;i++){
        if(x[i].checked==true){
            arr1[i].Status="Done";
            console.log("iteration",i,"array:",user.todotask);
        }
        else{
            console.log("inside else : ",i);
        }
    }
    user.todotask=arr1;
    localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));
    showtodo();
}


function CheckAllDone(){
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    let arr1=user.todotask;
    let i;
    let countDonePending=[0,0];//element0 =done and element 1=pending
    for(i=0;i<arr1.length;i++){
        if(arr1[i].Status!="Done"){
            countDonePending[1]+=1;
        }
        else{
            countDonePending[0]+=1;
        }
    }
    return countDonePending;
}


function selectAllCheckbox(){
    let comCheckbox=document.getElementById("commonCheckbox");
    let x=document.getElementsByClassName("checkbox");
    let i;
    if(comCheckbox.checked==true){
        for(i=0;i<x.length;i++){
            x[i].checked=true;
        }
    }
    else{
        for(i=0;i<x.length;i++){
            x[i].checked=false;
        }
    }
}