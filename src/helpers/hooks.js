import { useState, useEffect } from "react";
import axios from "axios";
import { authenticationService, authAxios } from "../services";

function useFetch(url, initialState = null) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let ax = axios;
        if (authenticationService.isAuthenticated) {
          ax = authAxios;
        }
        // the response is asynchronous so we can use await (wait for the call from axios)
        const res = await ax.get(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
}

export { useFetch };
