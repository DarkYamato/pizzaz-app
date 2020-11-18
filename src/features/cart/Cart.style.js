export const getStyles = (theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    margin: "50px 20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  cart: {
    width: "65%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "20px",
    },
  },
  cartTitle: {
    margin: "0 0 20px 10px",
  },
  summary: {
    position: "sticky",
    width: "30%",
    top: "110px",
    [theme.breakpoints.down("sm")]: {
      position: "static",
      width: "100%",
    },
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    width: "100%",
    marginBottom: "10px",
  },
});
