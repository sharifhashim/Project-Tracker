const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const logger = require("morgan");
const db = require("./db");
const dbHelpers = require("./helpers/dbHelpers")(db);
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, "routes")));
//console.log("---", path.join(__dirname, "routes"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    secure: true,
  })
);

const projectsRouter = require("./routes/projects");
const projectTicketsRouter = require("./routes/tickets");
const getUsersRouter = require("./routes/users");
const addLoginRouter = require("./routes/login");

app.use("/api/projects", projectsRouter(dbHelpers));
app.use("/api/projects", projectTicketsRouter(dbHelpers));
//app.use("/api/users", getUsersRouter(dbHelpers));
app.use("/api", addLoginRouter(dbHelpers));

app.get("/api/users", (req, res) => {
  db.query(`SELECT users.full_name, users.id from users;`)
    .then((users) => res.json(users.rows))
    .catch((err) =>
      res.json({
        error: err.message,
      })
    );
});
module.exports = app;
