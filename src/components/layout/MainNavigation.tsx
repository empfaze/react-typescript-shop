import { FC } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useTypedActions } from "../../hooks/useTypedActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import BurgerMenu from "./BurgerMenu";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

import classes from "./styles/MainNavigation.module.css";

const MainNavigation: FC = () => {
  const { isBurgerVisible, navIsVisible } = useTypedSelector(
    (state) => state.nav
  );

  const { setNavVisibility } = useTypedActions();

  return (
    <>
      {isBurgerVisible && <BurgerMenu />}
      {navIsVisible && (
        <div
          className={classes["mobile-backdrop"]}
          onClick={() => setNavVisibility(false)}
        />
      )}
      <CSSTransition
        in={navIsVisible}
        timeout={300}
        classNames={{
          enter: "",
          enterActive: classes.navOpened,
          exit: "",
          exitActive: classes.navClosed,
        }}
        mountOnEnter
        unmountOnExit
      >
        <MobileNav />
      </CSSTransition>
      {!isBurgerVisible && <DesktopNav />}
    </>
  );
};
export default MainNavigation;
