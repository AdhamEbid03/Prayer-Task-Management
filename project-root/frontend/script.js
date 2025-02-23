// Mock API Endpoints
const PRAYER_API = "http://localhost:3001/prayers";
const USER_API = "http://16.171.138.189:30082/users";

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
document.getElementById("fetch-user-btn").addEventListener("click", fetchUserInfo);

// Initial Fetch
fetchPrayerTimes();
});