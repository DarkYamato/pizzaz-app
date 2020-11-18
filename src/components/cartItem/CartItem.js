import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Icon,
} from "@material-ui/core";

import { selectValute } from "../../features/header/valuteSlice";
import { addToCart, deleteFromCart } from "../../features/cart/cartSlice";

import { getStyles } from "./CartItem.style";

const useStyles = makeStyles(getStyles);

export const CartItem = ({ pizza, orderView, orderHistoryView }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { currentValute } = useSelector(selectValute);

  const { name, img, price, counter, id } = pizza;

  const getPizzaPrice = () =>
    price && `${(price[currentValute] * counter).toFixed(2)} ${currentValute}`;

  const handleIncrement = () => {
    dispatch(addToCart(id, counter + 1));
  };

  const handleDecrement = () => {
    dispatch(addToCart(id, counter - 1));
  };

  const handleDelete = () => {
    dispatch(deleteFromCart(id));
  };

  return (
    <Card className={`${classes.card} ${orderView && classes.orderCard}`}>
      <CardMedia title={name}>
        <img
          className={`${classes.media} ${orderView && classes.orderMedia}`}
          src={img}
          alt="pizza"
        />
      </CardMedia>
      <CardContent
        className={`${classes.content} ${orderView && classes.orderContent}`}
      >
        <div className={classes.contentItem}>
          <Typography variant="h6">{name}</Typography>
          {orderView && (
            <Typography className={classes.orderCounter}>
              <Icon className={classes.orderCounterIcon}>clear</Icon>
              {counter}
            </Typography>
          )}
          {!orderView && (
            <Button
              className={classes.deleteIcon}
              disableTouchRipple
              onClick={handleDelete}
            >
              <Icon>clear</Icon>
            </Button>
          )}
        </div>
        <div className={classes.contentItem}>
          {!orderView && (
            <div className={classes.buttonGroup}>
              <Button
                className={classes.arrowButton}
                disabled={counter === 1}
                onClick={handleDecrement}
                disableTouchRipple
              >
                <Icon>keyboard_arrow_left</Icon>
              </Button>
              <Typography variant="body1" className={classes.counter}>
                {counter}
              </Typography>
              <Button
                className={classes.arrowButton}
                onClick={handleIncrement}
                disableTouchRipple
              >
                <Icon>keyboard_arrow_right</Icon>
              </Button>
            </div>
          )}
          {!orderHistoryView && (
            <Typography variant="button" className={classes.price}>
              {getPizzaPrice()}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

CartItem.propTypes = {
  pizza: PropTypes.object.isRequired,
  orderView: PropTypes.bool,
  orderHistoryView: PropTypes.bool,
};
