import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  likes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.9em",
    color: "rgba(0,0,0,.6)",
  },
}));

function LikeButton({ quantity, isLiked, handleIconClick, authorized }) {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const [likeAmount, setLikeAmount] = useState(0);

  useEffect(() => {
    setLiked(isLiked);
    setLikeAmount(quantity);
  }, [isLiked, quantity]);

  const handleClick = (e) => {
    if (handleIconClick) handleIconClick(!liked);
    if (authorized) {
      setLikeAmount(likeAmount + (!liked ? 1 : -1));
      setLiked((liked) => !liked);
    }
  };

  return (
    <span className={classes.likes}>
      <IconButton
        aria-label="add to favorites"
        className={classes.icons}
        onClick={(e) => handleClick(e)}
      >
        {liked ? (
          <FavoriteIcon title={"Already in Your menu :)"} color="error" />
        ) : (
          <FavoriteBorderIcon title={"Click to show how much You like it!"} />
        )}
      </IconButton>
      <p>{likeAmount}</p>
    </span>
  );
}

export default LikeButton;
