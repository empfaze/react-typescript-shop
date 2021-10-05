import { FC } from "react";
import { Route, Switch } from "react-router";

import classes from "./styles/Main.module.css";

import MessengerBags from "../components/router-components/MessengerBags";
import BusinessBags from "../components/router-components/BusinessBags";
import Backpacks from "../components/router-components/Backpacks";
import Sorting from "../components/UI/Sorting";
import Header from "../components/layout/Header";

const MainPage: FC = () => {
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
