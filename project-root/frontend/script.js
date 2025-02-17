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

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => updateTaskStatus(task.id, checkbox.checked));

    const taskText = document.createElement("span");
    li.textContent = `${task.title} - ${task.completed ? "Done ✅" : "Pending ⏳"}`;

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(` ${task.title}`));


    taskList.appendChild(li);
  });
}

async function updateTaskStatus(taskId, isCompleted) {
  await fetch(`${TASK_API}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: isCompleted }),
  });

  fetchTasks(); // Refresh the task list
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
  try {
      const prayers = await fetchData(PRAYER_API);
      if (!prayers) return;

      console.log("Prayer API Response:", prayers); // Debugging log

      const prayerList = document.getElementById("prayer-times");
      prayerList.innerHTML = ""; // Clear the list

      // Display City and Country
      const cityItem = document.createElement("li");
      cityItem.textContent = `City: ${prayers.city || "N/A"}`;
      prayerList.appendChild(cityItem);

      const countryItem = document.createElement("li");
      countryItem.textContent = `Country: ${prayers.country || "N/A"}`;
      prayerList.appendChild(countryItem);

      // Check if prayerTimes exists and is an object
      if (prayers.prayerTimes && typeof prayers.prayerTimes === "object") {
          for (const [prayer, time] of Object.entries(prayers.prayerTimes)) {
              const li = document.createElement("li");
              li.textContent = `${prayer}: ${time}`;
              prayerList.appendChild(li);
          }
      } else {
          const errorItem = document.createElement("li");
          errorItem.textContent = "Error: No prayer times found";
          prayerList.appendChild(errorItem);
      }

  } catch (error) {
      console.error("Error fetching prayer times:", error);
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