import { useState } from "react";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = (url, input) => {
    setLoading(true);
    setError(null);

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
      .then((response) =>
        {
          console.log(response);
      return response.json()   
        } )
      .then((data) => {
        console.log(data);
        setData(data);     
        return data;        
      })
      .catch((error) => {
        setError(error);
        throw error;       
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { postData, loading, error, data };
}
