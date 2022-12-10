import GameView from "components/game-view/GameView";
import BoardBackground from "components/board-background/BoardBackground";
import { GameContextProvider } from "context/useGameContext";

const Game = () => {
  return (
    <GameContextProvider>
      <BoardBackground backgroundColor="purple" isAlignedTop>
        <GameView />
      </BoardBackground>
    </GameContextProvider>
  );
};

export default Game;
