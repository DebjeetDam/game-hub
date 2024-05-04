import React from "react";
import { Game } from "../hooks/useGames";
import { Card, CardBody, HStack, Heading, Image, Text } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImgUrl from "../services/image-url";
import Emoji from "./Emoji";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    //Image bigger than container -> overflow
    <Card width={"262px"} borderRadius={10} overflow={"hidden"}>
      <Image src={getCroppedImgUrl(game.background_image)}></Image>
      <CardBody>
        <HStack justifyContent={"space-between"} marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>{" "}
        <Heading fontSize={"2xl"}>
          {game.name}
          {/* <Emoji rating={game.rating_top} /> */}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
