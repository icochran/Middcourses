import { screen, fireEvent, render } from "@testing-library/react";
import MainPage from "../pages/index.js";
import testData from "../../data/test-data.json";

describe("MainPage: Integration Tests", () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
    });


    test("Search by title (lowercase): only courses with titles that match search are displayed", () => {
        render(<MainPage/>);
        const searchInput = screen.getByPlaceholderText("Search");
        fireEvent.change(searchInput, {target: {value: "software"}});
        expect(searchInput.value).toBe("software");

        const courses = screen.queryAllByTitle("CourseCard").map((course) => course.class_name);
        console.log(courses);
        expect(courses).toEqual(["Software Development"]);

        // where am i putting in test data? how can i get each course card?
        

        /*
        render(<SearchBar searchByCallback ={handler} />);
        const searchInput = screen.getByPlaceholderText("Search");
        expect(searchInput.value).toBe("");

        let searchbutton = screen.queryByRole("button", { name: "Search" });
        expect(searchbutton).toBeDisabled();

        fireEvent.change(searchInput, {target: {value: "criteria"}});
        searchbutton = screen.queryByRole("button", { name: "Search" });
        expect(searchbutton).not.toBeDisabled();
        */
    });
})