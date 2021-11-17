import React, { useState } from "react";

import CardGrid from "../components/CardGrid";
import Review from "../components/Review"

function Container(props) {
  const [reviewing, setReviewing] = useState(false);
  const View = reviewing ? Review : CardGrid;
  return (
    <View
      {...props}
      onClick={() => {
        setShowDetail(!showDetail);
      }}
    />
  );
}

export default Container;