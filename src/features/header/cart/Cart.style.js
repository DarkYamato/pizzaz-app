export const getStyles = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "336px",
    height: "370px",
    padding: "20px 0",
    background: "#fff",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
    borderRadius: "4px",
    zIndex: 1101,
  },
  arrow: {
    top: 0,
    right: "18px",
    width: "3em",
    height: "1em",
    position: "absolute",
    fontSize: "9px",
    "&::before": {
      content: "''",
      borderColor: "transparent transparent #424242 transparent",
      width: "10px",
      height: "10px",
      margin: "auto",
      display: "block",
      borderStyle: "solid",
      backgroundColor: "#fff",
      boxShadow: "0 0 2px #c7c7c7",
      transform: "translate(50%, -50%) rotate(-45deg)",
      clipPath:
        "polygon( -2px -2px, calc(100% + 2px) -2px, calc(100% + 2px) calc(100% + 2px) )",
    },
  },
  subtotalContainer: {
    textAlign: "center",
    padding: "20px 20px 0 20px",
  },
  subtotal: {
    display: "flex",
    justifyContent: "space-between",
  },
  checkout: {
    width: "100%",
    marginTop: "10px",
  },
});
