const taskList = document.getElementById('taskList');
const tasks = document.getElementsByClassName('task');
const createName = document.getElementsByClassName('createName');
const createBtn = document.getElementsByClassName('createBtn');

function deleteTaskElement(btn) {
    let taskElement = btn.parentNode.parentNode;
    taskElement.remove();
}   // once invoked removes the parent of parent of button
    // task < intask < button is path

function deleteCreationNode(btn) {
    let node;
    if (btn.classList.contains("createBtn")) {
        node = btn.parentNode;
    } else if (btn.classList.contains("completeBtn")) {
        node = btn.parentNode.parentNode.parentNode;  
    }
    node.remove();
}

function createTaskContent(btn) {
    let task = btn.parentNode.parentNode;
    let subTask = btn.parentNode;
    let infoNode = document.createElement('div');
    task.insertBefore(infoNode, subTask);
    infoNode.className = "taskInfoNode";

    let completeDiv = document.createElement('div');
    infoNode.appendChild(completeDiv);
    completeDiv.className = "completeDiv";

    let completeBtn = document.createElement('button');
    completeDiv.appendChild(completeBtn);
    completeBtn.innerHTML = "Complete";
    completeBtn.className = 'completeBtn';
    completeBtn.addEventListener('click', () => {
        deleteCreationNode(completeBtn);
    });

    let nameDiv = document.createElement('div');
    infoNode.appendChild(nameDiv);
    nameDiv.className = "nameDiv";
    let taskName = document.createElement('h3');
    nameDiv.appendChild(taskName);
    taskName.innerHTML = btn.previousElementSibling.value;

    let hr = document.createElement('hr');
    infoNode.appendChild(hr);
}

function createTask(btn) {
    let task = btn.parentNode.parentNode;
    console.log(task)
    let taskClassList = [];
    for (let i = 0; i < task.classList.length; i++) {
        taskClassList.push(task.classList.item(i));
    };
    console.log(taskClassList)
    let indent = taskClassList.filter(c => {
        return c.startsWith("indent");
    });
    console.log(indent)
    indent = parseInt(indent[0].slice(6, 7));
    console.log(indent)
    if (indent > 0 && indent < 3) {
        if (indent + 1 > 0 && indent + 1 < 3) {
            let indentedTask = document.createElement('div');
            task.appendChild(indentedTask);
            indentedTask.classList = `task ${"indent"+ (indent + 1)}`;
            createCreationNodes(indentedTask);
        }
        
        let equalIndentTask = document.createElement('div');
        task.parentNode.appendChild(equalIndentTask);
        equalIndentTask.classList = `task indent${indent}`;
        createCreationNodes(equalIndentTask);
    } else if (indent === 0) {
        let indentedTask = document.createElement('div');
        task.appendChild(indentedTask);
        indentedTask.classList = `task ${"indent"+ (indent + 1)}`;
        createCreationNodes(indentedTask);

        let newTask = document.createElement('div');
        task.parentNode.appendChild(newTask);
        newTask.classList = `task indent0`;
        createCreationNodes(newTask);
}
    
};

function createCreationNodes(task) {
        let creationNode = document.createElement('div');
        task.appendChild(creationNode);
        creationNode.classList = "taskCreationNode";

        let createName = document.createElement('input');
        creationNode.appendChild(createName);
        createName.setAttribute("type", "text");
        createName.setAttribute("placeholder", "Task name...");
        createName.classList.add("createName");

        let createBtn = document.createElement('button');
        creationNode.appendChild(createBtn);
        createBtn.setAttribute('type', 'button');
        createBtn.classList.add("createBtn");
        createBtn.innerHTML = "Create Task";

        createBtn.addEventListener('click', () => {
            let btn = event.currentTarget;
            createTask(btn);
            createCreationNodes(btn);
            createTaskContent(btn);
            deleteCreationNode(btn)
        });
        let hr = document.createElement('hr');
        creationNode.appendChild(hr);
};


// createTask(false);

createBtn[0].addEventListener('click', (event) => {
    let btn = event.currentTarget;
    createTask(btn);
    createTaskContent(btn);
    deleteCreationNode(btn);
});