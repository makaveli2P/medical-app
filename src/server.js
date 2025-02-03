// Import required modules
const express = require("express");
const axios = require("axios");

// Initialize Express app
const app = express();
const PORT = 3000;

app.use(express.static('src/public'));

// Define a route to fetch and display medical data
app.get("/medical-data", async (req, res) => {
  try {
    // Fetch data from the mock API (JSONPlaceholder)
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    // Treat the data as medical data (for example purposes)
    const medicalData = response.data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email, // Treat email as a patient identifier
      condition: "Healthy", // Mock medical condition
      lastCheckup: new Date().toISOString(), // Mock last checkup date
    }));

    // Return the structured medical data
    res.json(medicalData);
  } catch (error) {
    // Handle errors
    console.error("Error fetching medical data:", error.message);
    res.status(500).json({ error: "Failed to fetch medical data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
