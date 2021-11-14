import { useState, useCallback } from "react";
import { SendToAuth } from "../types/main-form";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const sendRequest = useCallback(
    async (
      url: string,
      userData: SendToAuth,
      handleRecievedData: (fetchedData: any) => void
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchData = {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        };
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchData),
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        handleRecievedData(data);
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message || "Something went wrong!");
      }
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
