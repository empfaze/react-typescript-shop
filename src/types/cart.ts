import { FetchedProduct } from "./allProducts";

export interface CartState {
  items: FetchedProduct[];
  cartIsShown: boolean;
  success: boolean;
}

export interface CartAddPayload {
  payload: FetchedProduct;
}
export interface CartRemovePayload {
  payload: number;
}
