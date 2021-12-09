import { screen, fireEvent, render } from "@testing-library/react";
import testData from "../../data/test-data.json";
import DetailedCourseCard from "./DetailedCourseCard";
import CourseCard from "./CourseCard";

jest.mock("../hooks/useCollection");

describe("DetailedView tests", () => {

    const handler = jest.fn();

    beforeEach(() => {
      handler.mockReset();
    });
    
    test("DetailedView: clicking details button shows detail view", () => {
        render(<CourseCard course={testData[0]} seeDetails = {handler}/>);
        const detailbutton = screen.queryByRole("button", { name: "Details" });
        expect(detailbutton).toBeVisible;

        fireEvent.click(detailbutton);
        expect(handler).toHaveBeenCalled();

    });

    test("DetailedView: detailed view displays the right title", () => {
      render(<DetailedCourseCard course={testData[0]} setBack = {handler}/>);

      expect(screen.getByText("Software Development")).toBeVisible();
    });

    test("DetailedView: back button is visibile", () => {
      render(<DetailedCourseCard course={testData[0]} setBack = {handler}/>);
  
      const backbutton = screen.getByTestId("backbutton");
      expect(backbutton).toBeVisible();
    });

    test("DetailedView: clicking back button returns to card", () => {
      render(<DetailedCourseCard course={testData[0]} setBack = {handler}/>);
  
      const backbutton = screen.getByTestId("backbutton");
      fireEvent.click(backbutton);

      expect(handler).toHaveBeenCalled();
    });



})

/* {
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
    },
    {
      "prof_name": "M. Linderman",
      "satisfaction": [5, 5, 4, 5, 4, 3, 4],
      "difficulty": [5, 5, 5, 5, 5, 5, 5],
      "interest": [5, 4, 3, 2, 1, 3, 4],
      "time_commitment": [5, 4, 3, 4, 3, 2, 1]
    }
  ],
  "course_desc":"In this course we will apply the tools of economic analysis to the problem of global climate change. The goal is to expose students to how economists approach this important policy problem. The course will begin with a review of reasons for policy interventions in markets and policy instrument choice. We will then focus on the measurement of damages from emissions of greenhouse gases. Subsequent topics will include: discounting, technology and abatement costs, benefit-cost analysis, uncertainty and catastrophic risk, and policies in practice. (ECON 0255; ECON 0265 encouraged). 3 hrs. lect.",
  "id": 0
}, */