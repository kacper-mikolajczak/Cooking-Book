import React from "react";

const Gallery = ({
  url,
  width,
  height,
}: {
  url: string;
  width: string;
  height: string;
}) => {
  return (
    <div style={{ width, height }}>
      <img
        style={{ width: "100%", maxHeight: "350px", borderRadius: "10px" }}
        src={url}
        alt={"Recipe"}
      />
    </div>
  );
};

export default Gallery;
