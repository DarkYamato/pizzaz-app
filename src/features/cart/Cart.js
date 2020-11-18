import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

import { selectUser } from "../auth/userSlice";

import { getStyles } from "./Cart.style";

import { CartItem } from "../../components/cartItem";
import { Summary } from "../../components/summary";

const useStyles = makeStyles(getStyles);

export const Cart = () => {
  const classes = useStyles();
  const { user } = useSelector(selectUser);

  return (
    <div className={classes.container}>
      <div className={classes.cart}>
        <Typography variant="h6" className={classes.cartTitle}>
          Cart
        </Typography>
        <CartItem fullWidth />
      </div>
      <div className={classes.summary}>
        <Summary />
        <div className={classes.buttons}>
          {user.email ? (
            <Link to="/order">
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
              >
                checkout
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/order">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  guest checkout
                </Button>
              </Link>
              <Link to="/signIn">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  member checkout
                </Button>
              </Link>
            </>
          )}
          <Link to="/">
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
            >
              back to menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
