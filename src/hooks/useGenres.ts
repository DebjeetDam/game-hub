import useData from "./useData";
import genres from "../data/genres";
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

//for const data
const useGenres = () => ({ data: genres, isLoading: false, error: null });
// genre Hook
// const useGenres = () => useData<Genre>("/genres");

export default useGenres;
