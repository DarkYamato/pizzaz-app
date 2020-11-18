import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ButtonGroup,
  Button,
  Typography,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { selectValute } from "../../header/valuteSlice";
import { addToCart } from "../../cart/cartSlice";

import { getStyles } from "./MenuCard.style";

const useStyles = makeStyles(getStyles);

export const MenuCard = ({ pizza }) => {
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const { currentValute } = useSelector(selectValute);

  const { name, img, composition, price, id } = pizza;

  const classes = useStyles();

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  const addOrder = () => {
    dispatch(addToCart(id, counter));
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={img} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {composition}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" color="primary" onClick={addOrder}>
          add to cart
        </Button>
        <ButtonGroup
          size="small"
          orientation="vertical"
          color="primary"
          variant="text"
        >
          <Button
            className={classes.arrowButton}
            onClick={handleIncrement}
            disableTouchRipple
          >
            <Icon>keyboard_arrow_up</Icon>
          </Button>
          <Button
            className={classes.arrowButton}
            disabled={counter === 1}
            onClick={handleDecrement}
            disableTouchRipple
          >
            <Icon>keyboard_arrow_down</Icon>
          </Button>
        </ButtonGroup>
        <Typography variant="body1">{counter}</Typography>
        <Typography variant="button" className={classes.price}>
          {currentValute === "USD" ? `${price.USD} USD` : `${price.EUR} EUR`}
        </Typography>
      </CardActions>
    </Card>
  );
};

MenuCard.propTypes = {
  pizza: PropTypes.object,
};
