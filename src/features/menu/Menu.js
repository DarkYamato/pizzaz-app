import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "@material-ui/lab";

import { makeStyles } from "@material-ui/core/styles";

import { selectMenu } from "./menuSlice";
import { MenuCard } from "./menuCard";
import { getStyles } from "./Menu.style";

const useStyles = makeStyles(getStyles);

export const Menu = () => {
  const classes = useStyles();
  const { menu, loading } = useSelector(selectMenu);

  const skeletonArr = new Array(8).fill();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.container}>
      {menu.map((pizza) => (
        <MenuCard key={pizza.id} pizza={pizza} />
      ))}
      {loading &&
        skeletonArr.map((x, i) => (
          <Skeleton key={i} variant="rect" width={300} height={490} />
        ))}
    </div>
  );
};
