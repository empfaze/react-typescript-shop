import { FC } from "react";

import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { cartActions } from "../../../store/slices/cart";

import classes from "../styles/CartEmpty.module.css";

const CartEmpty: FC = () => {
  const dispatch = useTypedDispatch();

  function closeHandler(): void {
    dispatch(cartActions.closeCart());
  }

  return (
    <div className={classes.wrapper}>
      <p className={classes.para}>Your shopping cart is empty</p>
      <button className={classes.btn} onClick={closeHandler}>
        Add Products
      </button>
    </div>
  );
};
export default CartEmpty;
