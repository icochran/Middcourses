import { screen, fireEvent, render } from "@testing-library/react";
import SearchBar from "./SearchBar";

//still need tests to actually see the functionality of the search bar
//but think we might need to reorganize some of the components so that
//the search bar has access to the collection?


describe("SearchBar tests", () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
      });


    test("Search button is disabled if no input text", () => {
        render(<SearchBar searchByCallback ={handler} />);
        const searchInput = screen.getByPlaceholderText("Search");
        expect(searchInput.value).toBe("");

        let searchbutton = screen.queryByRole("button", { name: "Search" });
        expect(searchbutton).toBeDisabled();

        fireEvent.change(searchInput, {target: {value: "criteria"}});
        searchbutton = screen.queryByRole("button", { name: "Search" });
        expect(searchbutton).not.toBeDisabled();
    });

    test("Hitting enter key triggers search button", () => {
        render(<SearchBar searchByCallback ={handler} />);
        const searchInput = screen.getByPlaceholderText("Search");
        fireEvent.change(searchInput, {target: {value: "Software"}});
        expect(searchInput.value).toBe("Software");

        const searchbutton = screen.queryByRole("button", { name: "Search" });
        fireEvent.click(searchbutton);

        expect(handler).toHaveBeenCalled();
        expect(handler).toHaveBeenCalledWith("Software");
    });


    test("Hitting clear button clears contents of search input", () => {
        render(<SearchBar searchByCallback ={handler} />);
        const searchInput = screen.getByPlaceholderText("Search");
        fireEvent.change(searchInput, {target: {value: "Software"}});
        expect(searchInput.value).toBe("Software");

        const clearbutton = screen.queryByRole("button", { name: "Clear" });
        fireEvent.click(clearbutton);

        expect(searchInput.value).toBe("");
    });



})