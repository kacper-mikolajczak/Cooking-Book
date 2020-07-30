import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputBase,
  Checkbox,
  Typography,
} from "@material-ui/core";

import { makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { searchOptionsActions } from "../../store/reducers/searchOptions";
import { searchOperations } from "../../store/reducers/search";

const useStyles = makeStyles((theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

const Groups = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { group, groupTick, toggle } = useSelector(
    (state) => state.searchOptions
  );
  const query = useSelector((state) => state.search.query);
  const handleChange = (e) => {
    dispatch(searchOptionsActions.setGroup(e.target.value));
    dispatch(searchOperations.search(query, false));
  };
  const handleCheckboxChange = (e) => {
    dispatch(searchOptionsActions.toggleGroup(e.target.checked));
  };
  return (
    <div style={{ width: "100%" }}>
      <FormControl
        className={classes.margin}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Checkbox onChange={handleCheckboxChange} checked={groupTick} />
        <Typography variant="subtitle1">Group:</Typography>
        <Select
          disabled={!groupTick}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={group}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="soup">Soup</MenuItem>
          <MenuItem value={"breakfast"}>Breakfast</MenuItem>
          <MenuItem value={"meal"}>Meal</MenuItem>
          <MenuItem value={"fastfood"}>Fast Food</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
const BootstrapInput = withStyles((theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

export default Groups;
