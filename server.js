const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const Members = require("./members");

// Initializing our app
const app = express();

// adding middlewares

// app.use(express.static(path.join(__dirname, "public")));

app.use(logger);
// json receiver middleware
app.use(express.json());
// form data receiver middleware
app.use(express.urlencoded({ extended: false }));
// template engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// api routes
app.use("/api/members", require("./routes/members"));

app.get("/", function (req, res) {
  res.render("home", {
    title: "Member app",
    members: Members,
  });
});
// PORTS
const PORT = process.env.port || 5000;

app.listen(5000, () => console.log(`Server runnning on port: ${PORT}`));
