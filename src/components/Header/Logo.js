import React from "react";

import { Link } from "react-router-dom";
import { LANDING } from "../../constants/routes";

import styled from "styled-components";

const Logo = ({ handleClick }) => {
  return (
    <Link
      onClick={handleClick}
      to={LANDING}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <StyledLogo>
        <h1>Cooking Search</h1>
      </StyledLogo>
    </Link>
  );
};

const StyledLogo = styled.div`
  & {
    margin-top: 30px;
    text-align: center;
  }
`;

export default Logo;
