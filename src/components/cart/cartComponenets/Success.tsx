import { FC, MouseEvent } from "react";

import SuccessIcon from "../../../assets/like.png";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { cartActions } from "../../../store/slices/cart";
import classes from "../styles/Cart.module.css";

const Success: FC = () => {
  const dispatch = useTypedDispatch();

  function closeCart(e: MouseEvent<HTMLButtonElement>): void {
    dispatch(cartActions.setSuccessfullState());
    dispatch(cartActions.closeCart());
  }

  return (
    <div className={classes["success-wrapper"]}>
      <img src={SuccessIcon} alt="Successfull send" className={classes.icon} />
      <p className={classes["success-text"]}>
        Request has been successfully sent.
        <br />
        Our manager will contact you soon.
      </p>
      <button onClick={closeCart} className={classes["button-simple"]}>
        Close
      </button>
    </div>
  );
};
export default Success;
