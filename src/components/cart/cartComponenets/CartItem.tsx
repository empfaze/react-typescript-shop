import { FC } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ProductsActions } from "../../../store/slices/allProducts";
import { cartActions } from "../../../store/slices/cart";
import { FetchedProduct } from "../../../types/allProducts";
import DeleteFromCart from "../../UI/DeleteFromCart";

import classes from "../styles/CartItem.module.css";

const CartItem: FC<FetchedProduct> = ({
  id,
  category,
  inCart,
  photo,
  name,
  rating,
  price,
  quantity,
}) => {
  const dispatch = useTypedDispatch();

  const products = useTypedSelector((state) => state.cart.items);
  const totalPrice = price * quantity;

  function incQuantityHandler(prodId: number): void {
    dispatch(cartActions.incProductQuantity(prodId));
  }
  function decQuantityHandler(prodId: number, prodCategory: number): void {
    const necessaryProd = products.find((prod) => prod.id === prodId);

    if (necessaryProd!.quantity === 1) {
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
    } else {
      dispatch(cartActions.decProductQuantity(prodId));
    }
  }

  return (
    <div className={classes.wrapper}>
      <img src={photo} alt={`Product ${id}`} className={classes.image} />
      <div className={classes["desc-info"]}>
        <p className={classes.name}>{name}</p>
        <p className={classes.price}>{totalPrice}&nbsp;&#8381;</p>
        <p className={classes.quantity}>x{quantity}</p>
      </div>
      <div className={classes["btn-wrapper"]}>
        <div className={classes["plus-minus"]}>
          <span
            className={classes.button}
            onClick={decQuantityHandler.bind(null, id, category)}
          >
            -
          </span>
          <span
            className={classes.button}
            onClick={incQuantityHandler.bind(null, id)}
          >
            +
          </span>
        </div>
        <div className={classes.trash}>
          <DeleteFromCart id={id} category={category} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
