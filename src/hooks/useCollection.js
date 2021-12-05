import { useState, useEffect } from "react";

//import { getAllCourses } from "../lib/backend-utils.js";
//import data from "../../data/seed.json"
//import testData from "../../data/test-data.json"

export default function useCollection() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
          const response = await fetch(
            "/api/courses"
          );
    
          if (!response.ok) {
            throw new Error(response.statusText);
          }
    
          const courses = await response.json();
    
          setData(courses);
        };
    
        getData();
      }, []);

    return data;
}