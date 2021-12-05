import { render, screen } from "@testing-library/react";
import Review from "./Review";

describe("Review: Review tests", () => {
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
            }
    // function changeState () => {
    //       setReviewing(!reviewing);
    //           }
     });

    test("Review: displays class title", () => {
        render(<Review course={course} />);
        expect(screen.getByText(course.class_name)).toBeVisible();
    });

    test("Review: displays Difficulty buttons", () => {
      render(<Review course={course} />);
      expect(screen.getByTestId("Difficulty")).toBeVisible();
    });

    test("Review: displays Interesting buttons", () => {
        render(<Review course={course} />);
        expect(screen.getByTestId("Interest")).toBeVisible();
    });

    test("Review: displays Satisfaction buttons", () => {
      render(<Review course={course} />);
      expect(screen.getByTestId("Satisfaction")).toBeVisible();
    });

    test("Review: displays Time buttons", () => {
      render(<Review course={course} />);
      expect(screen.getByTestId("Time")).toBeVisible();
    });

    // test("Review: displays course time commitment in hours", () => {
    //     const { getByText } = render(<CourseCard course={course} />);
    //     const timecommitmentArray = course.profs[0].time_commitment;
    //     const courseTimeCommitment100 = (timecommitmentArray.reduce((previousValue, currentValue) => previousValue + currentValue))/(timecommitmentArray.length)*10
    //     const courseTimeCommitmentHours = Math.round(courseTimeCommitment100/10*100)/100;
    //     expect(getByText(`${courseTimeCommitmentHours} hours`)).toBeInTheDocument();
    //     expect(getByText(`${courseTimeCommitmentHours} hours`)).toBeVisible();
    //     });


            
});