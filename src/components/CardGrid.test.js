import { render, screen } from "@testing-library/react";
import CardGrid from "./CardGrid";

describe("CardGrid: CardGrid tests", () => {
  let courses;

  //creates a common courses before each test is run
  beforeEach(() => {
    courses = [
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
            },
            {
              "class_name": "Intro to Data Science",
              "dept": "MATH",
              "class_num": "118",
              "profs": [
                {
                  "prof_name": "Kara Karpman",
                  "satisfaction": [3,3,3,3],
                  "difficulty": [5, 5, 5, 5, 5, 5, 5],
                  "interest": [5, 4, 3, 2, 1, 3, 4],
                  "time_commitment": [5, 4, 3, 4, 3, 2, 1]
                }
              ],
              "course_desc":"Class where you learn Data Science",
              "id": 1
            },
            {
              "class_name": "Data Structures",
              "dept": "CSCI",
              "class_num": "201",
              "profs": [
                {
                  "prof_name": "Akhil Rao",
                  "satisfaction": [3,3,3,3],
                  "difficulty": [5, 5, 5, 5, 5, 5, 5],
                  "interest": [5, 4, 3, 2, 1, 3, 4],
                  "time_commitment": [5, 4, 3, 4, 3, 2, 1]
                }
              ],
              "course_desc":"Class where you learn Data Structures",
              "id": 2
            }]  });

  test("CardGrid: displays grid", () => {
    const { getByRole } = render(<CardGrid courses={courses} />);
    expect(getByRole("grid")).toBeInTheDocument();
  });

  test("CardGrid: displays all cards given", () => {
    render(<CardGrid courses={courses} />);
    expect(screen.queryAllByTestId("courseCard").length === 3).toBeTruthy();
  });

});
