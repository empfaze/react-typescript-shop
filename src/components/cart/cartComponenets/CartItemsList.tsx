import { FC } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import classes from "../styles/CartItem.module.css";
import CartItem from "./CartItem";

const CartItemsList: FC = () => {
  const { items: cartItems } = useTypedSelector((state) => state.cart);
  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  return (
    <>
      <div className={classes["main-wrapper-simple"]}>
        <TransitionGroup className={classes["main-wrapper"]}>
          {cartItems.map((item) => (
            <CSSTransition
              key={item.id}
              timeout={300}
              classNames={{
                enter: "",
                enterActive: "",
                exit: classes["delete-animation-exit"],
                exitActive: classes["delete-animation-exit-active"],
              }}
            >
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
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <p className={classes.total}>Total Price: {totalPrice}&nbsp;&#8381;</p>
    </>
  );
};
export default CartItemsList;
