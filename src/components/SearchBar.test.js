import { render, screen, fireEvent } from "@testing-library/react";
import MainPage from "../pages/index.js"
import SearchBar from "./SearchBar";

/*

Once we get the database running, testing this will change so we should wait until that happens to write this

describe("SearchBar: SearchBar tests", () => {
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

  test.skip("CardGrid: displays grid", () => {
    const { getByRole } = render(<CardGrid courses={courses} />);
    expect(getByRole("grid")).toBeInTheDocument();
  });

  test("CardGrid: correctly filters by department", async () => {
    render(<MainPage courses={courses} />);

    expect(screen.queryAllByRole("gridcell").length === 3).toBeTruthy();

    const compSciFilter = await screen.findByText("CSCI");
    fireEvent.click(compSciFilter);
    expect(screen.queryAllByRole("gridcell").length === 2).toBeTruthy();
  });

});
*/
