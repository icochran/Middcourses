import { screen, fireEvent, render } from "@testing-library/react";
import MainPage from "../pages/index.js";
import testData from "../../data/test-data.json";
import useCollection from "../hooks/useCollection";
import NavBar from "./NavBar";

jest.mock("../hooks/useCollection");

describe("Filter tests", () => {

    const handler = jest.fn();

    beforeEach(() => {
      handler.mockReset();
    });

    test("Each department is shown as filter option", () => {
      useCollection.mockReturnValue(testData);
      render(<MainPage/>);
      const departmentbutton = screen.getByTestId("dept");
      fireEvent.click(departmentbutton);
      const depts = screen.queryAllByTestId("dept2").map((dept) => dept.textContent);
      expect(depts).toEqual(["None", "CSCI", "MATH"]);

    })

    test("Each professor is shown as filter option", () => {
      useCollection.mockReturnValue(testData);
      render(<MainPage/>);
      const profs = screen.queryAllByTestId("prof").map((prof) => prof.textContent);
      expect(profs).toEqual(
        [
          "None",
          "C. Andrews",
          "K. Karpman",
          "M. Linderman",
          "A. Lyford"
        ]
      );

  })

  test.only("Clicking a dept sets the filter to that dept and displays on screen", () => {
    useCollection.mockReturnValue(testData);
    render(<MainPage/>);
    expect.stringMatching("Filtering");
    const departmentb = screen.getByTestId("dept");
    fireEvent.click(departmentb);
    fireEvent.click(screen.getByText("CSCI"));
    expect(screen.getByText("Filtering by: CSCI"));
  })

  test("Clicking a prof sets the filter to that prof and displays on screen", () => {
    useCollection.mockReturnValue(testData);
    render(<MainPage/>);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: None");
    const profText = screen.getByText("A. Lyford");
    fireEvent.click(profText);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: A. Lyford");
  })

  test("Clicking none sets the dept filter to none", () => {
    useCollection.mockReturnValue(testData);
    render(<MainPage/>);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: None");
    const deptText = screen.getByText("CSCI");
    fireEvent.click(deptText);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: CSCI");

    const none = screen.getAllByText("None")[0];
    fireEvent.click(none);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: None");
  })

  test("Clicking none sets the prof filter to none", () => {
    useCollection.mockReturnValue(testData);
    render(<MainPage/>);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: None");
    const profText = screen.getByText("A. Lyford");
    fireEvent.click(profText);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: A. Lyford");

    const none = screen.getAllByText("None")[1];
    fireEvent.click(none);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: None");
  })


})