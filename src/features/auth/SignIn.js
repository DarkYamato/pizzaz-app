import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container } from "@material-ui/core";

import { PasswordInput } from "../../components/passwordInput";
import { signIn } from "../../api";

import { getStyles } from "./Sign.style";
import { EmailInput } from "../../components/emailInput";
import { getUser } from "./userSlice";

const useStyles = makeStyles(getStyles);

export const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordForgotten, setPasswordForgotten] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
    setError("");
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setError("");
  };

  const handlePasswordForgottenClick = () => {
    setPasswordForgotten((prevPassportForgotten) => !prevPassportForgotten);
  };

  const handleSignIn = async () => {
    const user = { email, password };
    const res = await signIn(user);

    if (res.token) {
      dispatch(getUser());
      history.push("/");
    } else {
      setError(res.message);
    }
  };

  const emailError = error === "Email not found" && error;
  const passwordError = error === "Password not correct" && error;

  return (
    <Container className={classes.container}>
      <div className={classes.content}>
        <Typography variant="h5" className={classes.title}>
          Sign In
        </Typography>
        <form autoComplete="true">
          <EmailInput
            changeEmail={handleEmailChange}
            outlined
            margin
            signIn
            error={emailError}
          />
          <PasswordInput
            changePassword={handlePasswordChange}
            signIn
            error={passwordError}
          />
          <Typography
            color="primary"
            className={classes.forgotten}
            onClick={handlePasswordForgottenClick}
          >
            Forgot your password?
          </Typography>
          {passwordForgotten && (
            <Typography variant="caption" className={classes.feature}>
              Feature in progress...
            </Typography>
          )}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
            onClick={handleSignIn}
          >
            sign in
          </Button>
          <Link to="/signUp">
            <Typography color="primary" className={classes.sign}>
              Don't have an account? Sign Up!
            </Typography>
          </Link>
        </form>
      </div>
    </Container>
  );
};
