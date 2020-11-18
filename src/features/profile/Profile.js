import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Button } from "@material-ui/core";

import { selectUser, userSignOut, getUser } from "../auth/userSlice";
import { getStyles } from "./Profile.style";
import { OrderHistory } from "../../components/orderHistory";

const useStyles = makeStyles(getStyles);

export const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { orderHistory } = user;

  const handleSignOut = () => {
    dispatch(userSignOut());
  };

  return (
    <Container className={classes.container}>
      <div className={classes.content}>
        <Typography variant="h5" className={classes.title}>
          Profile
        </Typography>
        <div className={classes.info}>
          <Typography variant="button">Name:</Typography>
          <Typography>
            {user.name} {user.surname}
          </Typography>
        </div>
        <div className={classes.info}>
          <Typography variant="button">Email:</Typography>
          <Typography>{user.email}</Typography>
        </div>
        <div className={classes.buttonGroup}>
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            sign out
          </Button>
          <Link to="/">
            <Button variant="outlined" color="secondary">
              back to menu
            </Button>
          </Link>
        </div>
        <Typography
          variant="h5"
          className={`${classes.title} ${classes.orderTitle}`}
        >
          Order History
        </Typography>
        {!!orderHistory.length &&
          orderHistory.map((order) => (
            <OrderHistory key={order._id} order={order} />
          ))}
        {!!!orderHistory.length && (
          <Typography>You have no orders yet</Typography>
        )}
      </div>
    </Container>
  );
};
