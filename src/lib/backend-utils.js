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

export async function getAllCourses() {
    const rows = await knex("Courses").select();
    return rows;
}

export async function getCourse(id, prof_name) {
    const course = await knex("Courses").select().where("id", id);
    if (course[0]===undefined){
        return null
    }
    const course_obj = course[0];

    //get the professors and review data
    let reviews_array = await knex("Course_Professor").select().where({course_id:course_obj.id});

    //append the professors to the reviews
    for(let i=0; i<reviews_array.length; i++){
      const prof_id = reviews_array[i].prof_id;
      const prof_object_array = await knex("Professors").select().where({id:prof_id});
      const prof_name = prof_object_array[0].prof_name;
      reviews_array[i].prof_name = prof_name;
    }

    course_obj.profs = reviews_array; 

    return course_obj;
}

export async function reviewCourse(course_id, professor, satisfaction, interest, time_commitment, difficulty) {
  const prof_object = await knex("Professors").select().where({prof_name:professor});
  const prof_id = prof_object.id;

  const CPObject = await knex("Course_Professor").select().where({course_id:course_id,prof_id:prof_id});
  const updated_satisfaction = CPObject.satisfaction.push(satisfaction);
  const updated_interest = CPObject.interest.push(interest);
  const updated_time_commitment = CPObject.time_commitment.push(time_commitment);
  const updated_difficulty = CPObject.difficulty.push(difficulty);

  const count = await knex("Course_Professor").where({course_id:course_id,prof_id:prof_id}).update({
    satisfaction: updated_satisfaction, 
    interest: updated_interest,
    time_commitment: updated_time_commitment,
    difficulty: updated_difficulty
  });

  return (count === 3);
}