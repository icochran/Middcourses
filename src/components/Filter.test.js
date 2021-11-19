import { screen, fireEvent, render } from "@testing-library/react";
//import Filter from "./Filter";
import MainPage from "../pages/index.js";
import testData from "../../data/test-data.json";
import useCollection from "../hooks/useCollection";

jest.mock("../hooks/useCollection");

describe("Filter tests", () => {
    /*
    const handler = jest.fn();
    const deptSet = new Set();
    const sortedDepts = collection.map(course => course.dept).sort();
    sortedDepts.forEach(e => deptSet.add(e));
    const departments = Array.from(deptSet);

    const profSet = new Set();
    const sortedProfs = collection.map((course) => {
      for (let i = 0; i < course.profs.length; i++) {
        const str = course.profs[i].prof_name;
        if (str.includes("Fall 2021")) {
          const ind = str.indexOf(":") + 2;
          const lInd = str.indexOf(";");
          return str.substring(ind,lInd);
        }
        if (str.includes("Spring 2022")) {
          const lInd = str.indexOf(";");
          const ind2 = str.indexOf(":", lInd) + 2;
          return str.substring(ind2);
        }
        if (str !== "") {
          return str;
        }
      }}).sort();
    sortedProfs.forEach((e) => {
      if (!(profSet.has(e))) {
        profSet.add(e)
      }});
    const professors = Array.from(profSet);

    beforeEach(() => {
        handler.mockReset();
    });
    */
    const handler = jest.fn();

    beforeEach(() => {
      handler.mockReset();
    });

    test("Each department is shown as filter option", () => {
      useCollection.mockReturnValue(testData);
      render(<MainPage/>);
      const depts = screen.queryAllByTestId("dept").map((dept) => dept.textContent);
      expect(depts).toEqual(["None", "CSCI", "MATH"]);

      /*
      render(<Filter setFilterBy ={handler} departments = {departments} prof = {professors}/>);

      departments.forEach((dept) => {
        expect(screen.getByText(dept)).toBeVisible();
      });
      */
    })

    test("Each professor is shown as filter option", () => {
      useCollection.mockReturnValue(testData);
      render(<MainPage/>);
      const profs = screen.queryAllByTestId("prof").map((prof) => prof.textContent);
      expect(profs).toEqual(
        [
          "None",
          "Alex Lyford",
          "Christopher Andrews", 
          "Kara Karpman",
          "Michael Linderman"
        ]
      );

      /*
      render(<Filter setFilterBy ={handler} departments = {departments} prof = {professors}/>);

      professors.forEach((prof) => {
          expect(screen.getByText(prof)).toBeVisible();
        });
      */
  })

  test("Clicking a dept sets the filter to that dept and displays on screen", () => {
    useCollection.mockReturnValue(testData);
    render(<MainPage/>);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: None");
    const deptText = screen.getByText("CSCI");
    fireEvent.click(deptText);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: CSCI");
  })

  test("Clicking a prof sets the filter to that prof and displays on screen", () => {
    useCollection.mockReturnValue(testData);
    render(<MainPage/>);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: None");
    const profText = screen.getByText("Alex Lyford");
    fireEvent.click(profText);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: Alex Lyford");
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
    const profText = screen.getByText("Alex Lyford");
    fireEvent.click(profText);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: Alex Lyford");

    const none = screen.getAllByText("None")[1];
    fireEvent.click(none);
    expect(screen.getByTestId("filterBy").textContent).toEqual("Filtering by: None");
  })


})