import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Icon,
  Popper,
  ClickAwayListener,
  Badge,
  Typography,
  Button,
} from "@material-ui/core";

import { selectCart } from "../../cart/cartSlice";
import { selectMenu } from "../../menu/menuSlice";
import { selectValute } from "../valuteSlice";

import { getStyles } from "./Cart.style";
import { CartItem } from "../../../components/cartItem";

const useStyles = makeStyles(getStyles);

export const Cart = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const { cart } = useSelector(selectCart);
  const { menu } = useSelector(selectMenu);
  const { currentValute } = useSelector(selectValute);

  const cartItems = cart.map((x) =>
    Object.assign(
      {},
      x,
      menu.find((y) => y.id === x.id)
    )
  );

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.counter, 0);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const getSubtotalPrice = () => {
    const subtotal = cartItems.reduce(
      (acc, item) =>
        acc + +(item.price && item.price[currentValute]) * item.counter,
      0
    );
    const price = `${subtotal.toFixed(2)} ${currentValute}`;
    return price;
  };

  return (
    <>
      <IconButton
        aria-label="cart"
        aria-haspopup="true"
        ref={anchorRef}
        onClick={handleToggle}
      >
        <Badge badgeContent={cartItemsCount} color="secondary">
          <Icon>shopping_cart</Icon>
        </Badge>
      </IconButton>
      <ClickAwayListener onClickAway={handleClose}>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          className={classes.container}
        >
          <span className={classes.arrow} />
          <CartItem />
          {!!cart.length && (
            <div className={classes.subtotalContainer}>
              <div className={classes.subtotal}>
                <Typography variant="h6">Subtotal:</Typography>
                <Typography variant="h6">{getSubtotalPrice()}</Typography>
              </div>
              <Link to="/cart">
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.checkout}
                  onClick={() => setOpen(false)}
                >
                  checkout
                </Button>
              </Link>
            </div>
          )}
        </Popper>
      </ClickAwayListener>
    </>
  );
};
