import { MouseEventHandler, useRef } from "react";
import { Link } from "react-router-dom";
import SmallButton from "components/small-button/SmallButton";
import Score from "components/score/Score";
import WinBlock from "components/win-block/WinBlock";
import Timer from "components/timer/Timer";
import Marker from "components/marker/Marker";
import PlayerToken from "components/player-token/PlayerToken";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as BoardWhite } from "assets/board-layer-white.svg";
import { ReactComponent as BoardBlack } from "assets/board-layer-black.svg";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import useResetMarkerOpacity from "./useResetMarkerOpacity";
import { moveMarker } from "./gameViewUtils";
import useSetMarkerPos from "./useSetMarkerPos";
import useCheckForWin from "./useCheckForWin";
import useGameReducer, { ADD_TOKEN, RESTART_GAME } from "./useGameReducer";
import styles from "./GameView.module.scss";

const handleShowMenu: MouseEventHandler<HTMLAnchorElement> = (e) => {
  e.preventDefault();
  alert("MENU!");
};

const GameView = () => {
  const markerRef = useRef<SVGSVGElement>(null);
  const [state, dispatch] = useGameReducer();

  const subBackgroundColor = getTextAndBackgroundColor(
    state.isFinished
      ? state.isPlayers2Turn
        ? "yellow"
        : "pink"
      : "dark-purple"
  );

  useCheckForWin(state, dispatch);
  useResetMarkerOpacity(markerRef);

  const setLastMarkerPos = useSetMarkerPos(markerRef);

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
        <SmallButton
          to="/game"
          backgroundColor="dark-purple"
          onClick={() => {
            dispatch({ type: RESTART_GAME });
          }}
        >
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
                onClick={() => dispatch({ type: ADD_TOKEN, columnIndex })}
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
            onClick={() => {
              dispatch({ type: RESTART_GAME });
            }}
          />
        ) : (
          <Timer isPlayers2Turn={state.isPlayers2Turn} />
        )}
      </div>
    </div>
  );
};

export default GameView;
