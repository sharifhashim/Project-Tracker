import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function useProjectsData(value) {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});

  function refresh() {
    return axios
      .get("/api/projects/details")
      .then((details) => {
        console.log(details.data);
        setProjects(...projects, details.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get("/api/projects/details/devs")
      .then((details) => {
        console.log(details.data);
        setProjects(...projects, details.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return { projects, project, refresh };
}
