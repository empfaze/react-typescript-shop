import { FC } from "react";

import DeleteCartIcon from "../../assets/delete-from-cart.png";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { cartActions } from "../../store/slices/cart";
import { ProductsActions } from "../../store/slices/allProducts";
import classes from "./styles/DeleteFromCart.module.css";

interface DeleteFromCartProps {
  id: number;
  category: number;
}

const DeleteFromCart: FC<DeleteFromCartProps> = ({ id, category }) => {
  const dispatch = useTypedDispatch();

  function deleteHandler(prodId: number, prodCategory: number): void {
    switch (prodCategory) {
      case 1:
        dispatch(ProductsActions.changeInCartBackpacks(prodId));
        break;
      case 2:
        dispatch(ProductsActions.changeInCartMessengerBags(prodId));
        break;
      case 3:
        dispatch(ProductsActions.changeInCartBusinessBags(prodId));
        break;
    }

    dispatch(cartActions.removeFromCart(prodId));
  }

  return (
    <img
      src={DeleteCartIcon}
      alt="Delete Cart Icon"
      className={classes["delete-cart"]}
      onClick={deleteHandler.bind(null, id, category)}
    />
  );
};
export default DeleteFromCart;
