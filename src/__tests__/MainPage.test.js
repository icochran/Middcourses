import { screen, fireEvent, render } from "@testing-library/react";
import MainPage from "../pages/index.js";
import testData from "../../data/test-data.json";
import useCollection from "../hooks/useCollection";
import { useSession } from "next-auth/client";


jest.mock("../hooks/useCollection");
jest.mock("next-auth/client");


describe("MainPage: Integration Tests", () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
    });

    test("Search by title (lowercase): only courses with titles that match search are displayed", () => {
        useCollection.mockReturnValue(testData);
        useSession.mockReturnValue([{user: {name:"someone"}}, false]);
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
        useSession.mockReturnValue([{user: {name:"someone"}}, false]);
        render(<MainPage/>);
        const searchInput = screen.getByPlaceholderText("Search");
        fireEvent.change(searchInput, {target: {value: "SoftWAre"}});
        expect(searchInput.value).toBe("SoftWAre");
        const searchbutton = screen.queryByRole("button", { name: "Search" });
        fireEvent.click(searchbutton);

        const courses = screen.queryAllByTestId("courseName").map((course) => course.textContent);
        expect(courses).toEqual(["Software Development"]);
    });

    test("Search by prof (lowercase): only courses with profs that match search are displayed", () => {
        useCollection.mockReturnValue(testData);
        useSession.mockReturnValue([{user: {name:"someone"}}, false]);
        render(<MainPage/>);
        const searchInput = screen.getByPlaceholderText("Search");
        fireEvent.change(searchInput, {target: {value: "andrews"}});
        expect(searchInput.value).toBe("andrews");
        const searchbutton = screen.queryByRole("button", { name: "Search" });
        fireEvent.click(searchbutton);

        const courses = screen.queryAllByTestId("courseName").map((course) => course.textContent);
        expect(courses).toEqual(["Software Development", "Computer Systems", "Computer Engineering", "Computer Architecture"]);
    });

    test("Search by prof (uppercase): only courses with profs that match search are displayed", () => {
        useCollection.mockReturnValue(testData);
        useSession.mockReturnValue([{user: {name:"someone"}}, false]);
        render(<MainPage/>);
        const searchInput = screen.getByPlaceholderText("Search");
        fireEvent.change(searchInput, {target: {value: "KarpMAN"}});
        expect(searchInput.value).toBe("KarpMAN");
        const searchbutton = screen.queryByRole("button", { name: "Search" });
        fireEvent.click(searchbutton);

        const courses = screen.queryAllByTestId("courseName").map((course) => course.textContent);
        expect(courses).toEqual(["Intro to Data Science"]);
    });

    test("Filter by dept: only courses with dept that match filter are displayed", async () => {
        useCollection.mockReturnValue(testData);
        useSession.mockReturnValue([{user: {name:"someone"}}, false]);
        render(<MainPage/>);
        const deptText = screen.getByText("Department");
        fireEvent.click(deptText);
        const CSbutton = await screen.getByText("CSCI");
        fireEvent.click(CSbutton);
        const courses = screen.queryAllByTestId("courseName").map((course) => course.textContent);
        expect(courses).toEqual(["Software Development", "Computer Systems", "Computer Engineering", "Computer Architecture"]);
    });

    test("Filter by prof: only courses with profs that match filter are displayed", async () => {
        useCollection.mockReturnValue(testData);
        useSession.mockReturnValue([{user: {name:"someone"}}, false]);
        render(<MainPage/>);
        const profb = screen.getByText("Professor");
        fireEvent.click(profb);
        const profText = await screen.getByText("M. Linderman");
        fireEvent.click(profText);
        const courses = screen.queryAllByTestId("courseName").map((course) => course.textContent);
        expect(courses).toEqual(["Software Development"]);
    });
})