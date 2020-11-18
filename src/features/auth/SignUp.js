import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Container } from "@material-ui/core";

import { PasswordInput } from "../../components/passwordInput";
import { PasswordRequirements } from "../../components/passwordRequirements/PasswordRequirements";

import { getStyles } from "./Sign.style";
import { EmailInput } from "../../components/emailInput";
import { signUp } from "../../api";
import { getUser } from "./userSlice";

import { validateEmail } from "../../components/emailInput";
import { validatePassword } from "../../components/passwordInput";

const useStyles = makeStyles(getStyles);

export const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleSubmit = async () => {
    const user = { name, surname, email, password };
    const data = await signUp(user);

    if (data.message) {
      setError(data.message);
    }
    if (data.token) {
      dispatch(getUser());
      history.push("/");
    }
  };

  const submitIsEnable = Boolean(
    name &&
      surname &&
      validateEmail(email) &&
      validatePassword(password) &&
      password === confirmPassword
  );

  return (
    <Container className={classes.container}>
      <div className={classes.content}>
        <Typography variant="h5" className={classes.title}>
          Sign Up
        </Typography>
        <form autoComplete="true">
          <TextField
            required
            id="name"
            label="Name"
            onChange={handleNameChange}
            value={name}
            fullWidth
            className={classes.field}
            variant="outlined"
          />
          <TextField
            required
            id="surname"
            label="Surname"
            onChange={handleSurnameChange}
            value={surname}
            fullWidth
            className={classes.field}
            variant="outlined"
          />
          <EmailInput
            required
            changeEmail={handleEmailChange}
            outlined
            margin
            error={error}
          />
          <PasswordInput
            required
            changePassword={handlePasswordChange}
            margin
          />
          <PasswordRequirements />
          <PasswordInput
            required
            changeConfirmPassword={handleConfirmPasswordChange}
            confirm
            confirmError={password !== confirmPassword}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
            disabled={!submitIsEnable}
            onClick={handleSubmit}
          >
            sign up
          </Button>
          <Link to="/signIn">
            <Typography color="primary" className={classes.sign}>
              Already have an account? Sign In!
            </Typography>
          </Link>
        </form>
      </div>
    </Container>
  );
};
