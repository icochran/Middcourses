import { screen, fireEvent, render } from "@testing-library/react";
import Filter from "./Filter";
import collection from "../../data/test-data.json";



describe("Filter tests", () => {
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

    test("Each department is shown as filter option", () => {
        render(<Filter setFilterBy ={handler} departments = {departments} prof = {professors}/>);

        departments.forEach((dept) => {
            expect(screen.getByText(dept)).toBeVisible();
          });
    })

    test("Each professor is shown as filter option", () => {
      render(<Filter setFilterBy ={handler} departments = {departments} prof = {professors}/>);

      departments.forEach((prof) => {
          expect(screen.getByText(prof)).toBeVisible();
        });
  })


})