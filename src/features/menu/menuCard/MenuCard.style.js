export const getStyles = () => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "16px",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
    height: "490px",
  },
  media: {
    height: 250,
    backgroundSize: "contain",
  },
  actions: {
    padding: "8px 14px",
  },
  arrowButton: {
    minWidth: "20px",
    padding: 0,
    transition: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  price: {
    fontSize: "1.1rem",
    "&:not(:first-child)": {
      marginLeft: "auto",
    },
  },
});
