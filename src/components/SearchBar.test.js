import { screen, fireEvent, render } from "@testing-library/react";
import SearchBar from "./SearchBar";




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




})