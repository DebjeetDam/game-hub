import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

// export interface Platform {
//   id: number;
//   name: string;
//   slug: string;
// }

export interface Genre {
  id: number;
  name: string;
}

interface FetchGenreResponse {
  count: number;
  results: Genre[];
}

const useGenre = () => {
  // data
  const [genres, setGenre] = useState<Genre[]>([]);
  // error
  const [error, setError] = useState("");
  // loading
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //unmount -> remount component
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchGenreResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        setGenre(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenre;
