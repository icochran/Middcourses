import { render, screen } from "@testing-library/react";
import RatingBar from "./RatingBar.js";

describe("CourseCard: CourseCard tests", () => {
  /*
  let course;

  //creates a common courses before each test is run
  beforeEach(() => {
    course =
            {
              "class_name": "Software Development",
              "dept": "CSCI",
              "class_num": "312",
              "profs": [
                {
                  "prof_name": "Christopher Andrews",
                  "satisfaction": [1,1,1,1,1],
                  "difficulty": [8,8,8],
                  "interest": [5, 4, 3, 2, 1, 3, 4],
                  "time_commitment": [9,9,9]
                }
              ],
              "course_desc":"Class where you learn Software Development",
              "id": 0
            }});
    */

    test("RatingBar: displays bar name", () => {
        render(<RatingBar aspect="Difficulty" percentage={50}/>);
        expect(screen.getByText("Difficulty")).toBeVisible();
    });           
});
