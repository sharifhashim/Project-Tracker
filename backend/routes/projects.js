var express = require("express");
var router = express.Router();
const {
  getProjects,
  getProjectDetails,
  getProjectDetailsWithNumDevs,
} = require("../helpers/dbHelpers.js");

/* GET all projects. */
module.exports = ({
  getProjects,
  getProjectDetails,
  getProjectDetailsWithNumDevs,
}) => {
  router.get("/", (req, res) => {
    getProjects()
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/details", (req, res) => {
    getProjectDetails()
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/details/devs", (req, res) => {
    getProjectDetailsWithNumDevs()
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:project_id", (req, res) => {
    const projectID = req.params.project_id;
    getProjectDetailsWithNumDevs(projectID)
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
