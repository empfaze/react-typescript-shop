import { FC, MouseEvent, useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./styles/Navigation.module.css";

const MainNavigation: FC = () => {
  const body = document.body;
  const bodyClasses = ["lock", "nav-opened"];

  function toggleNav(e: MouseEvent<HTMLDivElement | HTMLLIElement>) {
    e.stopPropagation();

    if (body.classList.contains("nav-opened")) {
      setNavClasses(`${classes["nav__body"]}`);
      setMenuIconClasses(`${classes["menu__icon"]}`);
      document.body.classList.remove(...bodyClasses);

      return;
    }

    setNavClasses(`${classes["nav__body"]} ${classes["nav-active"]}`);
    setMenuIconClasses(`${classes["menu__icon"]} ${classes["menu-active"]}`);
    body.classList.add(...bodyClasses);
  }

  const [navClasses, setNavClasses] = useState<string>(
    `${classes["nav__body"]}`
  );
  const [menuIconClasses, setMenuIconClasses] = useState<string>(
    `${classes["menu__icon"]}`
  );

  return (
    <div className={classes["nav"]}>
      <div className={classes["menu"]} onClick={toggleNav}>
        <div className={menuIconClasses}>&nbsp;</div>
      </div>
      <div className={navClasses} onClick={toggleNav}>
        <ul className={classes["nav__list"]}>
          <li className="nav__item" onClick={toggleNav}>
            <NavLink
              to="/main/messenger-bags"
              className={classes["nav__link"]}
              activeClassName={classes["selected"]}
            >
              Messenger Bags
            </NavLink>
          </li>
          <li className="nav__item" onClick={toggleNav}>
            <NavLink
              to="/main/business-bags"
              className={classes["nav__link"]}
              activeClassName={classes["selected"]}
            >
              Businness Bags
            </NavLink>
          </li>
          <li className="nav__item" onClick={toggleNav}>
            <NavLink
              to="/main/backpacks"
              className={classes["nav__link"]}
              activeClassName={classes["selected"]}
            >
              Backpacks
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MainNavigation;
