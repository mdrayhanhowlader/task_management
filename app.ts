// Task Interface
interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
  // DOM Elements
  const taskForm = document.getElementById("task-form") as HTMLFormElement;
  const taskInput = document.getElementById("task-input") as HTMLInputElement;
  const searchInput = document.getElementById("search-input") as HTMLInputElement;
  const taskList = document.getElementById("task-list") as HTMLDivElement;
  
  // Task array
  let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  
  // Add a new task
  function addTask(title: string): void {
    if (!title.trim()) {
      alert("Task cannot be empty!");
      return;
    }
  
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };
  
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
  
  // Render tasks
  function renderTasks(filter: string = ""): void {
    taskList.innerHTML = "";
    tasks
      .filter(task => task.title.toLowerCase().includes(filter.toLowerCase()))
      .forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = `task-card ${task.completed ? "completed" : ""}`;
        taskCard.innerHTML = `
          <div class="task-title">${task.title}</div>
          <div class="task-buttons">
            <button class="btn complete">${task.completed ? "Ongoing" : "Complete"}</button>
            <button class="btn delete">Delete</button>
          </div>
        `;
  
        // Complete/Ongoing toggle
        taskCard.querySelector(".complete")?.addEventListener("click", () => toggleTaskStatus(task.id));
  
        // Delete task
        taskCard.querySelector(".delete")?.addEventListener("click", () => deleteTask(task.id));
  
        taskList.appendChild(taskCard);
      });
  }
  
  // Save tasks to local storage
  function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Toggle task completion
  function toggleTaskStatus(id: number): void {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
    renderTasks();
  }
  
  // Delete task
  function deleteTask(id: number): void {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
  }
  
  // Search tasks
  searchInput.addEventListener("input", () => {
    renderTasks(searchInput.value);
  });
  
  // Add task on form submit
  taskForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    addTask(taskInput.value);
  });
  
  // Initial render
  renderTasks();
  