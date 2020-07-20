import React from "react";

import { Link } from "react-router-dom";
import { LANDING } from "../../constants/routes";

import styled from "styled-components";

const Logo = ({ handleClick, logoText, small }) => {
  return (
    <Link
      onClick={handleClick}
      to={LANDING}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <StyledLogo small={small}>
        <h1>{logoText}</h1>
      </StyledLogo>
    </Link>
  );
};

const StyledLogo = styled.div`
  & {
    text-align: center;
  }
  & h1 {
    margin: ${({ small }) => (small ? "10px" : "30px")};
    font-size: ${({ small }) => (small ? "2rem" : "1.5rem")};
    background-image: url(${"https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"});
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
`;

export default Logo;
