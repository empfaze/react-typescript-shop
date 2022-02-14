import { FC, MouseEvent } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { cartActions } from "../../store/slices/cart";

import classes from "./styles/Cart.module.css";
import CartBody from "./cartComponenets/CartBody";

const Cart: FC = () => {
  const { success } = useTypedSelector((state) => state.cart);
  const { cartIsShown } = useTypedSelector((state) => state.cart);
  const dispatch = useTypedDispatch();

  const body = document.body;

  function closeHandler(e: MouseEvent<HTMLDivElement>): void {
    body.classList.remove("lock");

    if (success) {
      dispatch(cartActions.setSuccessfullState());
    }

    dispatch(cartActions.closeCart());
  }

  return (
    <>
      {cartIsShown && (
        <div className={classes["cart-backdrop"]} onClick={closeHandler} />
      )}
      {cartIsShown && <CartBody />}
    </>
  );
};
export default Cart;
