import React from "react";
import { FormControl, Select, MenuItem, InputBase } from "@material-ui/core";

import { makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../../store/reducers/search";

const useStyles = makeStyles((theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

const Groups = ({ handleGroupChange, currentValue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.search.group);
  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch(searchActions.setGroup(e.target.value));
  };
  return (
    <div>
      <FormControl className={classes.margin}>
        <Select
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
