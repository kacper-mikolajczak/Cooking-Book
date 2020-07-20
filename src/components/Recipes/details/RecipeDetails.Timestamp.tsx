import React from "react";

const CreationTimestamp = ({ seconds }: { seconds: number }) => {
  const timestamp: string = seconds
    ? `${new Date(seconds * 1000).toLocaleTimeString()} ${new Date(
        seconds * 1000
      ).toLocaleDateString()}`
    : "?";

  return (
    <p>
      Created at: <strong>{timestamp}</strong>
    </p>
  );
};

export default CreationTimestamp;
