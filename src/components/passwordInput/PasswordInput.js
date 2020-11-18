import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Icon,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { getStyles } from "./PasswordInput.style";

const useStyles = makeStyles(getStyles);

export const validatePassword = (value) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(value);

export const PasswordInput = ({
  changePassword,
  changeConfirmPassword,
  margin,
  confirm,
  confirmError,
  signIn,
  error,
  required,
}) => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const handleChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
    confirm
      ? changeConfirmPassword(e.target.value)
      : changePassword(e.target.value);
    if (e.target.value === "") {
      setPasswordError(false);
    } else if (validatePassword(e.target.value)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkMatchingPasswords = (e) => {
    if (e.target.value === "") {
      setPasswordConfirmError(false);
    } else {
      confirmError
        ? setPasswordConfirmError(true)
        : setPasswordConfirmError(false);
    }
  };

  return (
    <FormControl
      variant="outlined"
      fullWidth
      className={margin && classes.margin}
      required={required}
    >
      <InputLabel htmlFor="password" className={classes.label}>
        {confirm ? "Confirm Password" : "Password"}
      </InputLabel>
      <OutlinedInput
        id={confirm ? "confirmPassword" : "password"}
        error={
          (!signIn && (passwordConfirmError || passwordError)) || !!errorMessage
        }
        type={showPassword ? "text" : "password"}
        value={password}
        aria-describedby="helper-text"
        onChange={handleChange}
        onKeyUp={checkMatchingPasswords}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <Icon>visibility</Icon>
              ) : (
                <Icon>visibility_off</Icon>
              )}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
      {((!signIn && (passwordConfirmError || passwordError)) ||
        errorMessage) && (
        <FormHelperText
          error={passwordConfirmError || passwordError || !!errorMessage}
          id="helper-text"
        >
          {!errorMessage &&
            (passwordError && !confirm
              ? "Password does not match requirements"
              : "Passwords do not match")}
          {errorMessage && errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

PasswordInput.propTypes = {
  changePassword: PropTypes.func,
  changeConfirmPassword: PropTypes.func,
  required: PropTypes.bool,
  margin: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  signIn: PropTypes.bool,
  confirm: PropTypes.bool,
  confirmError: PropTypes.bool,
};
