import { useState, useEffect } from "react";
import axios from "axios";

export default function useCommentsData(project_id, ticket_id) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/projects/${project_id}/tickets/${ticket_id}/comments`)
      .then((details) => {
        console.log(details.data);
        setComments(details.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return { comments, setComments };
}
