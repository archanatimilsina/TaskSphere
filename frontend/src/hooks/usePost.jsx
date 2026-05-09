import { useState, useCallback, useEffect, useRef } from "react";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const isMounted = useRef(true);
  useEffect(() => {
    return () => { isMounted.current = false; };
  }, []);

  const postData = useCallback(async (url, input) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Error: ${response.status}`);
      }

      if (isMounted.current) {
        setData(result);
      }
      
      return result;
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || "Something went wrong");
      }
      throw err; 
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  return { postData, loading, error, data };
}