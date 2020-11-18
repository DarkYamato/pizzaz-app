export const getStyles = () => ({
  requirements: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    margin: "-10px 0 20px",
    "& span": {
      fontSize: "20px",
      marginRight: "5px",
    },
    "& div": {
      textDecoration: "underline",
    },
  },
  listHidden: {
    display: "none",
  },
  listAppeared: {
    display: "block",
    animation: "$fadeInOut .0.5s",
    marginBottom: "10px",
    paddingTop: 0,
  },
  listItem: {
    color: "#0000008a",
    fontSize: "14px",
    "&:first-child": {
      paddingTop: 0,
    },
  },
  listItemIcon: {
    minWidth: "20px",
    "& span": {
      fontSize: "14px",
    },
  },
  "@keyframes fadeInOut": {
    "0%": {
      opacity: 0,
      transform: "scale(0)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
});
