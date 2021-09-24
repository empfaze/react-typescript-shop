import { FC } from "react";

import AddedToCartIcon from "../../assets/added.png";
import classes from "./styles/AddCartButton.module.css";

const AddedToCart: FC = () => {
  return (
    <img
      src={AddedToCartIcon}
      alt="Added To Cart"
      className={classes["product-in-cart"]}
    />
  );
};
export default AddedToCart;
