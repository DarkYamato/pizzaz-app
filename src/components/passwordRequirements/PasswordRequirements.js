import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Icon,
} from "@material-ui/core";

import { getStyles } from "./PasswordRequirements.style";

const useStyles = makeStyles(getStyles);

export const PasswordRequirements = () => {
  const classes = useStyles();

  const [openList, setOpenList] = useState(false);

  const handleListOpen = () => {
    setOpenList((prevOpenList) => !prevOpenList);
  };

  return (
    <>
      <Typography
        className={classes.requirements}
        variant="caption"
        onClick={handleListOpen}
      >
        <Icon>info</Icon>
        <div>Password Requirements</div>
      </Typography>
      <List
        className={`${classes.listHidden} ${openList && classes.listAppeared}`}
      >
        <ListItem className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>radio_button_checked</Icon>
          </ListItemIcon>
          Your password must contain at least 6 characters
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>radio_button_checked</Icon>
          </ListItemIcon>
          Your password must contain at least 1 uppercase alphabetical character
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>radio_button_checked</Icon>
          </ListItemIcon>
          Your password must contain at least 1 lowercase alphabetical character
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>radio_button_checked</Icon>
          </ListItemIcon>
          Your password must contain at least 1 numeric character
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>radio_button_checked</Icon>
          </ListItemIcon>
          Your password must contain at least one special character: !@#$%^&*
        </ListItem>
      </List>
    </>
  );
};
