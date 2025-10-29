const content = document.getElementById("content");
const links = document.querySelectorAll("nav a");

const pages = {
  home: `
    <section>
      <h1>What is SDG 6?</h1>
      <p>SDG 6 (Sustainable Development Goal 6) focuses on ensuring availability and sustainable management of water and sanitation for all. 
      It aims to provide universal access to safe and affordable drinking water, improve water quality, and protect water-related ecosystems.</p>
      <h2>Why It Matters</h2>
      <p>Access to clean water is a basic human right. Yet billions of people still face water scarcity and contamination. 
      Achieving SDG 6 is essential for global health, education, and economic stability.</p>
    </section>
  `,
  info: `
    <section>
      <h1>About the Project</h1>
      <p>Our project uses an ESP32-based water monitoring system to analyze water quality in real time. 
      The device collects data such as temperature, pH level, and turbidity — helping communities and researchers assess water safety effectively.</p>
      <p>By integrating IoT technology, we provide accessible, low-cost, and scalable water monitoring solutions aligned with SDG 6 objectives.</p>
    </section>
  `,
  about: `
    <section>
      <h1>About Us</h1>
      <p>We are a group of innovators passionate about technology and sustainability. 
      This project was born from a shared belief that everyone deserves access to safe, clean water — and technology can help make that happen.</p>
      <p>Our goal is to empower local communities to take control of their water quality monitoring through affordable IoT solutions.</p>
    </section>
  `,
  team: `
    <section>
      <h1>Meet the Team</h1>
      <ul>
        <li><strong>Project Lead:</strong> [Your Name]</li>
        <li><strong>Hardware Engineer:</strong> [Teammate 1]</li>
        <li><strong>Software Developer:</strong> [Teammate 2]</li>
        <li><strong>Data Analyst:</strong> [Teammate 3]</li>
        <li><strong>Designer:</strong> [Teammate 4]</li>
      </ul>
    </section>
  `,
  dashboard: `
    <section>
      <h1>Dashboard</h1>
      <div id="dashboard-data">
        <p>Loading data from Firebase...</p>
      </div>
    </section>
  `
};

// Load home page by default
content.innerHTML = pages.home;

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.target.dataset.page;
    content.innerHTML = pages[page];

    // Update active link
    links.forEach(l => l.classList.remove("active"));
    e.target.classList.add("active");
  });
});

// --- Firebase setup ---
const firebaseConfig = {
  apiKey: "AIzaSyCP7KcsActmC5tT80NM-NFEBsPOFY_NC0A",
  authDomain: "sdg6-water-monitor.firebaseapp.com",
  databaseURL: "https://sdg6-water-monitor-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sdg6-water-monitor",
  storageBucket: "sdg6-water-monitor.firebasestorage.app",
  messagingSenderId: "568155409259",
  appId: "1:568155409259:web:604447e9d0c013a979da2e"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// --- Fetch and display data ---
function loadFirebaseData() {
  const ref = database.ref("waterData");

  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    document.getElementById("dashboard-data").innerHTML = `
      <h2>Live Water Quality Data</h2>
      <p><strong>Temperature:</strong> ${data.temperature} °C</p>
      <p><strong>pH Level:</strong> ${data.ph}</p>
      <p><strong>Turbidity:</strong> ${data.turbidity} NTU</p>
      <small>Last Updated: ${new Date().toLocaleTimeString()}</small>
    `;
  });
}
