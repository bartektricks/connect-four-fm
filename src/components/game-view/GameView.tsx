import { MouseEventHandler, useRef, useState } from "react";
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
import PlayerToken from "components/player-token/PlayerToken";
import { useEffect } from "react";

const COLUMN_COUNT = 7;
const ROW_COUNT = 6;

const BOARD = Array.from({ length: COLUMN_COUNT }).map(() =>
  Array.from({ length: ROW_COUNT }).map(() => 0)
);

export type MarkerPos = {
  top: string;
  left: string;
  translateX: string;
};

const handleShowMenu: MouseEventHandler<HTMLAnchorElement> = (e) => {
  e.preventDefault();
  alert("MENU!");
};

// TODO Change to useReducer.
const GameView = () => {
  const markerRef = useRef<SVGSVGElement>(null);
  const [lastMarkerPos, setLastMarkerPos] = useState<MarkerPos>({
    top: "0",
    left: "50%",
    translateX: "0",
  });
  const [isFinished, setIsFinished] = useState(false);
  const [isPlayers2Turn, setIsPlayers2Turn] = useState(false);
  const [board, setBoard] = useState(BOARD);

  const subBackgroundColor = getTextAndBackgroundColor(
    isFinished ? (isPlayers2Turn ? "pink" : "yellow") : "dark-purple"
  );

  useResetMarkerOpacity(markerRef);

  useEffect(() => {
    if (!markerRef.current) {
      return;
    }

    const { top, left, translateX } = lastMarkerPos;

    if (top !== "0") {
      markerRef.current.style.opacity = "1";
    }

    markerRef.current.style.top = `${top}`;
    markerRef.current.style.transform = `translateX(${translateX})`;
    markerRef.current.style.left = `${left}`;
  });

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
          <BoardBlack
            className={styles.boardShadow}
            style={{ width: "100%" }}
          />
          <Marker
            isPlayers2Turn={isPlayers2Turn}
            className={styles.marker}
            ref={markerRef}
          />
          <div className={styles.boardColumnsWrapper}>
            {board.map((column, columnIndex) => (
              <button
                key={columnIndex}
                type="button"
                className={styles.column}
                onClick={(e) => {
                  setBoard((prevBoard) => {
                    const lastEmptyFieldIndex =
                      prevBoard[columnIndex].lastIndexOf(0);

                    if (lastEmptyFieldIndex === -1) {
                      return prevBoard;
                    }

                    return prevBoard.map((column, stateColumnIndex) => {
                      if (columnIndex !== stateColumnIndex) {
                        return column;
                      }

                      const columnCopy = [...column];

                      columnCopy[lastEmptyFieldIndex] = isPlayers2Turn ? 2 : 1;

                      return columnCopy;
                    });
                  });

                  setIsPlayers2Turn((prev) => !prev);
                }}
                onMouseEnter={(e) => moveMarker(e, markerRef, setLastMarkerPos)}
              >
                {column.map((player, rowIndex) => {
                  if (player === 0) {
                    return null;
                  }

                  return (
                    <PlayerToken key={rowIndex} isPlayer2={player === 2} />
                  );
                })}
              </button>
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
