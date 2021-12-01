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

export async function getCourse(id) {
    const course = await knex("Courses").select().where("id", id);
    if (course[0]===undefined){
        return null
    }
    return course[0];
}

export async function reviewCourse(course_id, professor, satisfaction, interest, time_commitment, difficulty) {
  const prof_id = await knex("Professors").select().where({prof_name:professor}).pluck("id");

  const CPObject = await knex("Course_Professor").select().where({course_id:course_id,prof_id:prof_id[0]});

  //console.log (CPObject)

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