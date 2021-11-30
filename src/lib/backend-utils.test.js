import data from "../../data/seed.json";

import {
  knex,
  getCourse,
  getAllCourses,
  reviewCourse
} from "./backend-utils";

describe("Tests of the database utility functions", () => {
    let sample_course;

    beforeAll(async ()=>{
        // we need to construct a course of the correct form from the seed data
        // pick an arbitrary course from the collection
        sample_course = data[Math.floor(data.length/2)];
        sample_course.prof = {
            prof_name: "C. Andrews",
            satisfaction: [1,1,1],
            interest: [1,1,1],
            time_commitment: [1,1,1],
            difficulty: [1,1,1]
        }
    });

    beforeEach(async () => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
    });

    test("getCourse: fetches the correct course", async ()=>{
        const course = await getCourse(sample_course.id);
        expect(course.class_name).toBe(sample_course.class_name);
        expect(course.course_desc).toBe(sample_course.course_desc);
        expect(course.dept).toBe(sample_course.dept);
        expect(course.class_num).toBe(sample_course.class_num);
    });

    test.skip("getCourse: fetches film with the correct professors", async()=>{
        const course = await getCourse(sample_course.id);

        expect(course.profs.length).toBe(sample_course.profs.length);
        expect(course.profs).toEqual(expect.arrayContaining(sample_course.profs));

    });

    test.skip("getCourse: returns null on bad id", async ()=>{
        const course = await getCourse(-1);

        expect(course).toBeNull();
    });

    test.skip("getAllCourses: fetches all courses", async()=>{

        const fetchedCourses = await getAllCourses();

        expect(fetchedCourses).toHaveLength(data.length);
        const testCourse = fetchedCourses.find((course)=>course.id === sample_course.id);
        expect(testCourse).toEqual(sample_course);
        const properties = ["id", "profs", "class_name", "course_desc", "dept", "class_num"];
        properties.forEach((prop)=>{expect(fetchedCourses[0]).toHaveProperty(prop)});
    });

    test("reviewCourse: updates the rating for a single professor", async ()=>{
        const newCourse = { ...sample_course, profs: {...profs, satisfaction: [1,1,1,2], interest: [1,1,1,2], time_commitment: [1,1,1,2], difficulty: [1,1,1,2]} };

        const updated = await reviewCourse(sample_course.id, "C. Andrews", 2, 2, 2, 2);

        expect(updated).toBeTruthy();
        const updatedCourse = await getCourse(newCourse.id);

        expect(updatedCourse).toEqual(newCourse);

    });

    /*test("reviewCourse: correctly averages the ratings", async ()=>{
        
    });


    test("reviewCourse: updates the rating for a the correct professor", async ()=>{

    });


    test("updateFilmRating: returns false on bad id", async ()=>{
        const newCourse = { ...sample_course, rating: 4 };

        const updated = await updateFilmRating(-1, newFilm.rating);

        expect(updated).toBeFalsy();
    });*/

});