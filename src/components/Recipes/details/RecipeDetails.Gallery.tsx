import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { useWindowDimensions } from "../../../hooks";
const delay = 3000;
const Gallery = ({
  url,
  width,
  height,
}: {
  url: string;
  width: string;
  height: string;
}) => {
  const { windowHeight, windowWidth } = useWindowDimensions();
  const small = windowWidth < 768;
  const urls = url ? url.split("\n") : [];
  const imgIndex = useRef(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      setIndex((i: number) => (i + 1) % urls.length);
    }, delay);
    return () => clearInterval(imgInterval);
  }, [urls]);

  return (
    <>
      {urls.length > 0 ? (
        <StyledWrapper small={small}>
          <img src={urls[index]} alt="" />
        </StyledWrapper>
      ) : (
        <p>No photo added to this recipe</p>
      )}
    </>
  );
};

const StyledWrapper = styled.div`
  & {
    height: ${({ small }: { small: boolean }) => (small ? "200px" : "300px")};
    display: grid;
    place-items: center;
    border-radius: 15px;
  }
  & img {
    border-radius: 15px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export default Gallery;
