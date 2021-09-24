import { FC, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductsActions } from "../../store/slices/allProducts";
import Spinner from "../UI/Spinner";
import ProductItem from "./item/ProductItem";

const MessengerBags: FC = () => {
  const dispatch = useTypedDispatch()
  const messengerBags = useTypedSelector((state) => state.products.messengerBags);

  const { error, isLoading, sendRequest: getProducts } = useFetch();

  function handleData(arr: any[]): void {
    const newArr = arr.map((item) => ({ ...item, inCart: false, quantity: 1 }));
    dispatch(ProductsActions.addMessengerBags(newArr));
    dispatch(ProductsActions.sortMessengerBags({ type1: 'price', type2: "asc" }))
  }

  useEffect(() => {
    if (messengerBags.length > 0) {
      return;
    }

    const url = "https://second-approach-training-default-rtdb.europe-west1.firebasedatabase.app/messenger-bags.json";
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
        {messengerBags.map((product) => (
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
  )
};
export default MessengerBags;
