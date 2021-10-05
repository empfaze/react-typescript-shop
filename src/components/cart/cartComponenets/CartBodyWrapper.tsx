import { FC } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CartEmpty from "./CartEmpty";
import CartForm from "./CartForm";
import CartHeader from "./CartHeader";
import CartItemsList from "./CartItemsList";

const CartBodyWrapper: FC = () => {
  const { items: cartItems } = useTypedSelector((state) => state.cart);

  return (
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
  );
};
export default CartBodyWrapper;
