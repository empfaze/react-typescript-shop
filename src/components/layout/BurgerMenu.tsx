import { FC } from "react";
import { useTypedActions } from "../../hooks/useTypedActions";

import classes from "./styles/BurgerMenu.module.css";

const BurgerMenu: FC = () => {
  const { setNavVisibility } = useTypedActions();

  return (
    <div className={classes.wrapper} onClick={() => setNavVisibility(true)}>
      <span className={classes.stripe}>&nbsp;</span>
    </div>
  );
};

export default BurgerMenu;
