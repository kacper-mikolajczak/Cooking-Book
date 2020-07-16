import React, { useState } from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { IconButton, Avatar, Menu, MenuItem } from "@material-ui/core";

const Navigation = ({ handleItemClick }) => {
  const user = useSelector((state) => state.session.authUser);
  return (
    <div>
      {user ? (
        <NavigationAuth user={user} handleItemClick={handleItemClick} />
      ) : (
        <NavigationNonAuth />
      )}
    </div>
  );
};

const NavigationAuth = ({ user, handleItemClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (e) => {
    console.log(e.currentTarget);
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

        <IconButton
          onClick={handleAvatarClick}
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          <Avatar alt={user.lastName} src={user.photoUrl} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuItemClick}>
            <Link className="menuItem" to={ROUTES.ACCOUNT}>
              Account
            </Link>
          </MenuItem>
          {user.admin && (
            <MenuItem onClick={handleMenuItemClick}>
              <Link className="menuItem" to={ROUTES.ADMIN}>
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
