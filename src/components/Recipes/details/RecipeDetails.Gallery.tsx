import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { useWindowDimensions } from "../../../hooks";

import { IconButton } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { smallScreen } from "../../../constants/screen";

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
  const small = windowWidth < smallScreen;
  const urls = url ? url.split("\n") : [];
  const [index, setIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

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
            <IconButton onClick={(e) => handleArrowClick("left")}>
              <ArrowLeftIcon
                style={{ transform: "scale(2)", color: "white" }}
              />
            </IconButton>
          </StyledArrow>
          {!imgLoaded ? (
            <Skeleton
              style={{ border: "1px solid gray", borderRadius: "15px" }}
              width="100%"
              height="100%"
              variant="rect"
              animation="pulse"
            >
              <img src={urls[index]} alt="" onLoad={() => setImgLoaded(true)} />
            </Skeleton>
          ) : (
            <img
              style={{ border: "1px solid gray" }}
              src={urls[index]}
              alt=""
              onLoad={() => setImgLoaded(true)}
            />
          )}
          <StyledArrow className={"right"}>
            <IconButton
              color="secondary"
              onClick={(e) => handleArrowClick("right")}
            >
              <ArrowRightIcon
                style={{ transform: "scale(2)", color: "white" }}
              />
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
    left: 10px;
    background-color: rgba(100, 100, 255, 0.5);
    border-radius: 50%;
  }
  &.right {
    left: calc(100% - 60px);
  }
`;

export default Gallery;
