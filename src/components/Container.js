import React, { useState } from "react";

import CardGrid from "../components/CardGrid";
import Review from "../components/Review"

function Container() {
  const [reviewing, setReviewing] = useState(false);
  const View = reviewing ? Review : CardGrid;
  return (
    <View
      onClick={() => {
        setReviewing(!reviewing);
      }}
    />
  );
}

export default Container;