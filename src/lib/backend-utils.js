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

/*export async function reviewCourse(id, professor, satisfaction, time_commitment, difficulty) {

}*/