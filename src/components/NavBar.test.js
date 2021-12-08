import { screen, fireEvent, render } from "@testing-library/react";
import MainPage from "../pages/index.js";
import testData from "../../data/test-data.json";
import useCollection from "../hooks/useCollection";
import { useSession } from "next-auth/client";

jest.mock("../hooks/useCollection");
jest.mock("next-auth/client");

describe("NavBar tests", () => {

    const handler = jest.fn();

    beforeEach(() => {
      handler.mockReset();
    });

    test("Each department is shown as filter option", async () => {
      useCollection.mockReturnValue(testData);
      useSession.mockReturnValue([{user: {name:"someone"}}, false]);
      render(<MainPage/>);
      const departmentbutton = screen.getByText("Department");
      fireEvent.click(departmentbutton);
      const depts = await screen.getAllByTestId("depts").map((dep) => dep.textContent);
      expect(depts).toEqual(["None", "CSCI", "MATH"]);

    })

    test("Each professor is shown as filter option", async () => {
      useCollection.mockReturnValue(testData);
      useSession.mockReturnValue([{user: {name:"someone"}}, false]);
      render(<MainPage/>);
      const professorbutton = screen.getByText("Professor");
      fireEvent.click(professorbutton);
      const profs = await screen.queryAllByTestId("profs").map((prof) => prof.textContent);
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

  test("Clicking a dept sets the filter to that dept and displays on screen", async () => {
    useCollection.mockReturnValue(testData);
    useSession.mockReturnValue([{user: {name:"someone"}}, false]);
    render(<MainPage/>);
    expect.stringMatching("Filtering by: None");
    const departmentb = screen.getByText("Department");
    fireEvent.click(departmentb);
    const CSbutton = await screen.getByText("CSCI");
    fireEvent.click(CSbutton);
    expect.stringMatching("Filtering by: CSCI");
    
  })

  test("Clicking a prof sets the filter to that prof and displays on screen", async () => {
    useCollection.mockReturnValue(testData);
    useSession.mockReturnValue([{user: {name:"someone"}}, false]);
    render(<MainPage/>);
    expect.stringMatching("Filtering by: None");
    const profb = screen.getByText("Professor");
    fireEvent.click(profb);
    const Profbutton = await screen.getByText("A. Lyford");
    fireEvent.click(Profbutton);
    expect.stringMatching("Filtering by: A. Lyford");
  })

  test("Clicking none sets the dept filter to none", async () => {
    useCollection.mockReturnValue(testData);
    useSession.mockReturnValue([{user: {name:"someone"}}, false]);
    render(<MainPage/>);
    expect.stringMatching("Filtering by: None");
    const departmentb = screen.getByText("Department");
    fireEvent.click(departmentb);
    const depb = await screen.getByText("CSCI");
    fireEvent.click(depb);
    expect.stringMatching("Filtering by: CSCI");
    const none = screen.getAllByText("None")[0];
    fireEvent.click(none);
    expect.stringMatching("Filtering by: None");
  })

  test("Clicking none sets the prof filter to none", async () => {
    useCollection.mockReturnValue(testData);
    useSession.mockReturnValue([{user: {name:"someone"}}, false]);
    render(<MainPage/>);
    expect.stringMatching("Filtering by: None");
    const professorb = screen.getByText("Professor");
    fireEvent.click(professorb);
    const profb = await screen.getByText("A. Lyford");
    fireEvent.click(profb);
    expect.stringMatching("Filtering by: A. Lyford");
    const none = screen.getAllByText("None")[0];
    fireEvent.click(none);
    expect.stringMatching("Filtering by: None");
  })


})