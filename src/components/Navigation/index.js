import React, { useState } from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { IconButton, Avatar, Menu, MenuItem } from "@material-ui/core";
import { useWindowDimensions } from "../../hooks";

const Navigation = ({ handleItemClick }) => {
  const user = useSelector((state) => state.session.authUser);
  const { height, width } = useWindowDimensions();
  const small = width < 768;
  return (
    <>
      {user ? (
        <NavigationAuth
          user={user}
          handleItemClick={handleItemClick}
          small={small}
        />
      ) : (
        <NavigationNonAuth small={small} />
      )}
    </>
  );
};

const NavigationAuth = ({ user, handleItemClick, small }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = (e) => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (e) => {
    handleMenuClose();
    handleItemClick();
  };

  return (
    <StyledNavbar>
      <ul>
        <li onClick={handleItemClick}>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li onClick={handleItemClick}>
          <Link to={ROUTES.RECIPE_NEW}>New Recipe</Link>
        </li>
        <div>
          <IconButton
            onClick={handleAvatarClick}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            <Avatar alt={user.lastName} src={user.photoUrl} />
          </IconButton>
          {!small && (
            <span
              style={{
                color: "rgba(0,0,0,.8)",
              }}
            >
              {user.lastName + " " + user.firstName}
            </span>
          )}
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuItemClick}>
            <Link
              className="menuItem"
              to={ROUTES.ACCOUNT}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Account
            </Link>
          </MenuItem>
          {user.admin && (
            <MenuItem onClick={handleMenuItemClick}>
              <Link
                className="menuItem"
                to={ROUTES.ADMIN}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Admin
              </Link>
            </MenuItem>
          )}
          <MenuItem>
            <SignOutButton />
          </MenuItem>
        </Menu>
      </ul>
    </StyledNavbar>
  );
};

const NavigationNonAuth = ({ handleItemClick, small }) => {
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
  & {
    height: 100%;
    display: flex;
    align-items: center;
  }
  & > ul {
    width: 100%;
    margin: 0;
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
