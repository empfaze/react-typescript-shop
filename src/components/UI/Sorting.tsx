import { ChangeEvent, FC, useEffect, useReducer } from "react";
import { useHistory } from "react-router";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { ProductsActions } from "../../store/slices/allProducts";

import classes from "./styles/Sorting.module.css";

interface SortingState {
  mainType: string;
  secondaryType: string;
}
interface SortingActionPayload {
  type: string;
  value: string;
}

const initialSortingState: SortingState = {
  mainType: "price",
  secondaryType: "asc",
};

const setSortingState = (
  state = initialSortingState,
  action: SortingActionPayload
): SortingState => {
  switch (action.type) {
    case "price":
      return { mainType: action.value, secondaryType: state.secondaryType };
    case "rating":
      return { mainType: action.value, secondaryType: state.secondaryType };

    case "asc":
      return { mainType: state.mainType, secondaryType: action.value };
    case "des":
      return { mainType: state.mainType, secondaryType: action.value };
  }
  return initialSortingState;
};

const Sorting: FC = () => {
  const dispatch = useTypedDispatch();

  const router = useHistory();
  const { pathname } = router.location;

  const [sortingState, dispatchState] = useReducer(
    setSortingState,
    initialSortingState
  );
  const { mainType, secondaryType } = sortingState;

  useEffect(() => {
    console.log(pathname);
    switch (pathname) {
      case "/main/backpacks":
        dispatch(
          ProductsActions.sortBackpacks({
            type1: mainType,
            type2: secondaryType,
          })
        );
        break;
      case "/main/messenger-bags":
        dispatch(
          ProductsActions.sortMessengerBags({
            type1: mainType,
            type2: secondaryType,
          })
        );
        break;
      case "/main/business-bags":
        dispatch(
          ProductsActions.sortBusinessBags({
            type1: mainType,
            type2: secondaryType,
          })
        );
        break;
      default:
        break;
    }
  }, [mainType, secondaryType, pathname, dispatch]);

  function mainOptionsHandler(e: ChangeEvent<HTMLSelectElement>): void {
    const chosenOption = e.target.value;

    if (chosenOption === "price") {
      dispatchState({ type: "price", value: chosenOption });
    } else {
      dispatchState({ type: "rating", value: chosenOption });
    }
  }
  function secondaryOptionshandler(e: ChangeEvent<HTMLSelectElement>): void {
    const chosenOption = e.target.value;

    if (chosenOption === "asc") {
      dispatchState({ type: "asc", value: chosenOption });
    } else {
      dispatchState({ type: "des", value: chosenOption });
    }
  }

  return (
    <div className={classes["main-wrapper"]}>
      <span className={classes.text}>Sorting</span>
      <select
        name="typeMain"
        id="typeMain"
        className={classes.select}
        value={sortingState.mainType}
        onChange={mainOptionsHandler}
      >
        <option value="price">by price</option>
        <option value="rating">by rating</option>
      </select>
      <select
        name="typeSecond"
        id="typeSecond"
        className={classes.select}
        value={sortingState.secondaryType}
        onChange={secondaryOptionshandler}
      >
        <option value="asc">ascending</option>
        <option value="des">descending</option>
      </select>
    </div>
  );
};

export default Sorting;
