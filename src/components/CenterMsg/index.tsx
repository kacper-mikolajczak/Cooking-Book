import React from "react";

import { Typography } from "@material-ui/core";

const CenterMsg = ({
  msg,
  gutter,
  variant,
}: {
  msg: string;
  gutter: number;
  variant: "h3" | "h4" | "h5";
}) => {
  return (
    <div
      style={{ display: "grid", placeItems: "center", margin: `${gutter}px` }}
    >
      <Typography variant={variant} component={variant}>
        {msg}
      </Typography>
    </div>
  );
};

export default CenterMsg;
