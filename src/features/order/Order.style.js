export const getStyles = (theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    margin: "50px 20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  cart: {
    position: "sticky",
    width: "60%",
    height: "fit-content",
    top: "110px",
    [theme.breakpoints.down("sm")]: {
      position: "static",
      width: "100%",
      marginBottom: "20px",
    },
  },
  form: {
    width: "35%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  title: {
    marginBottom: "20px",
    "&:last-child": {
      marginTop: "20px",
    },
  },
  paymentTitle: {
    marginBottom: "10px",
  },
  commentTitle: {
    marginTop: "10px",
  },
  field: {
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    marginBottom: "10px",
  },
  comment: {
    marginBottom: "30px",
  },
  orderError: {
    textAlign: "center",
    marginBottom: "10px",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "40%",
    maxWidth: "520px",
  },
  logo: {
    width: "100px",
    margin: "30px 0",
  },
  modalButton: {
    width: "130px",
  },
});
