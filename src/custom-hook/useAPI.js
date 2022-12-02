import { useState, useCallback } from "react";

export const useAPI = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAPI = useCallback(async (url, setData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      setData(data);
      setIsLoading(true);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return {
    fetchAPI,
    error,
    isLoading,
  };
};

export default useAPI;
