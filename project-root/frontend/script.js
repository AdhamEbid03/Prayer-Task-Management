// Mock API Endpoints
const PRAYER_API = "http://16.171.138.189:3001";
const USER_API = "http://16.171.138.189:8082";

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
        li.classList.add("prayer-item");

        // Prayer name and time
        const prayerInfo = document.createElement("span");
        prayerInfo.textContent = `${prayer}: ${time}`;

        // Checkbox for logging prayers
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("prayer-checkbox");
        checkbox.setAttribute("data-prayer-name", prayer);
        checkbox.setAttribute("data-prayer-time", time);

        // Add event listener for logging prayer
        checkbox.addEventListener("change", (e) => {
          if (e.target.checked) {
            logPrayer(prayer, time);
          }
        });

        // Append elements to list item
        li.appendChild(prayerInfo);
        li.appendChild(checkbox);
        
        // Append to prayer list
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

// Log Prayer function
async function logPrayer(prayerName, prayerTime) {
  const logData = {
    userId: "adham", // replace with actual user ID
    prayerName: prayerName,
    completedAt: new Date().toISOString()
  };

  try {
    const response = await fetch("http://16.171.138.189:3001/logPrayer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`Prayer logged successfully: ${result.message}`);
    } else {
      console.error(`Error logging prayer: ${result.error}`);
    }
  } catch (error) {
    console.error("Error sending prayer log:", error);
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
document.getElementById("fetch-user-btn").addEventListener("click", fetchUserInfo);

// Initial Fetch
fetchPrayerTimes();
});