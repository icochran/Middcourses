import { render, screen } from "@testing-library/react";
import CourseCard from "./CourseCard";



describe("CourseCard: CourseCard tests", () => {
  let course1;
  let course2;
  let course3;
  let course4;

  //creates a common courses before each test is run
  beforeEach(() => {
    course1 = // red
            {
              "class_name": "Software Development",
              "dept": "CSCI",
              "class_num": "312",
              "profs": [
                {
                  "prof_name": "C. Andrews",
                  "satisfaction": [1,1,1,1,1],
                  "difficulty": [8,8,8],
                  "interest": [5, 4, 3, 2, 1, 3, 4],
                  "time_commitment": [9,9,9]
                }
              ],
              "course_desc":"Class where you learn Software Development",
              "id": 1
            };
    course2 = // blue
            {
              "class_name": "Computer Architecture",
              "dept": "CSCI",
              "class_num": "202",
              "profs": [
                {
                  "prof_name": "C. Andrews",
                  "satisfaction": [],
                  "difficulty": [],
                  "interest": [],
                  "time_commitment": []
                }
              ],
              "course_desc":"In this course students will learn about agroecology as a set of practices, a philosophy, and a social movement, with an emphasis on the first two perspectives. Agroecology takes advantage of natural processes to the greatest extent possible, using biological inputs rather than purchased pesticides and fertilizers. In addition to having major benefits for poor farmers in developing countries, it is attracting increased attention as an alternative to industrialized agriculture in wealthy countries.  The course will include field trips to farms, lab exercises, and discussion of readings. (formerly INTD 0310) 3 hrs. lect./disc.",
              "id": 2
            };
    course3 = // green
            {
              "class_name": "Computer Engineering",
              "dept": "CSCI",
              "class_num": "202",
              "profs": [
                {
                  "prof_name": "C. Andrews",
                  "satisfaction": [7,7,7,7,7],
                  "difficulty": [5, 5, 5, 5, 5, 5, 5],
                  "interest": [5, 4, 3, 2, 1, 3, 4],
                  "time_commitment": [5, 4, 3, 4, 3, 2, 1]
                }
              ],
              "course_desc":"How do geographers study spatial interactions between people and the environment? How does socio-economic status relate to spatial patterns of settlement, social organization, access to resources, and exposure to risks? How can geographic information systems (GIS) help geographers explain these spatial patterns and processes? In this course we will apply GIS to a wide range of topics in human geography including urban, environmental, political, hazards, and health. We will learn how to gather, create, analyze, visualize, and critically interpret geographic data through tutorials, collaborative labs, and independent work that culminate in cartographic layouts of our results. 3 hrs. lect./3 hrs. lab.",
              "id": 3
            };
    course4 = // yellow
            {
              "class_name": "Intro to Data Science",
              "dept": "MATH",
              "class_num": "118",
              "profs": [
                {
                  "prof_name": "K. Karpman",
                  "satisfaction": [3,3,3,3,2,1],
                  "difficulty": [5, 5, 3, 5, 2, 5, 1],
                  "interest": [5, 4, 3, 2, 5, 3, 4],
                  "time_commitment": [1, 1, 1, 1, 3, 2, 1]
                }
              ],
              "course_desc":"In this course regression analysis is introduced. The major focus is on quantifying relationships between economic variables. Multiple regression identifies the effect of several exogenous variables on an endogenous variable. After exploring the classical regression model, fundamental assumptions underlying this model will be relaxed, and further new techniques will be introduced. Methods for testing hypotheses about the regression coefficients are developed throughout the course. Both theoretical principles and practical applications will be emphasized. The course goal is for each student to employ regression analysis as a research tool and to justify and defend the techniques used. (MATH 0121; and ECON 0150 or ECON 0155; and ECON 0210) 3 hrs. lect., 1 hr. lab",
              "id": 1
            };
          });

    test("CourseCard: displays class title", () => {
        render(<CourseCard course={course1} />);
        expect(screen.getByText(course1.class_name)).toBeVisible();
    });

    test("CourseCard: displays 3 different rating bars (not necessarily the right level)", () => {
        render(<CourseCard course={course1} />);
        expect(screen.queryAllByTestId("Bar").length === 3).toBeTruthy();
    });

    test("CourseCard: displays course time commitment in hours", () => {
        const { getByText } = render(<CourseCard course={course1} />);
        const timeCommitmentArray = course1.profs[0].time_commitment;
        const courseTimeCommitment100 = (timeCommitmentArray.reduce((previousValue, currentValue) => previousValue + currentValue))/(timeCommitmentArray.length)*10
        const courseTimeCommitmentHours = Math.round(courseTimeCommitment100/10*100)/100;
        expect(getByText(`${courseTimeCommitmentHours} hours`)).toBeInTheDocument();
        expect(getByText(`${courseTimeCommitmentHours} hours`)).toBeVisible();
    });

    test("CourseCard: courses with no reviews are blue", () => {
      render(<CourseCard course={course2} />);
      expect(screen.getByRole("style").borderColor).toEqual("#c6e4ff");
    });

    test("CourseCard: courses with satisfaction >= 4 are green", () => {
      render(<CourseCard course={course3} />);
      expect(screen.getByRole("style").borderColor).toEqual();
    });

    test("CourseCard: courses with 2 <= satisfaction < 4 are yellow", () => {
      render(<CourseCard course={course4} />);
      expect(screen.getByRole("style").borderColor).toEqual();
    });
         
    test("CourseCard: courses with satisfaction < 2 are red", () => {
      render(<CourseCard course={course1} />);
      expect(screen.getByRole("style").borderColor).toEqual();
    });
});
