const express = require("express");
const port = 3000;
const path = require("path");

const app = express();

app.use(express.static("public"));
app.set("view engine", "html");
// app.use(express.static("views"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/main", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname, "views", "main.html"));
});

app.listen(port, () => console.log(`listening on port:${port}`));
