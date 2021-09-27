import { FC, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductsActions } from "../../store/slices/allProducts";
import Spinner from "../UI/Spinner";
import ProductItem from "./item/ProductItem";

import "./AllProducts.css";
import { FetchedProduct } from "../../types/allProducts";

const Backpacks: FC = () => {
  const dispatch = useTypedDispatch();
  const backpacks = useTypedSelector((state) => state.products.backpacks);

  const { error, isLoading, sendRequest: getProducts } = useFetch();

  function handleData(arr: any[]): void {
    const newArr = arr.map((item) => ({ ...item, inCart: false, quantity: 1 }));

    dispatch(ProductsActions.addBackpacks(newArr));
    dispatch(ProductsActions.sortBackpacks({ type1: "price", type2: "asc" }));

    const localCart = localStorage.getItem("cart");
    if (typeof localCart === "string") {
      const parsedLocalCart: FetchedProduct[] = JSON.parse(localCart);
      const backpackLocalBags = parsedLocalCart.filter(
        (item) => item.category === 1
      );

      backpackLocalBags.forEach((backpackLocalBag) => {
        dispatch(ProductsActions.changeInCartBackpacks(backpackLocalBag.id));
      });
    }
  }

  useEffect(() => {
    if (backpacks.length > 0) {
      return;
    }

    const url =
      "https://second-approach-training-default-rtdb.europe-west1.firebasedatabase.app/backpacks.json";
    getProducts(url, handleData);
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {error && !isLoading && (
        <p className="error">
          We have some technical server issues...Please try later.
        </p>
      )}
      <section className="main-content">
        {backpacks.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            photo={product.photo}
            name={product.name}
            price={product.price}
            rating={product.rating}
            category={product.category}
            inCart={product.inCart}
          />
        ))}
      </section>
    </>
  );
};
export default Backpacks;
