import data from "../../data/seed.json";

import {
  knex,
  getCourse,
  getAllCourses,
  reviewCourse
} from "./backend-utils";

describe("Tests of the database utility functions", () => {
    let sample_course;
    //let profName;
    beforeAll(async ()=>{
        // we need to construct a course of the correct form from the seed data
        // pick an arbitrary course from the collection
        sample_course = data[Math.floor(data.length/2)];
    });

    beforeEach(async () => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
    });

    test("getCourse: fetches the correct course data", async ()=>{
        const course = await getCourse(sample_course.id);
        expect(course.class_name).toBe(sample_course.class_name);
        expect(course.course_desc).toBe(sample_course.course_desc);
        expect(course.dept).toBe(sample_course.dept);
        expect(course.class_num).toBe(sample_course.class_num);
    });

    test("getCourse: fetches film with the correct professors", async()=>{
        const course = await getCourse(sample_course.id);

        expect(course.profs.length).toBe(sample_course.profs.length);

        for(let i=0; i<sample_course.profs.length; i++){
            expect(course.profs[i].difficulty).toEqual(sample_course.profs[i].difficulty);
            expect(course.profs[i].interest).toEqual(sample_course.profs[i].interest);
            expect(course.profs[i].prof_name).toEqual(sample_course.profs[i].prof_name);
            expect(course.profs[i].satisfaction).toEqual(sample_course.profs[i].satisfaction);
            expect(course.profs[i].time_commitment).toEqual(sample_course.profs[i].time_commitment);
        }

    });

    test("getCourse: returns null on bad id", async ()=>{
        const course = await getCourse(-1);

        expect(course).toBeNull();
    });

    test("getAllCourses: fetches all courses", async()=>{

        const fetchedCourses = await getAllCourses();
        expect(fetchedCourses).toHaveLength(data.length);

        const test_course = fetchedCourses.find((course)=>course.id === sample_course.id);
        expect(test_course.course_desc).toEqual(sample_course.course_desc);
        expect(test_course.dept).toEqual(sample_course.dept);
        expect(test_course.id).toEqual(sample_course.id);
        for(let i=0; i<test_course.length; i++){
            expect(test_course.profs[i].prof_id).toEqual(sample_course.profs[i].prof_id);
            expect(test_course.profs[i].prof_name).toEqual(sample_course.profs[i].prof_name);
            expect(test_course.profs[i].interest).toEqual(sample_course.profs[i].interest);
            expect(test_course.profs[i].difficulty).toEqual(sample_course.profs[i].difficulty);
            expect(test_course.profs[i].time_commitment).toEqual(sample_course.profs[i].time_commitment);
            expect(test_course.profs[i].satisfaction).toEqual(sample_course.profs[i].satisfaction);
        }
    });

    test("reviewCourse: updates the rating for a single professor", async ()=>{
        const updated = await reviewCourse(sample_course.id, sample_course.profs[0].prof_name, 2, 2, 2, 2);
        expect(updated).toBeTruthy();
    });
});