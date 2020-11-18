export const getStyles = () => ({
  card: {
    display: "flex",
    alignItems: "center",
    boxShadow: "none",
    borderBottom: "1px solid #e0e0e0",
    borderRadius: 0,
    padding: "14px 0",
    "&:first-child": {
      paddingTop: 0,
    },
  },
  orderCard: {
    padding: "3px 0",
  },
  media: {
    width: "100px",
    height: "100px",
    backgroundSize: "contain",
  },
  orderMedia: {
    width: "90px",
    height: "90px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "0 0 0 16px",
    height: "80px",
    width: "100%",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  orderContent: {
    flexDirection: "row",
  },
  contentItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteIcon: {
    padding: 0,
    minWidth: "fit-content",
    height: "fit-content",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  buttonGroup: {
    display: "inline-flex",
    borderRadius: "4px",
    border: "1px solid #3f51b580",
    alignItems: "center",
  },
  arrowButton: {
    border: 0,
    padding: "2px 0",
    minWidth: "20px",
    color: "#3f51b5",
    "&:hover": {
      border: 0,
      backgroundColor: "transparent",
    },
    "&.Mui-disabled": {
      border: 0,
    },
  },
  counter: {
    color: "#3f51b5",
    textAlign: "center",
    minWidth: "38px",
  },
  orderCounter: {
    display: "flex",
    alignItems: "center",
    fontSize: "17px",
    fontWeight: "bold",
    margin: "3px 0 0 10px",
  },
  orderCounterIcon: {
    fontSize: "17px",
    fontWeight: "bold",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "end",
  },
});
