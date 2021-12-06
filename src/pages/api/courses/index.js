import nc from "next-connect";
import { getAllCourses } from "../../../lib/backend-utils";

const handler = nc()
  .get(async (req, res) => {
    // get all films
    const courses = await getAllCourses();
    res.status(200).json(courses);
  });
  //maybe just put the put here? then get rid of the id part???

export default handler;