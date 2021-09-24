import { FC } from "react";
import { NavLink } from "react-router-dom";

import classes from "./styles/MainNavigation.module.css";

const MainNavigation: FC = () => {
  return (
    <div className={classes.nav}>
      <NavLink
        to="/main/messenger-bags"
        className={classes["nav-link"]}
        activeClassName={classes.selected}
      >
        Messenger Bags
      </NavLink>
      <NavLink
        to="/main/business-bags"
        className={classes["nav-link"]}
        activeClassName={classes.selected}
      >
        Businness Bags
      </NavLink>
      <NavLink
        to="/main/backpacks"
        className={classes["nav-link"]}
        activeClassName={classes.selected}
      >
        Backpacks
      </NavLink>
    </div>
  );
};
export default MainNavigation;
