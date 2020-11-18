import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { fetchMenu } from "../../features/menu/menuSlice";
import { changeValute, selectValute } from "./valuteSlice";
import { selectUser, getUser } from "../auth/userSlice";

import {
  NativeSelect,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Icon,
} from "@material-ui/core";

import { getStyles } from "./Header.style";
import { Cart } from "./cart";

const useStyles = makeStyles(getStyles);

export const Header = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { currentValute } = useSelector(selectValute);
  const { user } = useSelector(selectUser);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(getUser());
  }, [dispatch]);

  const handleChange = (event) => {
    dispatch(changeValute(event.target.value));
  };

  return (
    <AppBar position="sticky" className={classes.header}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/">Pizzaz</Link>
        </Typography>
        <NativeSelect
          value={currentValute}
          onChange={(e) => handleChange(e)}
          name="valute"
          className={classes.select}
        >
          <option value={"USD"}>USD</option>
          <option value={"EUR"}>EUR</option>
        </NativeSelect>
        {!!token && !!user.email ? (
          <Link to="/profile">
            <Button className={classes.sign}>
              <Icon className={classes.icon}>account_circle</Icon>
              {user.name}
            </Button>
          </Link>
        ) : (
          <Link to="/signIn">
            <Button variant="outlined" className={classes.sign}>
              sign in
            </Button>
          </Link>
        )}
        <Cart />
      </Toolbar>
    </AppBar>
  );
};
