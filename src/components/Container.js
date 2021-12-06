import React, { useState } from "react";

import CourseCard from "../components/CourseCard";
import Review from "../components/Review"
import DetailedCourseCard from "../components/DetailedCourseCard"

function Container({course, setRating}) {
  const [reviewing, setReviewing] = useState(false);
  const [detailed, setDetailed] = useState(false);
  let View = CourseCard;
  //= reviewing ? Review : CourseCard;
  if(detailed) {
    View = DetailedCourseCard;
  }
  else if (reviewing) {
    View = Review;
  }
  else {View = CourseCard}



  return (
    <View
        course = {course}
      changeState={() => {
        setReviewing(!reviewing);
      }}
      seeDetails = {() => {
        setDetailed(!detailed);
      }}
      setRating={setRating}
    />
  );
}

export default Container;