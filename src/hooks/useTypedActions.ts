import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ProductsActions } from "../store/slices/allProducts";
import { authActions } from "../store/slices/auth";
import { cartActions } from "../store/slices/cart";
import { navActions } from "../store/slices/nav";

const allActions = {
  ...cartActions,
  ...ProductsActions,
  ...authActions,
  ...navActions,
};

export const useTypedActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
