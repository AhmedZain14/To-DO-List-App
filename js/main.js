var mainInput = document.querySelector("#mainInput");
var plus = document.querySelector("#plus");
var allContent = document.querySelector("#allContent");
var deleteAll = document.querySelector("#deleteAll");
var countSpan = document.querySelector("#count");
var compeleteSpan = document.querySelector("#complete");



var arr = [];
if(localStorage.getItem("products") != null){
    arr=JSON.parse(localStorage.getItem("products"));
}
displayTasks();

// add task
function addTask() {
    var task = mainInput.value;
    if (task.trim() === "") {
        alert("Please enter a task!");
        // return false;
    }else{
        arr.push(task);
        localStorage.setItem("products",JSON.stringify(arr));
        console.log(arr);
        
        return true;
    }
}

// clear
function clearInput() {
    mainInput.value = '';
}

// display all tasks
function displayTasks() {
    countSpan.innerHTML = arr.length;
    if (arr.length === 0) {
        allContent.innerHTML = `<h2 class="d-block">No Tasks To Show</h2>`;
        return;
    }
    var tasks = '';
    for (var i = 0; i < arr.length; i++) {
        tasks += `
        <h2 onclick="finishOne(this)" class="d-flex justify-content-between align-items-center p-2" style="border-bottom: 1px solid #ddd;">
            ${arr[i]} 
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button>
        </h2>`;
    }
    allContent.innerHTML = tasks;
    // test
    updateCompleteCounter();
}

// event
plus.addEventListener("click", function () {
    if (addTask()) {
        displayTasks();
        clearInput();
    }
    // addTask();
    // displayTasks();
    // clearInput();

});

// delet one task
function deleteTask(index) {
    arr.splice(index, 1);
    localStorage.setItem("products",JSON.stringify(arr));
    displayTasks();
}

// delete all tasks
function deleteAllTasks() {
    arr = [];
    localStorage.setItem("products",JSON.stringify(arr));
    displayTasks();

}

deleteAll.addEventListener("click", function () {
    deleteAllTasks();
    
})

// finish all
var finishBtn = document.querySelector("#finishBtn");
var isAllFinished = false;

finishBtn.addEventListener("click", function () {
    var allTasksElements = document.querySelectorAll("#allContent h2");
    if (arr.length === 0) {
        return; 
    }
    for (var i = 0; i < allTasksElements.length; i++) {
        if (isAllFinished == false) {
            
            allTasksElements[i].style.textDecoration = "line-through";
            allTasksElements[i].style.opacity = "0.5";
        } else {
            allTasksElements[i].style.textDecoration = "none";
            allTasksElements[i].style.opacity = "1";
        }
    }
    isAllFinished = !isAllFinished;
    if (isAllFinished) {
        finishBtn.innerHTML = "Unfinish All";
    } else {
        finishBtn.innerHTML = "Finish All";
    }

    updateCompleteCounter();
});

// finish one task
function finishOne(task) {
    if (task.style.textDecoration === "line-through") {
        task.style.textDecoration = "none";
        task.style.opacity = "1";
    } else {
        task.style.textDecoration = "line-through";
        task.style.opacity = "0.5";
        
    }
    updateCompleteCounter();
}
// compelete counter

function updateCompleteCounter() {
    var allTasks = document.querySelectorAll("#allContent h2");
    var counter = 0;

    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].style.textDecoration === "line-through") {
            counter++;
        }
    }
    compeleteSpan.innerHTML = counter;
}