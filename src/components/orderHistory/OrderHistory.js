import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Icon,
} from "@material-ui/core";

import { CartItem } from "../cartItem";

import { getStyles } from "./OrderHistory.style";

const useStyles = makeStyles(getStyles);

export const OrderHistory = ({ order }) => {
  const classes = useStyles();

  const { order: orderItems, createdDate, total, status } = order;

  const stringDate = new Date(createdDate).toLocaleDateString();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<Icon>expand_more</Icon>}
        aria-controls="content"
        id="header"
        className={classes.content}
      >
        <Typography className={classes.info}>{stringDate}</Typography>
        <Typography className={classes.info}>{total}</Typography>
        <Typography>
          {status === "DELIVERED" && (
            <Icon className={classes.icon}>done_all</Icon>
          )}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CartItem orderHistory={orderItems} orderView />
      </AccordionDetails>
    </Accordion>
  );
};

OrderHistory.propTypes = {
  order: PropTypes.object.isRequired,
};
