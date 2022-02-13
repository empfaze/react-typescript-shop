import { FC } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { cartActions } from "../../../store/slices/cart";

import classes from "../styles/CartHeader.module.css";

const CartHeader: FC = () => {
  const dispatch = useTypedDispatch();
  const body = document.body;

  function closeHandler(): void {
    dispatch(cartActions.closeCart());
    body.classList.remove("lock");
  }

  return (
    <div className={classes["header-container"]}>
      <span className={classes["para"]}>Shopping Cart</span>
      <button className={classes["btn"]} onClick={closeHandler}>
        &times;
      </button>
    </div>
  );
};
export default CartHeader;
