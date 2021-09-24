import { FC } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { cartActions } from "../../../store/slices/cart";

import classes from "../styles/CartHeader.module.css";

const CartHeader: FC = () => {
  const dispatch = useTypedDispatch();
  function closeHandler(): void {
    dispatch(cartActions.closeCart());
  }

  return (
    <div className={classes["header-container"]}>
      <p className={classes["para"]}>Shopping Cart</p>
      <button className={classes["btn"]} onClick={closeHandler}>
        &times;
      </button>
    </div>
  );
};
export default CartHeader;
