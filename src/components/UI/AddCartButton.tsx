import { FC } from "react";

import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import AddCartIcon from "../../assets/add-to-cart.svg";
import classes from "./styles/AddCartButton.module.css";
import { cartActions } from "../../store/slices/cart";
import { ProductsActions } from "../../store/slices/allProducts";

interface AddCartButtonProps {
  id: number;
  category: number;
}

const AddCartButton: FC<AddCartButtonProps> = ({ id, category }) => {
  const dispatch = useTypedDispatch();
  const products = useTypedSelector((state) => state.products);

  function addHandler(prodId: number, prodCategory: number): void {
    let necessaryArray;
    switch (prodCategory) {
      case 1:
        necessaryArray = products.backpacks;
        dispatch(ProductsActions.changeInCartBackpacks(prodId));
        break;
      case 2:
        necessaryArray = products.messengerBags;
        dispatch(ProductsActions.changeInCartMessengerBags(prodId));
        break;
      case 3:
        necessaryArray = products.businessBags;
        dispatch(ProductsActions.changeInCartBusinessBags(prodId));
        break;
    }

    const necessaryObject = necessaryArray?.find((item) => item.id === prodId);

    dispatch(cartActions.addToCart(necessaryObject!));
  }

  return (
    <img
      onClick={addHandler.bind(null, id, category)}
      src={AddCartIcon}
      alt="Add To Cart"
      className={classes["cart-product"]}
    />
  );
};

export default AddCartButton;
