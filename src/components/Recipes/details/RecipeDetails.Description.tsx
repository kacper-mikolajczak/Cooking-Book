import React from "react";

const Description = ({ text }: { text: string }) => {
  const displayedText = text ? text : "There is no description :(";
  return (
    <div style={{ margin: "20px" }}>
      <h3>Description: </h3>
      {displayedText}
    </div>
  );
};

export default Description;
