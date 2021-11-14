import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTypedActions } from "../../hooks/useTypedActions";

import classes from "./styles/MainNavigation.module.css";

const MobileNav: FC = () => {
  const { setNavVisibility } = useTypedActions();

  return (
    <div className={classes["mobile-nav-wrapper"]}>
      <div className={classes["nav-mobile"]}>
        <NavLink
          to="/main/messenger-bags"
          className={classes["nav-link-mobile"]}
          activeClassName={classes["selected-mobile"]}
          onClick={() => setNavVisibility(false)}
        >
          Messenger Bags
        </NavLink>
        <NavLink
          to="/main/business-bags"
          className={classes["nav-link-mobile"]}
          activeClassName={classes["selected-mobile"]}
          onClick={() => setNavVisibility(false)}
        >
          Businness Bags
        </NavLink>
        <NavLink
          to="/main/backpacks"
          className={classes["nav-link-mobile"]}
          activeClassName={classes["selected-mobile"]}
          onClick={() => setNavVisibility(false)}
        >
          Backpacks
        </NavLink>
      </div>
      <button
        className={classes["btn"]}
        onClick={() => setNavVisibility(false)}
      >
        &times;
      </button>
    </div>
  );
};
export default MobileNav;
