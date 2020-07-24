import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useWindowDimensions } from "../../../hooks";
import { INutrient } from "../../../interfaces";

import { smallScreen } from "../../../constants/screen";

const CaloriesTable = ({
  nutrients,
  title,
}: {
  nutrients: INutrient;
  title: string;
}) => {
  const { width } = useWindowDimensions();

  const small = width < smallScreen;

  const nutrientKeys = Object.keys(
    nutrients
      ? nutrients
      : { kcal: null, carbs: null, fats: null, proteins: null, salt: null }
  );

  const displayNutrient = (name: string) =>
    nutrients?.[name] ? nutrients?.[name] : "N/A";

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        {small ? (
          <>
            <TableHead>
              <TableRow>
                <TableCell>100g serving</TableCell>
                <TableCell align="right">#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nutrientKeys.map((key) => {
                return (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {key.substr(0, 1).toLocaleUpperCase() +
                        key.substr(1, key.length)}
                    </TableCell>
                    <TableCell align="right">{displayNutrient(key)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        ) : (
          <>
            <TableHead>
              <TableRow>
                <TableCell>{title} (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Salt&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  #
                </TableCell>
                <TableCell align="right">{displayNutrient("kcal")}</TableCell>
                <TableCell align="right">{displayNutrient("carbs")}</TableCell>
                <TableCell align="right">{displayNutrient("fats")}</TableCell>
                <TableCell align="right">
                  {displayNutrient("proteins")}
                </TableCell>
                <TableCell align="right">{displayNutrient("salt")}</TableCell>
              </TableRow>
            </TableBody>
          </>
        )}
      </Table>
    </TableContainer>
  );
};

export default CaloriesTable;
