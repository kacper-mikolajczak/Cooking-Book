import React from "react";

import Navigation from "../Navigation";
import Logo from "./Logo";

import { Grid } from "@material-ui/core";

export function Header() {
  return (
    <header>
      <Grid container>
        <Grid item xs={11} md={3}>
          <Logo />
        </Grid>
        <Grid item xs md zeroMinWidth={true}>
          <div>
            <h6 style={{ color: "rgba(0,0,0,.1)" }}>
              This is going to be a searchbard or something
            </h6>
          </div>
        </Grid>
        <Grid item xs={12} md>
          <Navigation />
        </Grid>
      </Grid>
    </header>
  );
}

export default Header;
