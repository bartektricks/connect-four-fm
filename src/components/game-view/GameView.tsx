import { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import SmallButton from "components/small-button/SmallButton";
import Score from "components/score/Score";
import WinBlock from "components/win-block/WinBlock";
import Timer from "components/timer/Timer";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as BoardWhite } from "assets/board-layer-white.svg";
import { ReactComponent as BoardBlack } from "assets/board-layer-black.svg";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import styles from "./GameView.module.scss";

// subBackgroundColor?: Extract<Background, "dark-purple" | "yellow" | "pink">;

const GameView = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(1);
  const handleShowMenu: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    alert("MENU!");
  };

  const subBackgroundColor = getTextAndBackgroundColor("dark-purple");

  return (
    <div className={styles.gameView}>
      <span className={styles.subBackground} style={subBackgroundColor} />
      <nav className={styles.header}>
        <SmallButton
          to="#"
          backgroundColor="dark-purple"
          onClick={handleShowMenu}
        >
          Menu
        </SmallButton>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <SmallButton to="/game" backgroundColor="dark-purple">
          Restart
        </SmallButton>
      </nav>
      <div className={styles.boardScore}>
        <div>
          <Score score={0} className={styles.player1Score} />
        </div>
        <div>
          <Score score={0} className={styles.player2Score} isPlayer2 />
        </div>
        <div className={styles.boardWrapper}>
          <BoardWhite className={styles.board} style={{ width: "100%" }} />
          <BoardBlack style={{ width: "100%" }} />
        </div>
      </div>
      <div className={styles.bottomBlock}>
        {isFinished ? (
          <WinBlock hasPlayer2Won={playerTurn === 2} />
        ) : (
          <Timer isPlayers2Turn={playerTurn === 2} />
        )}
      </div>
    </div>
  );
};

export default GameView;
