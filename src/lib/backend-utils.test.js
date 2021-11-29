import data from "../../data/seed.json";

import {
  knex,
  getCourse,
} from "./backend-utils";

describe("Tests of the database utility functions", () => {
    let sampleClass;

    beforeAll(async ()=>{
        // we need to construct a class of the correct form from the seed data
        // pick an arbitrary class from the collection
        sampleClass = data[Math.floor(data.length/2)];
        sampleClass.prof = {
            ...sampleClass.prof,
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

    test("getCourse: fetches the correct class", async ()=>{
        const class = await getCourse(sampleClass.id);
        expect(class.class_name).toBe(sampleClass.class_name);
        expect(class.course_desc).toBe(sampleClass.course_desc);
        expect(class.dept).toBe(sampleClass.dept);
        expect(class.class_num).toBe(sampleClass.class_num);
    });

    test("getCourse: fetches film with the correct professors", async()=>{
        const class = await getCourse(sampleClass.id);

        expect(class.profs.length).toBe(sampleClass.profs.length);
        expect(class.profs).toEqual(expect.arrayContaining(sampleClass.profs));

    });

    test("getCourse: returns null on bad id", async ()=>{
        const class = await getCourse(-1);

        expect(class).toBeNull();
    });


    /*
    test("getAllFilms: fetches all films", async()=>{

        const fetchedFilms = await getAllFilms();

        expect(fetchedFilms).toHaveLength(films.length);
        const testFilm = fetchedFilms.find((film)=>film.id === sampleFilm.id);
        expect(testFilm).toEqual(sampleFilm);
        const properties = ["id", "title", "overview", "poster_path", "vote_average", "release_date", "rating", "genres"];
        properties.forEach((prop)=>{expect(fetchedFilms[0]).toHaveProperty(prop)});
    });

    test("getAllFilms: loads the correct genres", async()=>{
        const fetchedFilms = await getAllFilms();
        const testFilm = fetchedFilms.find((film)=>film.id === sampleFilm.id);

        expect(testFilm.genres.length).toBe(sampleFilm.genres.length);
        expect(testFilm.genres).toEqual(expect.arrayContaining(sampleFilm.genres));

    });


    test("updateFilmRating: updates the film", async ()=>{
        const newFilm = { ...sampleFilm, rating: 4 };

        const updated = await updateFilmRating(newFilm.id, newFilm.rating);

        expect(updated).toBeTruthy();
        const updatedFilm = await getFilm(newFilm.id);

        expect(updatedFilm).toEqual(newFilm);

    });

    test("updateFilmRating: returns false on bad id", async ()=>{
        const newFilm = { ...sampleFilm, rating: 4 };

        const updated = await updateFilmRating(-1, newFilm.rating);

        expect(updated).toBeFalsy();
    });
    */

});