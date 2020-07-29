import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import RangeSlider from "./Search.Options.Range";
import { searchOptionsActions } from "../../store/reducers/searchOptions";
import { IRangeToggle, IRange } from "../../interfaces";
import Groups from "./Groups";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Menu,
  IconButton,
  Grid,
  Typography,
  Checkbox,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {},
  menu: {
    padding: "20px",
    width: "30vw",
    minWidth: "250px",
  },
  group: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Options = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleFilterClick = () => {
    dispatch(searchOptionsActions.toggle());
  };
  const handleClearFilterClick = () => {
    dispatch(searchOptionsActions.clearState());
  };

  const sliders: IRangeToggle[] = useSelector(
    (state: any) => state.searchOptions.sliders
  );

  const toggle: boolean = useSelector(
    (state: any) => state.searchOptions.toggle
  );

  const slidersEntries = Object.entries(sliders);

  const mappedSliders = slidersEntries.map(([key, val]) => (
    <Grid item xs={12} md={6} key={key}>
      <Typography style={{ marginLeft: "50px" }}>
        <Checkbox
          checked={toggle && val.tick}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              searchOptionsActions.toggleRange({
                name: key,
                tick: e.target.checked,
              })
            );
          }}
        />
        {key}{" "}
      </Typography>

      <RangeSlider
        disabled={!(toggle && val.tick)}
        min={0}
        max={key === "kcal" ? 1000 : 100}
        key={key}
        name={key}
        minmax={{ min: val.min, max: val.max }}
        handleRangeChange={(val: [number, number]) => {
          dispatch(
            searchOptionsActions.setRange({
              name: key,
              range: { min: val[0], max: val[1] },
            })
          );
        }}
      />
    </Grid>
  ));
  return (
    <div className={classes.root}>
      <IconButton onClick={handleClick}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledOptions className={classes.menu}>
          <Grid container spacing={4}>
            <Grid
              item
              md={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleToggleFilterClick}
              >
                Toggle
              </Button>
            </Grid>
            <Grid
              item
              md={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleClearFilterClick}
              >
                Clear
              </Button>
            </Grid>
            <Grid item xs={12} md={6} className={classes.group}>
              <Groups />
            </Grid>
            {mappedSliders}
          </Grid>
        </StyledOptions>
      </Menu>
    </div>
  );
};

const StyledOptions = styled.div``;

export default Options;
