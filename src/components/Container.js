import React, { useState } from "react";

import CourseCard from "../components/CourseCard";
import Review from "../components/Review"

function Container({course}) {
  const [reviewing, setReviewing] = useState(false);
  const View = reviewing ? Review : CourseCard;

  return (
    <View
        course = {course}
      changeState={() => {
        setReviewing(!reviewing);
      }}
    />
  );
}

export default Container;