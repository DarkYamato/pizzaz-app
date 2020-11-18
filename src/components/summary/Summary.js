import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { selectCart } from "../../features/cart/cartSlice";
import { selectMenu } from "../../features/menu/menuSlice";
import { selectValute } from "../../features/header/valuteSlice";

import { getStyles } from "./Summary.style";

const useStyles = makeStyles(getStyles);

export const Summary = ({ getTotalPrice }) => {
  const classes = useStyles();

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

  const getStringPrice = useCallback(
    (price) => {
      const stringPrice = `${price.toFixed(2)} ${currentValute}`;
      return price ? stringPrice : "";
    },
    [currentValute]
  );

  const delivery = currentValute === "USD" ? 13.0 : 11.0;

  const getPrice = useCallback(
    (cond) => {
      let price;

      if (!!cartItems.length) {
        const subtotal = cartItems.reduce(
          (acc, item) =>
            acc + +(item.price && item.price[currentValute]) * item.counter,
          0
        );
        if (cond) {
          price = getStringPrice(subtotal + delivery);
        } else {
          price = getStringPrice(subtotal);
        }
      } else {
        price = `0.00 ${currentValute}`;
      }

      return price;
    },
    [cartItems, currentValute, delivery, getStringPrice]
  );

  useEffect(() => {
    const total = getPrice("total");
    getTotalPrice && getTotalPrice(total);
  }, [getTotalPrice, getPrice]);

  return (
    <div>
      <Typography variant="h6" className={classes.summaryTitle}>
        Summary
      </Typography>
      <div>
        <div className={classes.price}>
          <Typography className={classes.subtitle}>Subtotal:</Typography>
          <Typography>{getPrice()}</Typography>
        </div>
        <div className={classes.price}>
          <Typography className={classes.subtitle}>Delivery:</Typography>
          <Typography>{getStringPrice(delivery)}</Typography>
        </div>
        <div className={classes.price}>
          <Typography className={classes.subtitle}>Total:</Typography>
          <Typography>{getPrice("total")}</Typography>
        </div>
      </div>
    </div>
  );
};

Summary.propTypes = {
  getTotalPrice: PropTypes.func,
};
