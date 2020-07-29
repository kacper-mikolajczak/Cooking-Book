import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { ErrorActions } from "../../store/reducers/error";

import { IError } from "../../interfaces";
import Snack from "./Snack";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const ErrorSnackBar = ({
  multiple,
  delay,
}: {
  multiple: boolean;
  delay: number;
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const errors = useSelector((state: any) => state.errors);

  useEffect(() => {
    let displayTimeout: ReturnType<typeof setTimeout>;
    if (errors.length > 0) {
      displayTimeout = setTimeout(
        () =>
          multiple
            ? dispatch(ErrorActions.pop())
            : dispatch(ErrorActions.clear()),
        delay
      );
    }
    return () => clearTimeout(displayTimeout);
  }, [errors, dispatch]);

  const handleClose = (id: string) => {
    dispatch(ErrorActions.unset(id));
  };

  return (
    <div className={classes.root}>
      {errors.length > 0 &&
        (multiple ? (
          errors.map((error: IError) => (
            <Snack
              key={error.id}
              error={error}
              handleClose={() => {
                handleClose(error.id);
              }}
            />
          ))
        ) : (
          <Snack
            error={errors[0]}
            handleClose={() => {
              handleClose(errors[0].id);
            }}
          />
        ))}
    </div>
  );
};

export default ErrorSnackBar;
