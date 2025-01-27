// Mock API Endpoints
const TASK_API = "http://localhost:8081/tasks"; // Replace with actual API URL for Task Service
const PRAYER_API = "http://localhost:3001/prayers"; // Replace with actual API URL for Prayer Service
const USER_API = "http://localhost:8082/users"; // Replace with actual API URL for User Service

// Fetch and Display Tasks
async function fetchTasks() {
  const response = await fetch(TASK_API);
  const tasks = await response.json();

  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear the list

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = `${task.title} - ${task.completed ? "Done" : "Pending"}`;
    taskList.appendChild(li);
  });
}

// Add a New Task
async function addTask() {
  const taskTitle = document.getElementById("new-task-title").value;

  if (taskTitle) {
    await fetch(TASK_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskTitle, completed: false }),
    });

    fetchTasks(); // Refresh the task list
    document.getElementById("new-task-title").value = ""; // Clear the input
  }
}

// Fetch and Display Prayer Times
async function fetchPrayerTimes() {
  const response = await fetch(PRAYER_API);
  const prayers = await response.json();

  const prayerList = document.getElementById("prayer-times");
  prayerList.innerHTML = ""; // Clear the list

  for (const [prayer, time] of Object.entries(prayers)) {
    const li = document.createElement("li");
    li.textContent = `${prayer}: ${time}`;
    prayerList.appendChild(li);
  }
}

// Fetch and Display User Info
async function fetchUserInfo() {
  const response = await fetch(USER_API + "/1"); // Replace with the actual user ID
  const user = await response.json();

  const userInfoDiv = document.getElementById("user-info");
  userInfoDiv.innerHTML = `
    <p>Username: ${user.username}</p>
    <p>Email: ${user.email}</p>
    <p>Location: ${user.location}</p>
  `;
}

// Event Listeners
document.getElementById("add-task-btn").addEventListener("click", addTask);
document.getElementById("fetch-user-btn").addEventListener("click", fetchUserInfo);

// Initial Fetch
fetchTasks();
fetchPrayerTimes();
