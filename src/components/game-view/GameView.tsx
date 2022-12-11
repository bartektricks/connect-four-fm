import { MouseEventHandler, useRef } from "react";
import { Link } from "react-router-dom";
import SmallButton from "components/small-button/SmallButton";
import Score from "components/score/Score";
import WinBlock from "components/win-block/WinBlock";
import Timer from "components/timer/Timer";
import Marker from "components/marker/Marker";
import GameModal from "components/game-modal/GameModal";
import PlayerToken from "components/player-token/PlayerToken";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as BoardWhite } from "assets/board-layer-white.svg";
import { ReactComponent as BoardBlack } from "assets/board-layer-black.svg";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import useResetMarkerOpacity from "./useResetMarkerOpacity";
import { moveMarker } from "./gameViewUtils";
import useSetMarkerPos from "./useSetMarkerPos";
import useCheckForWin from "./useCheckForWin";
import usePlayerTurnCountdown from "./usePlayerTurnCountdown";
import styles from "./GameView.module.scss";
import { useGetGameContext } from "context/useGameContext";
import { useState } from "react";

const GameView = () => {
  const markerRef = useRef<SVGSVGElement>(null);
  const [showModal, setShowModal] = useState(false);
  const { state, setRestartGame, setToken, setNextMatch } = useGetGameContext();

  const handleShowMenu: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const subBackgroundColor = getTextAndBackgroundColor(
    state.isFinished
      ? state.isPlayers2Turn
        ? "yellow"
        : "pink"
      : "dark-purple"
  );

  useCheckForWin();
  useResetMarkerOpacity(markerRef);

  const { counter, resetTime } = usePlayerTurnCountdown(showModal);
  const setLastMarkerPos = useSetMarkerPos(markerRef);

  return (
    <div className={styles.gameView}>
      <GameModal isOpen={showModal} handleSetIsOpen={setShowModal} />
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
        <SmallButton
          to="/game"
          backgroundColor="dark-purple"
          onClick={() => {
            setRestartGame();
            resetTime();
          }}
        >
          Restart
        </SmallButton>
      </nav>
      <div className={styles.boardScore}>
        <div>
          <Score score={state.score[0]} className={styles.player1Score} />
        </div>
        <div>
          <Score
            score={state.score[1]}
            className={styles.player2Score}
            isPlayer2
          />
        </div>
        <div className={styles.boardWrapper}>
          <BoardWhite className={styles.board} style={{ width: "100%" }} />
          <BoardBlack
            className={styles.boardShadow}
            style={{ width: "100%" }}
          />
          <Marker
            isPlayers2Turn={state.isPlayers2Turn}
            className={styles.marker}
            ref={markerRef}
          />
          <div className={styles.boardColumnsWrapper}>
            {state.board.map((column, columnIndex) => (
              <button
                key={columnIndex}
                type="button"
                className={styles.column}
                onClick={(e) => {
                  e.preventDefault();
                  setToken(columnIndex);
                }}
                onMouseEnter={(e) => moveMarker(e, markerRef, setLastMarkerPos)}
              >
                {column.map((player, rowIndex) =>
                  player === 0 ? null : (
                    <PlayerToken key={rowIndex} isPlayer2={player === 2} />
                  )
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottomBlock}>
        {state.isFinished ? (
          <WinBlock
            hasPlayer2Won={state.isPlayers2Turn}
            onClick={setNextMatch}
          />
        ) : (
          <Timer isPlayers2Turn={state.isPlayers2Turn} timeLeft={counter} />
        )}
      </div>
    </div>
  );
};

export default GameView;
