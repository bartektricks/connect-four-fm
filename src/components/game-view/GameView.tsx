import { ElementType, MouseEventHandler, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SmallButton from "components/small-button/SmallButton";
import Score from "components/score/Score";
import WinBlock from "components/win-block/WinBlock";
import Timer from "components/timer/Timer";
import Marker from "components/marker/Marker";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as BoardWhite } from "assets/board-layer-white.svg";
import { ReactComponent as BoardBlack } from "assets/board-layer-black.svg";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import styles from "./GameView.module.scss";
import useResetMarkerOpacity from "./useResetMarkerOpacity";
import { moveMarker } from "./gameViewUtils";

const handleShowMenu: MouseEventHandler<HTMLAnchorElement> = (e) => {
  e.preventDefault();
  alert("MENU!");
};

const GameView = () => {
  const markerRef = useRef<SVGSVGElement>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isPlayers2Turn, setIsPlayers2Turn] = useState(false);

  const subBackgroundColor = getTextAndBackgroundColor(
    isFinished ? (isPlayers2Turn ? "pink" : "yellow") : "dark-purple"
  );

  useResetMarkerOpacity(markerRef);

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
          <Marker
            isPlayers2Turn={isPlayers2Turn}
            className={styles.marker}
            ref={markerRef}
          />
          <div className={styles.boardColumnsWrapper}>
            {Array.from(Array(7).keys()).map((key) => (
              <button
                key={key}
                type="button"
                className={styles.column}
                onClick={(e) => {
                  alert(key);
                }}
                onMouseEnter={(e) => moveMarker(e, markerRef)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottomBlock}>
        {isFinished ? (
          <WinBlock hasPlayer2Won={isPlayers2Turn} />
        ) : (
          <Timer isPlayers2Turn={isPlayers2Turn} />
        )}
      </div>
    </div>
  );
};

export default GameView;
