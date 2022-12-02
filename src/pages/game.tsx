import GameView from "components/game-view/GameView";
import BoardBackground from "components/board-background/BoardBackground";

const Game = () => {
  return (
    <BoardBackground
      backgroundColor="purple"
      subBackgroundColor="dark-purple"
      isAlignedTop
    >
      <GameView />
    </BoardBackground>
  );
};

export default Game;
