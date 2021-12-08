import { useState, useEffect } from "react";

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

