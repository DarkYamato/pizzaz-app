import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Modal,
  Paper,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { selectCart } from "../cart/cartSlice";

import { CartItem } from "../../components/cartItem";
import { LocationAutocomplete } from "../../components/locationAutocomplete";
import { Summary } from "../../components/summary";
import { validateEmail, EmailInput } from "../../components/emailInput";

import { selectUser } from "../auth/userSlice";
import { updateCartClear } from "../cart/cartSlice";

import { createOrder } from "../../api";

import { getStyles } from "./Order.style";

import PizzaLogo from "../../assets/pizza.svg";

const useStyles = makeStyles(getStyles);

export const Order = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [selectedTime, setSelectedTime] = React.useState(
    new Date(Date.now() + 30 * 60 * 1000)
  );
  const [openModal, setOpenModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const [orderError, setOrderError] = useState(false);

  const { user } = useSelector(selectUser);
  const { cart } = useSelector(selectCart);

  useEffect(() => {
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
  }, [user.name, user.surname, user.email]);

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };
  const validatePhone = (value) =>
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(
      value
    );

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (e.target.value === "") {
      setPhoneError(false);
    } else if (validatePhone(e.target.value)) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };

  const handleSubmit = async () => {
    const order = {
      order: cart,
      total: `${totalPrice}`,
      email: email,
    };

    const response = await createOrder(order);

    if (response.success) {
      setOrderError(false);
      setOpenModal(true);
    } else {
      setOrderError(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(updateCartClear());
    history.push("/");
  };

  const getTotalPrice = (value) => {
    setTotalPrice(value);
  };

  const submitIsEnable = Boolean(
    cart.length &&
      location &&
      name &&
      surname &&
      validateEmail(email) &&
      validatePhone(phone) &&
      selectedTime
  );

  return (
    <div className={classes.container}>
      <div className={classes.cart}>
        <Typography variant="h6" className={classes.title}>
          Checkout
        </Typography>
        <CartItem orderView />
      </div>
      <form autoComplete="true" className={classes.form}>
        <div>
          <Typography variant="h6" className={classes.title}>
            Shipping adress
          </Typography>
          <LocationAutocomplete changeLocation={handleLocationChange} />
        </div>
        <div>
          <Typography variant="h6" className={classes.title}>
            Contact Information
          </Typography>
          <TextField
            required
            id="name"
            label="Name"
            onChange={handleNameChange}
            value={name}
            fullWidth
            className={classes.field}
          />
          <TextField
            required
            id="surname"
            label="Surname"
            onChange={handleSurnameChange}
            value={surname}
            fullWidth
            className={classes.field}
          />
          <TextField
            required
            id="phone"
            label="Phone"
            error={phoneError}
            helperText={phoneError && "Invalid phone format"}
            onChange={handlePhoneChange}
            value={phone}
            fullWidth
            className={classes.field}
          />
          <EmailInput
            changeEmail={handleEmailChange}
            required
            currentEmail={email}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Delivery Time"
              value={selectedTime}
              onChange={handleTimeChange}
              fullWidth
              required
              className={classes.field}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
          <Typography
            variant="h6"
            className={`${classes.title} ${classes.paymentTitle}`}
          >
            Payment Method
          </Typography>
          <FormControlLabel
            control={<Checkbox checked name="cash" />}
            label="Cash"
          />
          <Typography
            variant="h6"
            className={`${classes.title} ${classes.commentTitle}`}
          >
            Comment
          </Typography>
          <TextField
            id="comment"
            label="Comment"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            className={classes.comment}
          />
          <Summary getTotalPrice={getTotalPrice} />
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            disabled={!submitIsEnable}
          >
            order
          </Button>
          {orderError && (
            <Typography className={classes.orderError} color="error">
              Something went wrong, try again
            </Typography>
          )}
          <Link to="/cart">
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
            >
              back to cart
            </Button>
          </Link>
        </div>
      </form>
      <Modal
        open={openModal}
        disableBackdropClick
        disableAutoFocus
        disableEnforceFocus
        className={classes.modal}
      >
        <Paper elevation={0} className={classes.modalContent}>
          <Typography variant="h5">Your order is accepted!</Typography>
          <Typography variant="h6">
            Expect the courier at the appointed time
          </Typography>
          <img src={PizzaLogo} alt="pizza" className={classes.logo} />
          <Button
            variant="contained"
            color="secondary"
            className={classes.modalButton}
            onClick={handleCloseModal}
          >
            got it
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};
