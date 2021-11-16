import { screen, fireEvent, render } from "@testing-library/react";
import Filter from "./Filter";
import collection from "../../data/test-data.json";



describe("Filter tests", () => {
    const handler = jest.fn();

    const deptSet = new Set();
    const sortedDepts = collection.map(course => course.dept).sort();
    sortedDepts.forEach(e => deptSet.add(e));
    const departments = Array.from(deptSet);

    beforeEach(() => {
        handler.mockReset();
      });

      //not sure this test is possible as it requires access to the card grid
    test("Clicking a department filters by that deparment", () => {
        render(<Filter setFilterBy ={handler} departments = {departments}/>);

        const depbutton = screen.getByText("MATH");

        fireEvent.click(depbutton);
        expect(screen.queryByText(collection[1].class_name)).toBeVisible();
        expect(screen.getByText("Computer Architecture")).not.toBeVisible();
    });

    test("Each department is shown as filter option", () => {
        render(<Filter setFilterBy ={handler} departments = {departments}/>);

        departments.forEach((dept) => {
            expect(screen.getByText(dept)).toBeVisible();
          });


    })


})