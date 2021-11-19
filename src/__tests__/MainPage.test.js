import { screen, fireEvent, render } from "@testing-library/react";
import MainPage from "../pages/index.js";
import testData from "../../data/test-data.json";
import useCollection from "../hooks/useCollection";


jest.mock("../hooks/useCollection");

describe("MainPage: Integration Tests", () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
    });


    test("Search by title (lowercase): only courses with titles that match search are displayed", () => {
        useCollection.mockReturnValue(testData);
        render(<MainPage/>);
        const searchInput = screen.getByPlaceholderText("Search");
        fireEvent.change(searchInput, {target: {value: "computer"}});
        expect(searchInput.value).toBe("computer");
        const searchbutton = screen.queryByRole("button", { name: "Search" });
        fireEvent.click(searchbutton);

        const courses = screen.queryAllByTestId("courseName").map((course) => course.textContent);
        expect(courses).toEqual(["Computer Systems", "Computer Engineering", "Computer Architecture"]);

    });

    test("Search by title (uppercase): only courses with titles that match search are displayed", () => {
        useCollection.mockReturnValue(testData);
        render(<MainPage/>);
        const searchInput = screen.getByPlaceholderText("Search");
        fireEvent.change(searchInput, {target: {value: "ComPUter"}});
        expect(searchInput.value).toBe("ComPUter");
        const searchbutton = screen.queryByRole("button", { name: "Search" });
        fireEvent.click(searchbutton);

        const courses = screen.queryAllByTestId("courseName").map((course) => course.textContent);
        expect(courses).toEqual(["Computer Systems", "Computer Engineering", "Computer Architecture"]);

    });
})