import React from "react";

import Navigation from "../Navigation";
import Logo from "./Logo";

import { Grid } from "@material-ui/core";
import Search from "../Search";

import { useDispatch } from "react-redux";
import { searchActions } from "../../store/reducers/search";
import { useWindowDimensions } from "../../hooks";
import { smallScreen } from "../../constants/screen";

export function Header() {
  const dispatch = useDispatch();
  const handleItemClick = (e) => {
    dispatch(searchActions.close());
  };

  const { width } = useWindowDimensions();
  const small = width < smallScreen;

  return (
    <header
      style={{
        position: "sticky",
        top: "0",
        zIndex: "999",
        borderBottom: "1px solid rgba(0,0,0,.5)",
        backgroundColor: "inherit",
      }}
    >
      <Grid container>
        {small ? (
          <>
            <Grid item xs={3}>
              <Logo
                handleClick={handleItemClick}
                logoText={"CS"}
                small={small}
              />
            </Grid>
            <Grid item xs={9} md>
              <Search />
            </Grid>
            <Grid item xs={12} md>
              <Navigation handleItemClick={handleItemClick} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={3}>
              <Logo
                handleClick={handleItemClick}
                logoText={"Cooking Search"}
                small={small}
              />
            </Grid>
            <Grid item xs={12} md>
              <Search />
            </Grid>
            <Grid item xs={12} md>
              <Navigation handleItemClick={handleItemClick} />
            </Grid>
          </>
        )}
      </Grid>
    </header>
  );
}

export default Header;
