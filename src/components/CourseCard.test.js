import { render, screen } from "@testing-library/react";
import CourseCard from "./CourseCard";

describe("CourseCard: CourseCard tests", () => {
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

    test("CourseCard: displays class title", () => {
        render(<CourseCard course={course} />);
        expect(screen.getByText(course.class_name)).toBeVisible();
    });

    test.only("CourseCard: displays difficulty bar (not necessarily the right level)", () => {
        render(<CourseCard course={course} />);
        const difficultyArray = course.profs[0].difficulty;
        const courseDifficulty100 = (difficultyArray.reduce((previousValue, currentValue) => previousValue + currentValue))/(difficultyArray.length)*10
        expect(screen.getByRole("progressbar", { name:'difficultyBar'})).toBeVisible();
    });

    test("CourseCard: displays interesting level bar (not necessarily the right level)", () => {
        render(<CourseCard course={course} />);
        const interestingArray = course.profs[0].interest;
        const courseInteresting100 = (interestingArray.reduce((previousValue, currentValue) => previousValue + currentValue))/(interestingArray.length)*10
        expect(screen.getByRole("progressbar", { name:'interestingBar'})).toBeVisible();
    });

    test("CourseCard: displays course time commitment bar (not necessarily the right level)", () => {
        render(<CourseCard course={course} />);
        const timecommitmentArray = course.profs[0].time_commitment;
        const courseTimeCommitment100 = (timecommitmentArray.reduce((previousValue, currentValue) => previousValue + currentValue))/(timecommitmentArray.length)*10
        expect(screen.getByRole("progressbar", { name:'timecommitmentBar'})).toBeVisible();
    });

    test("CourseCard: displays course time commitment in hours", () => {
        const { getByText } = render(<CourseCard course={course} />);
        const timecommitmentArray = course.profs[0].time_commitment;
        const courseTimeCommitment100 = (timecommitmentArray.reduce((previousValue, currentValue) => previousValue + currentValue))/(timecommitmentArray.length)*10
        const courseTimeCommitmentHours = Math.round(courseTimeCommitment100/10*100)/100;
        expect(getByText(courseTimeCommitmentHours)).toBeInTheDocument();
        expect(getByText(courseTimeCommitmentHours)).toBeVisible();
        });


            
});
