import React, { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { searchOperations } from "../../store/reducers/search";

import { Input, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import Options from "./Search.Options";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 3em",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  focused: {
    transition: "width 10s",
    width: "100%",
  },
  search: {
    flexGrow: 1,
    display: "flex",
  },
  options: {
    justifySelf: "flex-end",
    flexShrink: 1,
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);

  const timeoutRef = useRef();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query.length > 0) {
      timeoutRef.current = setTimeout(() => {
        search();
      }, 1000);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [query, dispatch]);

  const search = () => {
    dispatch(searchOperations.search(query));
  };

  return (
    <div className={classes.root}>
      <Input
        className={focus ? classes.focused : ""}
        type="search"
        onChange={handleChange}
        autoFocus
        fullWidth={focus}
        onFocus={(e) => setFocus(true)}
        onBlur={(e) => setFocus(false)}
        placeholder="Search for recipes..."
      />
      <IconButton onClick={search}>
        <SearchIcon />
      </IconButton>
      <Options />
    </div>
  );
};

export default Search;
