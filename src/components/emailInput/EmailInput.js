import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getStyles } from "./EmailInput.style";

const useStyles = makeStyles(getStyles);

export const validateEmail = (value) =>
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(
    value
  );

export const EmailInput = ({
  changeEmail,
  required,
  outlined,
  margin,
  error,
  currentEmail,
  signIn,
}) => {
  const classes = useStyles();
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const handleChange = (e) => {
    changeEmail(e.target.value);
    setErrorMessage("");
    if (e.target.value === "") {
      setEmailError(false);
    } else if (validateEmail(e.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  return (
    <TextField
      required={required}
      disabled={!!token && !!currentEmail}
      id="email"
      label="Email"
      error={(emailError && !signIn) || !!errorMessage}
      helperText={
        (emailError && !signIn && "Invalid email format") || errorMessage
      }
      onChange={handleChange}
      value={currentEmail}
      fullWidth
      variant={outlined && "outlined"}
      className={margin && classes.margin}
    />
  );
};

EmailInput.propTypes = {
  changeEmail: PropTypes.func.isRequired,
  required: PropTypes.bool,
  outlined: PropTypes.bool,
  margin: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  currentEmail: PropTypes.string,
  signIn: PropTypes.bool,
};
