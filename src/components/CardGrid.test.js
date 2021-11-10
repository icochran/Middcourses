import { render } from "@testing-library/react";
import CardGrid from "./CardGrid";

describe("CardGrid: CardGrid tests", () => {
  let CardGrid;

  //creates a common courses before each test is run
  beforeEach(() => {
    courses = [
            {
              "class_name": "Software Development",
              "dept": "CSCI",
              "class_num": "312",
              "profs": [
                {
                  "prof_name": "Christopher Andrews",
                  "satisfaction": [1,1,1,1,1],
                  "difficulty": [8,8,8],
                  "interest": [5, 4, 3, 2, 1, 3, 4],
                  "time_commitment": [9,9,9]
                },
                {
                  "prof_name": "Linderman",
                  "satisfaction": [5, 5, 4, 5, 4, 3, 4],
                  "difficulty": [5, 5, 5, 5, 5, 5, 5],
                  "interest": [5, 4, 3, 2, 1, 3, 4],
                  "time_commitment": [5, 4, 3, 4, 3, 2, 1]
                }
              ],
              "course_desc":"Class where you learn Software Development",
              "id": 0
            },
            {
              "class_name": "Intro to Data Science",
              "dept": "MATH",
              "class_num": "118",
              "profs": [
                {
                  "prof_name": "Kara Karpman",
                  "satisfaction": [3,3,3,3],
                  "difficulty": [5, 5, 5, 5, 5, 5, 5],
                  "interest": [5, 4, 3, 2, 1, 3, 4],
                  "time_commitment": [5, 4, 3, 4, 3, 2, 1]
                },
                {
                  "prof_name": "Alex Lyford",
                  "satisfaction": [5, 5, 4, 5, 4, 3, 4],
                  "difficulty": [5, 5, 5, 5, 5, 5, 5],
                  "interest": [5, 4, 3, 2, 1, 3, 4],
                  "time_commitment": [5, 4, 3, 4, 3, 2, 1]
                }
              ],
              "course_desc":"Class where you learn Data Science",
              "id": 1
            }]  });

  test("Article: title is displayed", () => {
    const { getByText } = render(<Article article={article} />);
    expect(getByText(article.title)).toBeInTheDocument();
    expect(getByText(article.title)).toBeVisible();
  });

  test("Article: body is displayed", () => {
    const { getByText } = render(<Article article={article} />);
    expect(getByText(article.contents)).toBeInTheDocument();
    expect(getByText(article.contents)).toBeVisible();
  });

  test("Article: date is displayed", () => {
    const { getByText } = render(<Article article={article} />);
    const expectedDate = new Date(article.edited).toLocaleString();
    expect(getByText(expectedDate)).toBeInTheDocument();
    expect(getByText(expectedDate)).toBeVisible();
  });
});
