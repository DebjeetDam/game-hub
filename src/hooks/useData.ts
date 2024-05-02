import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig, //parameters
  deps?: any[] // dependencies
) => {
  // data
  const [data, setData] = useState<T[]>([]);
  // error
  const [error, setError] = useState("");
  // loading
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      //unmount -> remount component
      const controller = new AbortController();
      setLoading(true);
      apiClient
        .get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    //change in dependencies will refresh data
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
