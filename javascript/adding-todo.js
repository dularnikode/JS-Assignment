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
        Start:start,
        Due:due,
    };
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    user.todotask.push(todoObj);
    localStorage.setItem(sessionStorage.getItem('userid'),JSON.stringify(user));

    let gotoMain=confirm("Add New Todo ?");
    if (gotoMain){
        window.location="../html/addtodo.html";
    }
    else{
        window.location="../html/main.html"
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
            "<td>"+`${checkbox}`+"</td>"+
            "<td>"+arr[i].Title+"</td>"+
            "<td>"+arr[i].Category+"</td>"+
            "<td>"+arr[i].Description+"</td>"+
            "<td>"+arr[i].Start+"</td>"+
            "<td>"+arr[i].Due+"</td>"+
            '<td><button class="button-edit" onclick="editToDo('+i+')>Edit</button></td>';
            //<button id="button-del" class="button-del" onclick="deleteToDo('+i+')">Delete</button></td>';
        row.innerHTML=dataitem;
        let node =document.getElementById("todotable");
        node.appendChild(row);
    }
}
document.addEventListener('DOMContentLoaded',showtodo());


function editToDo(i){
    window.location="../html/addtodo.html";
    let user=JSON.parse(localStorage.getItem(sessionStorage.getItem('userid')));
    let arr=user.todotask;
    document.getElementById("title").value=arr[i].Title;
    document.getElementById("category").value=arr[i].Category;
    document.getElementById("des").value=arr[i].Description;
    document.getElementById("sdate").value=arr[i].Start;
    document.getElementById("ddate").value=arr[i].Due;
}

function deleteTodo(){

}