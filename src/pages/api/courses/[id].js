import nc from "next-connect";
import { getCourse, reviewCourse } from "../../../lib/backend-utils";

const handler = nc()
  .get((req, res) => {
    // get a single film
    const { id } = req.query;

    console.log(`req.query: ${req.query}`)

    const film = getCourse(+id);
    if (film){
      res.status(200).json(film);
    }else{
      res.status(404);
    }
    
  })
  .put((req, res) => {
    // update a film
    //I dont think i need to do anything with the id because im just passing it with the body
    //I think this also means I can just move this into index
    //const { id } = req.query;

    const success = reviewCourse(req.body.course_id, req.body.prof_name, req.body.satisfaction, req.body.interest, req.body.time_commitment, req.body.difficulty);
    if (success){
      res.status(200).json(req.body);
    }else{
      res.status(400); // bad request
    }
    
  });

export default handler;