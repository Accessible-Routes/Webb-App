import { useState, useEffect } from "react";

export const useFetch = (startLocation, endLocation) => {
  const url = ''; // TODO: update to correct endpoint
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(url); // '?startloc=' + startLoc + '&endloc=' + startLoc}
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setIsPending(false);
        setData(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
      }
    };
    fetchData();
  }, [startLocation, endLocation]);
  return { data, isPending, error };
};