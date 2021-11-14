import { FC } from "react";
import { NavLink } from "react-router-dom";

import classes from "./styles/MainNavigation.module.css";

const DesktopNav: FC = () => {
  return (
    <div className={classes["nav-desktop"]}>
      <NavLink
        to="/main/messenger-bags"
        className={classes["nav-link-desktop"]}
        activeClassName={classes["selected-desktop"]}
      >
        Messenger Bags
      </NavLink>
      <NavLink
        to="/main/business-bags"
        className={classes["nav-link-desktop"]}
        activeClassName={classes["selected-desktop"]}
      >
        Businness Bags
      </NavLink>
      <NavLink
        to="/main/backpacks"
        className={classes["nav-link-desktop"]}
        activeClassName={classes["selected-desktop"]}
      >
        Backpacks
      </NavLink>
    </div>
  );
};
export default DesktopNav;
