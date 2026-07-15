import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks when app starts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Statistics
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // Add task
  const addTask = () => {
    const text = task.trim();

    if (!text) return;

    setTasks([
      ...tasks,
      {
        text,
        completed: false,
      },
    ]);

    setTask("");
  };

  // Toggle completed
  const toggleTaskCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);

    setTasks(updatedTasks);
  };

  // Edit task
  const editTask = (index) => {
    setTask(tasks[index].text);

    const updatedTasks = tasks.filter((task, i) => i !== index);

    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div className="stats-container">
        <div className="details">
          <h1>Todo App</h1>

          <div id="progressBar">
            <div
              id="progress"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="stats-numbers">
          <p id="numbers">
            {completedTasks} / {totalTasks}
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          id="taskInput"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button id="newTask" type="submit">
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <div className="taskItem">
              <div
                className={`task ${
                  task.completed ? "completed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompleted(index)}
                />

                <p>{task.text}</p>
              </div>

              <div className="icons">
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => editTask(index)}
                ></i>

                <i
                  className="fa-regular fa-trash-can"
                  onClick={() => deleteTask(index)}
                ></i>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;