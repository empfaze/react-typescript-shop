import { FC } from "react";
import AddCartButton from "../../UI/AddCartButton";
import AddedToCart from "../../UI/Added";
import Star from "../../UI/Star";

import "./ProductItem.css";

interface ProductItemProps {
  key: number;
  id: number;
  category: number;
  photo: string;
  price: number;
  rating: number;
  name: string;
  inCart: boolean;
}

const ProductItem: FC<ProductItemProps> = ({
  id,
  category,
  photo,
  price,
  rating,
  name,
  inCart,
}) => {
  return (
    <div key={id} className="product-wrapper">
      <div className="rating-wrapper">
        <span className="rating">{rating}</span>
        <Star />
      </div>
      <div className="button-wrapper">
        {!inCart && <AddCartButton id={id} category={category} />}
        {inCart && <AddedToCart />}
      </div>
      <img src={photo} alt={`Product${id}`} className="product-image" />
      <p className="name">{name}</p>
      <p className="price">{price}&nbsp;&#8381;</p>
    </div>
  );
};
export default ProductItem;
