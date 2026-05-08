import { useState } from "react";

export default function useDelete() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const DeleteData = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "DELETE",
      });
      const data = await res.json();
      setData(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  

  return { DeleteData, loading, error, data };
}
