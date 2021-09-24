import { FC } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import classes from "../styles/CartItem.module.css";
import CartItem from "./CartItem";

const CartItemsList: FC = () => {
  const { items: cartItems } = useTypedSelector((state) => state.cart);
  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  const wrapperClassName = cartItems.length > 3 ? "main-wrapper-big" : "";

  return (
    <>
      <div className={classes[wrapperClassName]}>
        <div className={classes["main-wrapper"]}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              category={item.category}
              rating={item.rating}
              inCart={item.inCart}
              name={item.name}
              price={item.price}
              photo={item.photo}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
      <p className={classes.total}>Total Price: {totalPrice}&nbsp;&#8381;</p>
    </>
  );
};
export default CartItemsList;
