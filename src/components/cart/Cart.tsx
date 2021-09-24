import { FC, MouseEvent } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { cartActions } from "../../store/slices/cart";

import CartHeader from "./cartComponenets/CartHeader";
import CartEmpty from "./cartComponenets/CartEmpty";
import CartItemsList from "./cartComponenets/CartItemsList";

import classes from "./styles/Cart.module.css";
import CartForm from "./cartComponenets/CartForm";
import Success from "./cartComponenets/Success";

const Cart: FC = () => {
  const { items: cartItems, success } = useTypedSelector((state) => state.cart);
  const dispatch = useTypedDispatch();

  function closeHandler(e: MouseEvent<HTMLDivElement>): void {
    if (success) {
      dispatch(cartActions.setSuccessfullState());
    }
    dispatch(cartActions.closeCart());
  }

  return (
    <>
      <div className={classes["cart-backdrop"]} onClick={closeHandler} />
      <div className={classes.cart}>
        {!success && (
          <>
            <CartHeader />
            {cartItems.length === 0 && <CartEmpty />}
            {cartItems.length > 0 && (
              <>
                <CartItemsList />
                <CartForm />
              </>
            )}
          </>
        )}
        {success && <Success />}
      </div>
    </>
  );
};
export default Cart;
