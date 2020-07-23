import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { useWindowDimensions } from "../../../hooks";

import { IconButton } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

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
  const { width: windowWidth } = useWindowDimensions();
  const small = windowWidth < 768;
  const urls = url ? url.split("\n") : [];
  const imgIndex = useRef(0);
  const [index, setIndex] = useState(0);

  const addIndexWrap = (val: number) => {
    setIndex((i: number): number => {
      let out = (i + val) % urls.length;
      if (out < 0) out = urls.length - 1;
      return out;
    });
  };

  const handleArrowClick = (dir: string) => {
    if (dir === "right") addIndexWrap(1);
    else addIndexWrap(-1);
  };

  useEffect(() => {
    const imgInterval = setInterval(() => {
      addIndexWrap(1);
    }, delay);
    return () => clearInterval(imgInterval);
  }, [urls]);

  return (
    <>
      {urls.length > 0 ? (
        <StyledWrapper small={small}>
          <StyledArrow className={"left"}>
            <IconButton
              color="secondary"
              onClick={(e) => handleArrowClick("left")}
            >
              <ArrowLeftIcon />
            </IconButton>
          </StyledArrow>

          <img src={urls[index]} alt="" />
          <StyledArrow className={"right"}>
            <IconButton
              color="secondary"
              onClick={(e) => handleArrowClick("right")}
            >
              <ArrowRightIcon />
            </IconButton>
          </StyledArrow>
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
    position: relative;
  }
  & img {
    border-radius: 15px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const StyledArrow = styled.div`
  & {
    position: absolute;
    top: calc(50%-10px);
    left: 0;
    background-color: rgba(100, 100, 255, 0.1);
    border-radius: 50%;
  }
  &.right {
    left: calc(100% - 50px);
  }
`;

export default Gallery;
