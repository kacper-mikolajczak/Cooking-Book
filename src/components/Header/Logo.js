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
    margin-top: ${({ small }) => (small ? "5px" : "15x")};
    margin-right: 0;
    margin-bottom: ${({ small }) => (small ? "0px" : "15px")};
    margin-left: 10px;
    padding: ${({ small }) => (small ? "10px" : "5px")};
    font-size: ${({ small }) => (small ? "2rem" : "2rem")};
    background-position: 30% 35%;
    background-image: url(${"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

export default Logo;
