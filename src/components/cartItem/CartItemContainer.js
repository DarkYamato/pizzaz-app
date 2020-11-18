import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { selectCart } from "../../features/cart/cartSlice";
import { selectMenu } from "../../features/menu/menuSlice";

import { getStyles } from "./CartItemContainer.style";

import PizzaLogo from "../../assets/pizza.svg";

import { CartItem } from "./CartItem";

const useStyles = makeStyles(getStyles);

export const CartItemContainer = ({ fullWidth, orderView, orderHistory }) => {
  const classes = useStyles();

  const { cart } = useSelector(selectCart);
  const { menu } = useSelector(selectMenu);

  const currentArray = orderHistory || cart;

  const cartItems = currentArray.map((x) =>
    Object.assign(
      {},
      x,
      menu.find((y) => y.id === x.id)
    )
  );

  let cartItem = (
    <Container className={classes.content}>
      <img src={PizzaLogo} alt="pizza" className={classes.logo} />
      <div>Youre cart is empty</div>
    </Container>
  );

  if (!!cartItems.length) {
    cartItem = (
      <Container
        className={
          fullWidth || orderView
            ? classes.fullContentWithCards
            : classes.contentWithCards
        }
      >
        {cartItems.map((pizza) => (
          <CartItem
            key={pizza.id}
            pizza={pizza}
            orderView={orderView}
            orderHistoryView={orderHistory && !!orderHistory.length}
          />
        ))}
      </Container>
    );
  }

  return <>{cartItem}</>;
};

CartItemContainer.propTypes = {
  fullWidth: PropTypes.bool,
  orderView: PropTypes.bool,
  orderHistory: PropTypes.array,
};
