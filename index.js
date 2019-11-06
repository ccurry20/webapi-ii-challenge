const express = require("express");

const blogRoutes = require("./posts/blogRoutes");

const server = express();
server.use(express.json());

server.use("/api/posts", blogRoutes);

server.use("/", (req, res) => res.send("API up and running!"));

server.listen(8000, () => console.log("API running on port 8000"));
