import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

function convert_review(string) {
  if(string.length===0) {
    return []; //change this to [] when the seed is updated
  } else {
    const attribute_array = string.split("");
    return attribute_array;
  }
}

export async function getAllCourses() {
  const rows = await knex("Courses").select();

  for(let i=0; i<rows.length; i++){
    const course_id = rows[i].id;
    const course_reviews = await knex("Course_Professor").select().join("Professors", "Professors.id", "Course_Professor.prof_id").where({course_id:course_id});
    course_reviews.forEach((review) => {
      delete review.id;
      review.satisfaction = convert_review(review.satisfaction);
      review.interest = convert_review(review.interest);
      review.time_commitment = convert_review(review.time_commitment);
      review.difficulty = convert_review(review.difficulty);
    });
    rows[i].profs = course_reviews
  } 

  return rows;
}

export async function getCourse(id) {
    const course = await knex("Courses").select().where("id", id);
    if (course[0]===undefined){
        return null
    }
    const course_obj = course[0];

    //get the professors and review data
    const reviews_array = await knex("Course_Professor").select().join("Professors", "Professors.id", "Course_Professor.prof_id").where({course_id:course_obj.id});
    for(let i=0; i<reviews_array.length; i++){
      delete reviews_array[i].id
      reviews_array[i].satisfaction = convert_review(reviews_array[i].satisfaction);
      reviews_array[i].interest = convert_review(reviews_array[i].interest);
      reviews_array[i].time_commitment = convert_review(reviews_array[i].time_commitment);
      reviews_array[i].difficulty = convert_review(reviews_array[i].difficulty);
    }

    course_obj.profs = reviews_array; 

    return course_obj;
}

export async function reviewCourse(course_id, professor, satisfaction, interest, time_commitment, difficulty) {
  const prof_id = await knex("Professors").select().where({prof_name:professor}).pluck("id");

  const CPObject = await knex("Course_Professor").select().where({course_id:course_id,prof_id:prof_id[0]});

  const updated_satisfaction = CPObject.satisfaction ? CPObject.satisfaction + satisfaction : satisfaction
    
  const updated_interest = CPObject.interest ? CPObject.interest + interest : interest

  const updated_time_commitment = CPObject.time_commitment ? CPObject.time_commitment + time_commitment : time_commitment

  const updated_difficulty = CPObject.difficulty ? CPObject.difficulty + difficulty : difficulty

  const count = await knex("Course_Professor").where({course_id:course_id,prof_id:prof_id}).update({
    satisfaction: updated_satisfaction, 
    interest: updated_interest,
    time_commitment: updated_time_commitment,
    difficulty: updated_difficulty
  });

  return count === 1;
}