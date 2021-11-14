import { ChangeEvent, useReducer } from "react";
import { MainFormAction, ValueState } from "../types/main-form";

const useInput = (validateValue: (str: string) => boolean) => {
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

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchAction({ type: "CHANGE", value: e.target.value });
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
export default useInput;
