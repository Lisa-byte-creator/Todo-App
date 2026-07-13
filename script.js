

    document.addEventListener("DOMContentLoaded" , ()=>{

    const storedTasks = JSON.parse(localStorage.getItem('tasks'))


    if (storedTasks){

        storedTasks.forEach((task)=> tasks.push(task))

        updateTasksList();
        updateStats();

    }
})

let tasks = [];

 const saveTasks = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))

      
}
const addTask = ()=>{

    const taskInput = document.getElementById('taskInput')
 

const text = taskInput.value.trim();
 

    if(text){
        tasks.push({text: text, completed: false})

        updateTasksList();
        updateStats();
        saveTasks();
        taskInput.value = "";
      
        
    };
 }
    const toggleTaskCompleted = (index) => {
        tasks[index].completed = !tasks[index].completed;
       updateTasksList();
       updateStats();
        saveTasks();
        
    };

        let deleteTask = (index) =>{
        tasks.splice(index,1)
         updateTasksList();
         updateStats();
          saveTasks();
        

    }

    let editTask = (index) =>{
        const taskInput = document.getElementById('taskInput')
        taskInput.value = tasks[index].text

        tasks.splice(index,1)
        updateTasksList()
         saveTasks();
    }

    const updateStats = () =>{
        const completedTasks = tasks.filter(task=> task.completed).length
        const totalTasks = tasks.length
        const progress = (completedTasks/totalTasks) * 100
        const progressBar = document.getElementById('progress')

        progressBar.style.width = `${progress}%`;

        document.getElementById('numbers').innerText = `${completedTasks}/ ${totalTasks}`
    }

    const updateTasksList = () => {

    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">

                <div class="task ${task.completed ? "completed" : ""}">
                    <input
                        type="checkbox"
                        class="checkbox"
                        ${task.completed ? "checked" : ""}
                    />

                    <p>${task.text}</p>
                </div>

                <div class="icons">
                    <i class="fa-regular fa-pen-to-square" onclick="editTask(${index})"></i>
                    <i class="fa-regular fa-trash-can" onclick="deleteTask(${index})"></i>
                </div>

            </div>
        `;

        listItem.addEventListener("change", () => toggleTaskCompleted(index));
        taskList.appendChild(listItem);
    });
};

    



document.getElementById("newTask").addEventListener("click", function (e) {e.preventDefault();addTask();;
    console.log("Button clicked");
});







