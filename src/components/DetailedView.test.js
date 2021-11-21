import { screen, fireEvent, render } from "@testing-library/react";
import MainPage from "../pages/index.js";
import testData from "../../data/test-data.json";
import useCollection from "../hooks/useCollection";
import DetailedCourseCard from "./DetailedCourseCard";
import CourseCard from "./CourseCard";


jest.mock("../hooks/useCollection");

describe("DetailedView tests", () => {

    const handler = jest.fn();

    beforeEach(() => {
      handler.mockReset();
    });
    
    test("CourseCard: clicking details calls handler", () => {
        render(<CourseCard course={testData[0]} seeDetails = {handler}/>);
        const detailbutton = screen.queryByRole("button", { name: "Details" });
        expect(detailbutton).toBeVisible;

        fireEvent.click(detailbutton);
        expect(handler).toHaveBeenCalled();

    });



})
