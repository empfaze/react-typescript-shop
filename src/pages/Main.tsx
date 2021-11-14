import { FC, useEffect } from "react";
import { Route, Switch } from "react-router";

import classes from "./styles/Main.module.css";

import MessengerBags from "../components/router-components/MessengerBags";
import BusinessBags from "../components/router-components/BusinessBags";
import Backpacks from "../components/router-components/Backpacks";
import Sorting from "../components/UI/Sorting";
import Header from "../components/layout/Header";
import { useTypedActions } from "../hooks/useTypedActions";

const MainPage: FC = () => {
  const { setBurgerVisibility } = useTypedActions();

  function widthHandler(): void {
    const currentWidth = window.innerWidth;

    if (currentWidth < 530) {
      setBurgerVisibility(true);
    } else {
      setBurgerVisibility(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", widthHandler);

    return () => {
      window.removeEventListener("resize", widthHandler);
    };
  }, []);

  return (
    <div className={classes["main-wrapper"]}>
      <Header />
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
