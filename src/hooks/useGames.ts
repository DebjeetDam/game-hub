import useData from "./useData";
import { Genre } from "./useGenres";
import { Platform } from "./usePlatforms";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  // parent_platforms:[{platform: {id: 1, name: "PC", slug: "pc"}},…]
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

const useGames = (
  selectedGenre: Genre | null,
  selectedPlatform: Platform | null
) =>
  // passing selectedGenre as query string parameter
  //making data hook flexible
  useData<Game>(
    "/games",
    {
      params: {
        genres: selectedGenre?.id,
        platforms: selectedPlatform?.id,
      },
    },
    // array of dependencies
    [selectedGenre?.id, selectedPlatform?.id]
  );

export default useGames;
