import axios from "axios";

export default axios.create({
  baseURL: "https://api-project-tracker.herokuapp.com",
});
