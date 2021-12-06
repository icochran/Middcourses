import nc from "next-connect";
import { getCourse, reviewCourse } from "../../../lib/backend-utils";

const handler = nc()
  .get((req, res) => {
    // get a single film

    const { id } = req.query;

    const course = getCourse(+id);
    if (course){
      res.status(200).json(course);
    }else{
      res.status(404);
    }
    
  })
  .put((req, res) => {
    // update a film
    const { id } = req.query;

    const success = reviewCourse(id, req.body.prof_name/*, req.body.satisfaction, req.body.interest, req.body.time_commitment, req.body.difficulty*/);
    if (success){
      res.status(200).json(req.body);
    }else{
      res.status(400); // bad request
    }
    
  });

export default handler;