import { FC } from "react";
import { useHistory } from "react-router";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { authActions } from "../../store/slices/auth";
import Cart from "../cart/Cart";
import CartPicture from "../cart/cartComponenets/CartPicture";
import MainNavigation from "./MainNavigation";

import classes from "../../pages/styles/Main.module.css";

function removeFromLocalStorage(arg: string): void {
  localStorage.removeItem(arg);
}

const Header: FC = () => {
  const router = useHistory();
  const dispatch = useTypedDispatch();

  function logoutHandler() {
    removeFromLocalStorage("token");
    removeFromLocalStorage("expirationTime");

    dispatch(authActions.logout());
    router.replace("/auth");
  }

  return (
    <>
      <Cart />
      <nav className={classes["main-nav"]}>
        <MainNavigation />
        <div className={classes["right-side"]}>
          <CartPicture />
          <button onClick={logoutHandler} className={classes.logout}>
            Log Out
          </button>
        </div>
      </nav>
    </>
  );
};
export default Header;
