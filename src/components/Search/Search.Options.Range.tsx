import React, { useState, useEffect } from "react";
import { IRange } from "../../interfaces";
import { Typography, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  slider: {},
  valueLabel: {},
});

const RangeSlider = ({
  name,
  min,
  max,
  minmax,
  handleRangeChange,
}: {
  name: string;
  min: number;
  max: number;
  minmax: IRange;
  handleRangeChange: any;
}) => {
  const classes = useStyles();
  const [value, setValue] = useState<number | number[]>([]);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  const handleCommittedChange = (e) => {
    handleRangeChange(value);
  };

  useEffect(() => {
    setValue(Object.values(minmax));
  }, [minmax]);

  return (
    <>
      <Typography align={"center"}>{name}</Typography>
      <Slider
        className={classes.slider}
        classes={{ valueLabel: classes.valueLabel }}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleCommittedChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
      />
    </>
  );
};

export default RangeSlider;
