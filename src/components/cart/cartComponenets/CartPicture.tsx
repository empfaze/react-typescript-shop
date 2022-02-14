import { FC } from "react";

import CartPic from "../../../assets/shopping-cart.png";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { cartActions } from "../../../store/slices/cart";

import classes from "../styles/CartPicture.module.css";

const CartPicture: FC = () => {
  const dispatch = useTypedDispatch();
  const cartQuantity = useTypedSelector((state) => state.cart.items.length);

  function openHandler(): void {
    dispatch(cartActions.openCart());
    document.body.classList.add("lock");
  }

  return (
    <div className={classes["picture-wrapper"]} onClick={openHandler}>
      <img src={CartPic} alt="Cart Icon" className={classes.picture} />
      <span className={classes.quantity}>{cartQuantity}</span>
    </div>
  );
};
export default CartPicture;
