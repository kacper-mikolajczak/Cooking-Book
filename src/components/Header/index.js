import React from "react";

import Navigation from "../Navigation";
import Logo from "./Logo";

import { Grid } from "@material-ui/core";
import Search from "../Search";

export function Header() {
  return (
    <header>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Logo />
        </Grid>
        <Grid item xs={12} md>
          <Search />
        </Grid>
        <Grid item xs={12} md>
          <Navigation />
        </Grid>
      </Grid>
    </header>
  );
}

export default Header;
