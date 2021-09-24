import MainForm from "../components/MainForm";

import classes from "./styles/Auth.module.css";

const Auth = () => {
  return (
    <div className={classes["main-wrapper"]}>
      <div className={classes["form-wrapper"]}>
        <h1 className={classes["heading-primary"]}>You must login first</h1>
        <h2 className={classes["heading-secondary"]}>
          before watching our products
        </h2>
        <MainForm />
        <h3 className={classes["heading-tertiary"]}>
          Don't worry. You can enter any valid data that you want :)
        </h3>
      </div>
    </div>
  );
};

export default Auth;
