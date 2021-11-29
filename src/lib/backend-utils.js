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

export async function getCourses() {
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