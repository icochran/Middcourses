import { screen, fireEvent, render } from "@testing-library/react";
import Filter from "./Filter";
import collection from "../../data/test-data.json";



describe("Filter tests", () => {
    const handler = jest.fn();

    const deptSet = new Set();
    const sortedDepts = collection.map(course => course.dept).sort();
    sortedDepts.forEach(e => deptSet.add(e));
    const departments = Array.from(deptSet);

    const profs = [];

    beforeEach(() => {
        handler.mockReset();
      });

      //not sure this test is possible as it requires access to the card grid
    test.skip("Clicking a department filters by that deparment", () => {
        render(<Filter setFilterBy ={handler} departments = {departments} prof = {profs}/>);

        const depbutton = screen.getByText("MATH");
        

        fireEvent.click(depbutton);
        screen.debug();
        expect(screen.queryByText(collection[1].class_name)).toBeVisible();
        expect(screen.getByText(collection[0].class_name)).not.toBeVisible();
    });

    test("Each department is shown as filter option", () => {
        render(<Filter setFilterBy ={handler} departments = {departments} prof = {profs}/>);

        departments.forEach((dept) => {
            expect(screen.getByText(dept)).toBeVisible();
          });


    })


})