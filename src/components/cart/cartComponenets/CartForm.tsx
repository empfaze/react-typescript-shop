import { FC, FormEvent, useEffect, useReducer, useState } from "react";
import useInput from "../../../hooks/useInput";
import Spinner from "../../UI/Spinner";

import classes from "../styles/CartForm.module.css";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { cartActions } from "../../../store/slices/cart";
import { ProductsActions } from "../../../store/slices/allProducts";

function validateName(str: string) {
  return str.trim() !== "";
}
function validatePhone(str: string) {
  return str.length > 10;
}

interface RequestState {
  error: boolean;
  isLoading: boolean;
}
const initialRequestState: RequestState = {
  error: false,
  isLoading: false,
};

interface RequestPayload {
  type: string;
}
const setRequestState = (
  state = initialRequestState,
  action: RequestPayload
): RequestState => {
  switch (action.type) {
    case "LOADING":
      return { error: false, isLoading: true };
    case "ERROR":
      return { error: true, isLoading: false };
    case "RESET":
      return { error: false, isLoading: false };
  }
  return initialRequestState;
};

const CartForm: FC = () => {
  const cartItems = useTypedSelector((state) => state.cart.items);
  const dispatch = useTypedDispatch();

  const [requestState, dispatchState] = useReducer(
    setRequestState,
    initialRequestState
  );
  const { error, isLoading } = requestState;

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: clearName,
  } = useInput(validateName);

  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
    reset: clearPhone,
  } = useInput(validatePhone);

  // form state
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (nameIsValid && phoneIsValid) setFormIsValid(true);
    else setFormIsValid(false);
  }, [nameIsValid, phoneIsValid]);

  function submitHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatchState({ type: "LOADING" });

    const user = {
      name,
      phone,
      products: cartItems,
    };
    const url =
      "https://second-approach-training-default-rtdb.europe-west1.firebasedatabase.app/requests.json";
    async function sendData(enteredURL: string, enteredData: any) {
      try {
        const request = await fetch(enteredURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enteredData),
        });
        if (!request.ok) {
          throw new Error("Server technical issues");
        }

        cartItems.forEach((item) => removeAllFromCart(item.id, item.category));

        dispatchState({ type: "RESET" });
        dispatch(cartActions.setSuccessfullState());
      } catch (err) {
        dispatchState({ type: "ERROR" });
      }
    }
    sendData(url, user);

    clearName();
    clearPhone();
    setFormIsValid(false);
  }

  function removeAllFromCart(prodId: number, prodCategory: number): void {
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
  function resetFormHandler(): void {
    clearName();
    clearPhone();
    setFormIsValid(false);
  }
  function errorResetHandler(): void {
    dispatchState({ type: "RESET" });
  }

  // para classes definition
  const nameParaInvalid = nameHasError
    ? classes["para-invalid-visible"]
    : classes["para-invalid-invisible"];
  const phoneParaInvalid = phoneHasError
    ? classes["para-invalid-visible"]
    : classes["para-invalid-invisible"];

  // input classes definition
  const nameInputInvalid = nameHasError ? classes.invalid : "";
  const phoneInputInvalid = phoneHasError ? classes.invalid : "";

  return (
    <>
      {isLoading && <Spinner />}
      {error && (
        <>
          <p className={classes.error}>
            Something went wrong...Please, check the validity of the entered
            data and try again.
          </p>
          <button onClick={errorResetHandler} className={classes["error-btn"]}>
            Try Later
          </button>
        </>
      )}
      {!isLoading && !error && (
        <form onSubmit={submitHandler} className={classes.form}>
          <div>
            <label htmlFor="name" />
            <input
              type="text"
              id="name"
              placeholder="Name"
              className={nameInputInvalid}
              value={name}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            <p className={nameParaInvalid}>Name must not be empty</p>
          </div>
          <div>
            <label htmlFor="phone" />
            <input
              type="tel"
              id="phone"
              placeholder="Phone"
              maxLength={11}
              className={phoneInputInvalid}
              value={phone}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
            />
            <p className={phoneParaInvalid}>
              Please, enter correct telephone number
            </p>
          </div>
          <div className={classes["btns-wrapper"]}>
            <button
              type="button"
              className={classes["button-simple"]}
              onClick={resetFormHandler}
            >
              Clear All
            </button>
            <button
              type="submit"
              disabled={!formIsValid}
              className={classes["button-simple"]}
            >
              Send
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CartForm;
