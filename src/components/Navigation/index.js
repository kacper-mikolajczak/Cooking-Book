import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

import styled from "styled-components";
import { useSelector } from "react-redux";

const Navigation = ({ handleItemClick }) => {
  const user = useSelector((state) => state.session.authUser);
  return (
    <div>
      {user ? <NavigationAuth handleItemClick /> : <NavigationNonAuth />}
    </div>
  );
};

const NavigationAuth = ({ handleItemClick }) => {
  return (
    <StyledNavbar>
      <ul>
        <li onClick={handleItemClick}>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li onClick={handleItemClick}>
          <Link to={ROUTES.RECIPE_NEW}>New Recipe</Link>
        </li>
        <li onClick={handleItemClick}>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li onClick={handleItemClick}>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </StyledNavbar>
  );
};

const NavigationNonAuth = ({ handleItemClick }) => {
  return (
    <StyledNavbar>
      <ul>
        <li onClick={handleItemClick}>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li onClick={handleItemClick}>
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
      </ul>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  & > ul {
    padding: 0;
    display: flex;
    list-style: none;
    justify-content: space-evenly;
    align-items: center;
    & > li {
      border-bottom: 2px solid rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      font-size: 1.2em;
      &:hover {
        border-bottom: 2px solid blue;
      }
      & > a {
        cursor: pointer;
        padding: 5px;
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: black;
      }
    }
  }
`;

export default Navigation;
