import { FC, MouseEvent } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { cartActions } from "../../store/slices/cart";
import { CSSTransition } from "react-transition-group";

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
      <CSSTransition
        in={cartIsShown}
        timeout={300}
        classNames={{
          enter: "",
          enterActive: classes.cartOpened,
          exit: "",
          exitActive: classes.cartClosed,
        }}
        mountOnEnter
        unmountOnExit
      >
        <CartBody />
      </CSSTransition>
    </>
  );
};
export default Cart;
