import { useState } from "react";
//import { getAllCourses } from "../lib/backend-utils.js";
import data from "../../data/seed.json"
//import testData from "../../data/test-data.json"

export default function useCollection() {
    //const data = getAllCourses();
    const [collection] = useState(data);

    return collection;
}