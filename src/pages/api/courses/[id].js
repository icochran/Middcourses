import nc from "next-connect";
import { getCourse, reviewCourse } from "../../../lib/backend-utils";

const handler = nc()
  .get(async(req, res) => {
    // get a single film

    const { id } = req.query;

    const course = await getCourse(+id);

    if (course){
      res.status(200).json(course);
    }else{
      res.status(404);
    }
    
  })
  .put((req, res) => {
    // update a film
    const { id } = req.query;
    const {prof_name, satisfaction, interest, time_commitment, difficulty} = req.body;

    const success = reviewCourse(+id, prof_name, +satisfaction, +interest, +time_commitment, +difficulty);
    if (success){
      res.status(200).json(req.body);
    }else{
      res.status(400); // bad request
    }
    
  });

export default handler;