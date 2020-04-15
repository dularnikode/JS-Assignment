checklogin();

var todo=(function(){

    let user=LocalStorage.getUser();
    let arr=user.todotask;
    let scriptButton="";
    let node;
    var CheckAllDone=function(){
        user=LocalStorage.getUser();
        arr=user.todotask;
        let i;
        let countDonePending=[0,0];//element0 =done and element 1=pending
        for(i=0;i<arr.length;i++){
            if(arr[i].Status!="Done"){
                countDonePending[1]+=1;
            }
            else{
                countDonePending[0]+=1;
            }
        }
        return countDonePending;
    };
    var addtodo=function(){
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
            user.todotask.push(todoObj);
            LocalStorage.setUser(user);
            alert("Todo added Sucessfully");
            let gotoMain=confirm("Add Another Todo?");
            if (gotoMain==true){
                window.location.href="../html/addtodo.html";
            }
            else{
                window.location.href="../html/main.html";
            }
        }

    };

    var showtodo = function(){
        node =document.getElementById("todotable");
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
        
        for(i=0;i<arr.length;i++){
            if(arr[i].Status=="Done"){
                scriptButton="<td><input type='button' id='button-del' class='button-del delete-button' onclick='todo.deleteSingleToDo("+i+")' value='Delete'></td>";                
            }
            else if(arr[i].Status=="Pending")
            {
                scriptButton="<td><input type='button' class='button-edit' onclick='todo.editToDo("+i+")' value='Edit'></td>";
            }
            appendData(i);

        }  
        let DonePending=CheckAllDone();//element 0 =done and element 1=pending
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
    }; 

    var appendData =function(i){
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
        row.innerHTML=dataitem;
        node.appendChild(row);
    };

    var deleteSingleToDo = function(i){
        user.todotask.splice(i,1);
        LocalStorage.setUser(user);
        showtodo();
    };

    var deleteToDo= function(){
        arr=user.todotask;
        let i;
        let x=document.getElementsByClassName("checkbox");
        for(i=0;i<arr.length;i++){
            if(x[i].checked==true){
                user.todotask.splice(i,1,undefined);
                console.log("iteration",i,"array:",user.todotask);
            }
            else{
                console.log("inside else : ",i);
            }
        }

        arr = arr.filter(function(element){
            return element !== undefined;
        });
        user.todotask=arr;
        LocalStorage.setUser(user);
        showtodo();
    };

    var classFilter=function(){
        let filterClass=document.getElementById('filter').value;
        arr=user.todotask;
        let i;
        let todoTable=document.getElementById('todotable');
        todoTable.innerHTML="";
        document.getElementById("showInfoMessage").innerHTML="";
        scriptButton="";
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
                        scriptButton="<td><input type='button' id='button-del' class='button-del delete-button' onclick='todo.deleteSingleToDo("+i+")' value='Delete'></td>";              
                    }
                    else if(arr[i].Status=="Pending")
                    {
                        scriptButton="<td><input type='button' class='button-edit' onclick='todo.editToDo("+i+")' value='Edit'></td>";
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
    };

    

    var markDone= function(){
        user=LocalStorage.getUser();
        arr=user.todotask;
        let i;
        let x=document.getElementsByClassName("checkbox");
        for(i=0;i<arr.length;i++){
            if(x[i].checked==true){
                arr[i].Status="Done";
                console.log("iteration",i,"array:",user.todotask);
            }
            else{
                console.log("inside else : ",i);
            }
        }
        user.todotask=arr;
        LocalStorage.setUser(user);
        showtodo();    
    };

    var selectAllCheckbox= function(){
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
    };
    var editToDo=function(i){
        let index=sessionStorage.setItem('index',i);
        window.location.href="../html/edittodo.html";
    }

    return {
        classFilter:classFilter,
        markDone:markDone,
        selectAllCheckbox:selectAllCheckbox,
        showtodo:showtodo,
        addtodo:addtodo,
        deleteSingleToDo:deleteSingleToDo,
        editToDo:editToDo,
        deleteToDo:deleteToDo

    };

})();
document.addEventListener('DOMContentLoaded',todo.showtodo());


/*



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
        let user=LocalStorage.getUser();
        user.todotask.push(todoObj);
        LocalStorage.setUser(user);
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


function showtodo(){
    let user=LocalStorage.getUser();
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
        row.innerHTML=dataitem;
        node.appendChild(row);
    }
    let DonePending=CheckAllDone();//element 0 =done and element 1=pending
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
    let user=LocalStorage.getUser();
    user.todotask.splice(i,1);
    LocalStorage.setUser(user);
    showtodo();
}

function deleteToDo(){
    let user=LocalStorage.getUser();
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
    LocalStorage.setUser(user);
    showtodo();
}

document.addEventListener('DOMContentLoaded',showtodo());

function classFilter(){
    let filterClass=document.getElementById('filter').value;
    let user=LocalStorage.getUser();
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
    let user=LocalStorage.getUser();
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
    LocalStorage.setUser(user);
    showtodo();
}


function CheckAllDone(){
    let user=LocalStorage.getUser();
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
*/