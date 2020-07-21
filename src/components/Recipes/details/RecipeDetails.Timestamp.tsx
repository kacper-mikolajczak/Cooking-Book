import React from "react";
import { useWindowDimensions } from "../../../hooks";

const CreationTimestamp = ({ seconds }: { seconds: number }) => {
  const { height, width } = useWindowDimensions();
  const timestamp: string = seconds
    ? `${new Date(seconds * 1000).toLocaleTimeString()} ${new Date(
        seconds * 1000
      ).toLocaleDateString()}`
    : "?";
  const small = width < 768;
  return (
    <p style={{ textAlign: "center", fontSize: small ? "0.8rem" : "1rem" }}>
      {!small && <span>Created at: </span>}
      <strong>{timestamp}</strong>
    </p>
  );
};

export default CreationTimestamp;
