import React from "react";

import Navigation from "../Navigation";
import Logo from "./Logo";

import { Grid } from "@material-ui/core";
import Search from "../Search";

import { useDispatch } from "react-redux";
import { searchActions } from "../../store/reducers/search";

export function Header() {
  const dispatch = useDispatch();
  const handleItemClick = (e) => {
    dispatch(searchActions.close());
  };

  return (
    <header>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Logo handleClick={handleItemClick} />
        </Grid>
        <Grid item xs={12} md>
          <Search />
        </Grid>
        <Grid item xs={12} md>
          <Navigation handleItemClick />
        </Grid>
      </Grid>
    </header>
  );
}

export default Header;
