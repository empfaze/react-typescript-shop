import { useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router";
import { useTypedActions } from "./hooks/useTypedActions";
import { useTypedDispatch } from "./hooks/useTypedDispatch";
import { useTypedSelector } from "./hooks/useTypedSelector";

import Auth from "./pages/Auth";
import Main from "./pages/Main";
import { authActions } from "./store/slices/auth";
import { cartActions } from "./store/slices/cart";

function App() {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);
  const { setBurgerVisibility } = useTypedActions();

  const router = useHistory();
  const dispatch = useTypedDispatch();

  function widthHandler(): void {
    const currentWidth = window.innerWidth;

    if (currentWidth < 530) {
      setBurgerVisibility(true);
    } else {
      setBurgerVisibility(false);
    }
  }

  useEffect(() => {
    dispatch(cartActions.setCartFromLocalState());

    const jwtToken = localStorage.getItem("token");
    const expTime = +localStorage.getItem("expirationTime")!;
    if (jwtToken && expTime) {
      dispatch(authActions.login({ jwtToken, expTime }));
      router.replace("/main/messenger-bags");
    }

    window.addEventListener("resize", widthHandler);

    return () => {
      window.removeEventListener("resize", widthHandler);
    };
  }, []);

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/auth" />
      </Route>
      {!isAuth && (
        <Route path="/auth">
          <Auth />
        </Route>
      )}
      {isAuth && (
        <Route path="/main">
          <Main />
        </Route>
      )}
      <Route path="*">
        {!isAuth && <Redirect to="/auth" />}
        {isAuth && <Redirect to="/main" />}
      </Route>
    </Switch>
  );
}

export default App;
