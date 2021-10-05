import { FC } from "react";
import Success from "./Success";

import classes from "../styles/Cart.module.css";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CartBodyWrapper from "./CartBodyWrapper";

const CartBody: FC = () => {
  const { success } = useTypedSelector((state) => state.cart);

  return (
    <div className={classes.cart}>
      {!success && <CartBodyWrapper />}
      {success && <Success />}
    </div>
  );
};
export default CartBody;
