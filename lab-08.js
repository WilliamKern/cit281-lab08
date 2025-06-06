const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;
const HOST = "localhost";

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/photos", (request, response) => {
  fetch("https://jsonplaceholder.typicode.com/photos/")
    .then((res) => res.json())
    .then((data) => {
      response.status(200).json(data.slice(0, 20));
    })
    .catch((err) => {
      response.status(500).json({ error: err.message });
    });
});

app.get("/photos/:id", (request, reply) => {
  const { id } = request.params;
  fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then((res) => res.json())
    .then((data) => {
      reply.status(200).json(data);
    })
    .catch((err) => {
      reply.status(500).json({ error: err.message });
    });
});

// Handle 404 for unknown routes
app.use((request, response) => {
  response.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log("Working directory:", process.cwd());
  console.log(`Server running at http://${HOST}:${PORT}`);
});
