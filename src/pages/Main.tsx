import { FC } from "react";
import { useHistory, Route, Switch } from "react-router";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { authActions } from "../store/slices/auth";
import { useTypedSelector } from "../hooks/useTypedSelector";

import MainNavigation from "../components/layout/MainNavigation";
import classes from "./styles/Main.module.css";
import CartPicture from "../components/cart/cartComponenets/CartPicture";
import Cart from "../components/cart/Cart";

import MessengerBags from "../components/router-components/MessengerBags";
import BusinessBags from "../components/router-components/BusinessBags";
import Backpacks from "../components/router-components/Backpacks";
import Sorting from "../components/UI/Sorting";

function removeFromLocalStorage(arg: string): void {
  localStorage.removeItem(arg);
}

const MainPage: FC = () => {
  const router = useHistory();
  const dispatch = useTypedDispatch();
  const { cartIsShown } = useTypedSelector((state) => state.cart);

  function logoutHandler() {
    removeFromLocalStorage("token");
    removeFromLocalStorage("expirationTime");

    dispatch(authActions.logout());
    router.replace("/auth");
  }

  return (
    <div className={classes["main-wrapper"]}>
      {cartIsShown && <Cart />}
      <nav className={classes["main-nav"]}>
        <MainNavigation />
        <div className={classes["right-side"]}>
          <CartPicture />
          <button onClick={logoutHandler} className={classes.logout}>
            Log Out
          </button>
        </div>
      </nav>
      <main>
        <Sorting />
        <Switch>
          <Route path="/main/messenger-bags">
            <MessengerBags />
          </Route>
          <Route path="/main/backpacks">
            <Backpacks />
          </Route>
          <Route path="/main/business-bags">
            <BusinessBags />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default MainPage;
