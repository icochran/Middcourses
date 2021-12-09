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
  const [profName, setProfName] = useState((()=> {
    if (course.profs.length===1){
      return course.profs[0].prof_name
    } else if (course.profs.length>1){
      return "Aggregate"
    } 
    return undefined
  }));


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
          profName={profName}
          setProfName={setProfName}
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
          setRating= {setRating}
          profName={profName}
          setProfName={setProfName}
        />
      </BackSide>
    </Flippy>
  );
}

export default Container;