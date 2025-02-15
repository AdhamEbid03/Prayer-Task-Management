// Mock API Endpoints
const TASK_API = "http://localhost:8081/tasks"; // Replace with actual API URL for Task Service
const PRAYER_API = "http://localhost:3001/prayers"; // Replace with actual API URL for Prayer Service
const USER_API = "http://localhost:8082/users"; // Replace with actual API URL for User Service

// Fetch and Display Tasks
async function fetchTasks() {
  const tasks = await fetchData(TASK_API);
  if(!tasks) return;

  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear the list

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = `${task.title} - ${task.completed ? "Done ✅" : "Pending ⏳"}`;
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
  const prayers = await fetchData(PRAYER_API);
  if(!prayers) return;

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
  const user = await fetchData(USER_API + "/1"); // Replace with the actual user ID
  if(!user) return;

  const userInfoDiv = document.getElementById("user-info");
  userInfoDiv.innerHTML = `
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Location:</strong> ${user.location}</p>
  `;
}

async function fetchData(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
  } catch (error) {
      console.error("Error fetching data:", error);
      return null;
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
document.getElementById("add-task-btn").addEventListener("click", addTask);
document.getElementById("fetch-user-btn").addEventListener("click", fetchUserInfo);

// Initial Fetch
fetchTasks();
fetchPrayerTimes();
});