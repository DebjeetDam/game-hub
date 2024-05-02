import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  // parent_platforms:[{platform: {id: 1, name: "PC", slug: "pc"}},…]
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

interface FetchGamesResponse {
  count: number;
  //next: string<uri>Nullable,
  //previous: string<uri>Nullable,
  results: Game[];
}

const useGames = () => {
  // data
  const [games, setGames] = useState<Game[]>([]);
  // error
  const [error, setError] = useState("");
  // loading
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //unmount -> remount component
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
