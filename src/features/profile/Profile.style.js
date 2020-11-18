export const getStyles = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 20px",
  },
  content: {
    maxWidth: "600px",
    width: "100%",
  },
  title: {
    marginBottom: "20px",
  },
  orderTitle: {
    marginTop: "20px",
  },
  info: {
    display: "flex",
    alignItems: "baseline",
    "& span": {
      fontSize: "16px",
      marginRight: "20px",
    },
    "& p": {
      fontSize: "18px",
    },
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "200px",
    marginTop: "20px",
    "& button:first-child": {
      marginBottom: "10px",
    },
    "& a button": {
      width: "100%",
    },
  },
});
