import { render, screen } from "@testing-library/react";
import RatingBar from "./RatingBar.js";

describe("CourseCard: CourseCard tests", () => {
    test("RatingBar: displays bar name", () => {
        render(<RatingBar aspect="Difficulty" percentage={50}/>);
        expect(screen.getByText("Difficulty")).toBeVisible();
    });           
});
