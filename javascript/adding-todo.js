function addtodo(){
    let title=document.getElementById("title").value;
    let category=document.getElementById("category").value;
    let description=document.getElementById("des").value;
    let status=document.getElementById("stat").value;
    let start=document.getElementById("sdate").value;
    let due=document.getElementById("ddate").value;
    let todoObj={
        Title:title,
        Category:category,
        Description:description,
        Status:status,
        Start:start,
        Due:due,
    };
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    user.todotask.push(todoObj);
    localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));

    let gotoMain=confirm("Add New Todo ?");
    if (gotoMain==true){
        window.location="../html/addtodo.html";
    }
    else{
        window.location="../html/main.html";
    }
}

function clear(){
    sessionStorage.clear();
}
function showtodo(){
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    let arr=user.todotask;
    let i;
    for(i=0;i<arr.length;i++){
        appendData(i);
    }  
     function appendData(i){
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
            "<td><input type='button' class='button-edit' onclick='editToDo("+i+")' value='Edit'></td>";
            //<button id="button-del" class="button-del" onclick="deleteToDo('+i+')">Delete</button></td>';
        let node =document.getElementById("todotable");
        row.innerHTML=dataitem;
        node.appendChild(row);
    }
}

document.addEventListener('DOMContentLoaded',showtodo());

/*
function editToDo(i){
    window.location="../html/addtodo.html";
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    console.log(user);
    let arr=user.todotask;
    document.getElementById("title").value=user.todotask[i].Title;
    document.getElementById("category").value=user.todotask[i].Category;
    document.getElementById("des").value=user.todotask[i].Description;
    document.getElementById("sdate").value=arr[i].Start;
    document.getElementById("ddate").value=arr[i].Due;

    addtodo();
}
*/


function editToDo(i){

    let index=sessionStorage.setItem('index',i);
    window.location="../html/edittodo.html";

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
}



function classFilter(){
    let filterClass=document.getElementById('filter').value;
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    let arr=user.todotask;
    let i;
    let todoTable=document.getElementById('todotable');
    todoTable.innerHTML="";
    if(filterClass=='Personal'  || filterClass=='Social' || 'Office')
    {
        for(i=0;i<arr.length;i++)
        {
            if(arr[i].Category==filterClass)
            {
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
                    "<td><input type='button' class='button-edit' onclick='editToDo("+i+")' value='Edit'></td>";
                    //<button id="button-del" class="button-del" onclick="deleteToDo('+i+')">Delete</button></td>';
                row.innerHTML=dataitem;
                todoTable.appendChild(row);
            }       
        }
    }
    else if(filterClass=='All'){
        showtodo();
    }
}

