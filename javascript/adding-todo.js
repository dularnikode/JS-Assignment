checklogin();
/*Module todo*/
var todo=(function(){

    let user=LocalStorage.getUser();
    let arr=user.todotask;
    let scriptButton="";
    let node;

    /**check of pending & done*/
    var CheckAllDone=function(){
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

    /**Adding to do*/
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

    /*showing Todo */
    var showtodo = function(){
        node =document.getElementById("todotable");
        document.getElementById("multipleDelButton").classList.remove("display-on");
        document.getElementById("multipleDoneButton").classList.remove("display-on");
        document.getElementById("multipleDelButton").classList.add("display-off");
        document.getElementById("multipleDoneButton").classList.add("display-off");
        if(arr.length<=1){
            document.getElementById("commonCheckbox").classList.remove("display-checkbox");
            document.getElementById("commonCheckbox").classList.add("display-off");
        }
        else{
            document.getElementById("commonCheckbox").classList.remove("display-off");
            document.getElementById("commonCheckbox").classList.add("display-checkbox");
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
            document.getElementById("multipleDelButton").classList.remove("display-off");
            document.getElementById("multipleDelButton").classList.add("display-on");
        }
        if(DonePending[1]>0){
            document.getElementById("multipleDoneButton").classList.remove("display-off");
            document.getElementById("multipleDoneButton").classList.add("display-on");
        }
        if(DonePending[1]==0 && DonePending[0]==0)
        {
            document.getElementById("showInfoMessage").innerHTML="NO TODO SEEN ! Please Add TODO";
        }
    }; 

    /**Append the HTML in tabel */
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

    /**Delete Single Todo*/
    var deleteSingleToDo = function(i){
        user.todotask.splice(i,1);
        LocalStorage.setUser(user);
        showtodo();
    };

    /*Delete Checked */
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

    /**Filter as per category*/
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
                    appendData();
                }    
                       
            }

            if(count<=1){
                document.getElementById("commonCheckbox").classList.remove("display-checkbox");
                document.getElementById("commonCheckbox").classList.add("display-off");
            }
            else{
                document.getElementById("commonCheckbox").classList.remove("display-off");
                document.getElementById("commonCheckbox").classList.add("display-checkbox");
            }
            if(flagCategoryfound==false){
                document.getElementById("showInfoMessage").innerHTML=`NO TODO SEEN of category ${filterClass}! Please Add TODO`;
            }
        }
        else{
            showtodo();
        }
    };

    
    /**On click done*/
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

    /*All select checkbox*/
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

    /**Public Method*/
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