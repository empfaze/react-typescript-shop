import { ChangeEvent, useReducer } from "react";
import { MainFormAction, ValueState } from "../types/main-form";

const usePhone = (validateValue: (str: string) => boolean) => {
  const initialInputState: ValueState = {
    value: "",
    isTouched: false,
  };
  const inputStateReducer = (
    state = initialInputState,
    action: MainFormAction
  ): ValueState => {
    if (action.type === "CHANGE") {
      return {
        value: action.value!,
        isTouched: state.isTouched,
      };
    }

    if (action.type === "BLUR") {
      return {
        value: state.value,
        isTouched: true,
      };
    }

    if (action.type === "RESET") {
      return {
        value: "",
        isTouched: false,
      };
    }

    return initialInputState;
  };

  const [inputState, dispatchAction] = useReducer(
    inputStateReducer,
    initialInputState
  );
  console.log(inputState.value);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  function increasePhoneNumber(str: string): string {
    const inputValueArray = inputState.value.split("");

    switch (inputValueArray.length) {
      case 0:
        return str;
      case 1:
        return `${inputState.value} ${str}`;
      case 5:
        return `${inputState.value} ${str}`;
      case 9:
        return `${inputState.value}-${str}`;
      case 12:
        return `${inputState.value}-${str}`;
      default:
        return `${inputState.value}${str}`;
    }
  }
  function decreasePhoneNumber() {
    const inputValueArray = inputState.value.split("");

    switch (inputValueArray.length) {
      case 15:
        return inputValueArray.slice(0, -1).join("");
      case 14:
        return inputValueArray.slice(0, -2).join("");
      case 11:
        return inputValueArray.slice(0, -2).join("");
      case 7:
        return inputValueArray.slice(0, -2).join("");
      case 3:
        return inputValueArray.slice(0, -2).join("");
      case 1:
        return "";
      default:
        return inputValueArray.slice(0, -1).join("");
    }
  }
  const numbersArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const valArray = e.target.value.split("");
    const val = valArray[valArray.length - 1];

    if (
      valArray.length > inputState.value.split("").length &&
      numbersArray.includes(val) &&
      valArray.length <= 15
    ) {
      const transformedVal = increasePhoneNumber(val);
      dispatchAction({ type: "CHANGE", value: transformedVal });
    }

    if (
      valArray.length < inputState.value.split("").length &&
      valArray.length >= 0
    ) {
      const transformedVal = decreasePhoneNumber();
      dispatchAction({ type: "CHANGE", value: transformedVal });
    }
  };
  const valueBlurHandler = () => {
    dispatchAction({ type: "BLUR" });
  };
  const reset = () => {
    dispatchAction({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};
export default usePhone;
