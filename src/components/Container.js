import React, { useState } from "react";

import styles from "../styles/Home.module.css"
import Flippy, { FrontSide, BackSide } from "react-flippy"
import CourseCard from "../components/CourseCard";
import Review from "../components/Review"
import DetailedCourseCard from "../components/DetailedCourseCard"

function Container({course, setRating}) {
  const [reviewing, setReviewing] = useState(false);
  const [detailed, setDetailed] = useState(false);
  const [back, setBack] = useState(false);

  let View = CourseCard;

  //handles animation so that there are "3-sides"
  const handleDetailBackClick = () => {
    setDetailed(!detailed);
    setBack(true);
  }

  const handleAddReviewClick = () => {
    setReviewing(!reviewing);
    setBack(false);
  }

  //= reviewing ? Review : CourseCard;
  if(detailed || back) {
    View = DetailedCourseCard;
  } else if (!detailed) {
    View = Review;
  }

  return (
    <Flippy 
    className = {styles.flippyBox}
    flipOnClick = {false}
    isFlipped = {detailed || reviewing}
    >
      <FrontSide className = {styles.center}>
        <CourseCard
          course={course}
          changeState={() => {
            setReviewing(!reviewing);
          }}
          seeDetails={() => {
            setDetailed(!detailed);
          }}
          setAddReview = {handleAddReviewClick}
        />
      </FrontSide>
      <BackSide className = {styles.center}>
        <View
          course={course}
          changeState={() => {
            setReviewing(!reviewing);
          }}
          seeDetails={() => {
            setDetailed(!detailed);
          }}
          setBack = {handleDetailBackClick}
        />
      </BackSide>
    </Flippy>
  );
}

export default Container;