import { screen, fireEvent, render } from "@testing-library/react";
import MainPage from "./index.js";

describe("SearchBar tests", () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
    });


    test("Search by title: only courses with titles that match search are displayed", () => {
        render(<MainPage/>);


        render(<SearchBar searchByCallback ={handler} />);
        const searchInput = screen.getByPlaceholderText("Search");
        expect(searchInput.value).toBe("");

        let searchbutton = screen.queryByRole("button", { name: "Search" });
        expect(searchbutton).toBeDisabled();

        fireEvent.change(searchInput, {target: {value: "criteria"}});
        searchbutton = screen.queryByRole("button", { name: "Search" });
        expect(searchbutton).not.toBeDisabled();
    });
})