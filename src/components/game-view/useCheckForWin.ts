import { COLUMN_COUNT, GameReducer, ROW_COUNT } from "./useGameReducer";
import { IS_FINISHED, NEXT_PLAYER } from "./useGameReducer";
import { useEffect } from "react";

export default function useCheckForWin(
  state: GameReducer[0],
  dispatch: GameReducer[1]
) {
  useEffect(() => {
    if (!state.movesCount) {
      return;
    }
    // There's no chance to win in less than 7 moves.
    if (state.movesCount < 7) {
      dispatch({ type: NEXT_PLAYER });
      return;
    }

    let hasWon = false;
    const currentPlayer = state.isPlayers2Turn ? 2 : 1;

    function getAdjacentTokens(
      c: number,
      r: number,
      type: "row" | "column" | "diagonal" | "negative_diagonal",
      currentPlayer: number
    ) {
      const adjacentTokens = [];

      for (let i = 0; i < 4; i++) {
        if (type === "row") {
          adjacentTokens.push(state.board?.[c + i]?.[r]);
        }

        if (type === "column") {
          adjacentTokens.push(state.board?.[c]?.[r + i]);
        }

        if (type === "diagonal") {
          adjacentTokens.push(state.board?.[c + i]?.[r + i]);
        }

        if (type === "negative_diagonal") {
          adjacentTokens.push(state.board?.[c - i]?.[r + i]);
        }
      }

      return adjacentTokens.every((player) => player === currentPlayer);
    }

    state.board.forEach((column, c) => {
      column.forEach((_, r) => {
        if (
          getAdjacentTokens(c, r, "row", currentPlayer) ||
          getAdjacentTokens(c, r, "column", currentPlayer) ||
          getAdjacentTokens(c, r, "diagonal", currentPlayer) ||
          getAdjacentTokens(c, r, "negative_diagonal", currentPlayer)
        ) {
          hasWon = true;
          return;
        }
      });
    });

    if (state.movesCount === ROW_COUNT * COLUMN_COUNT && !hasWon) {
      alert("I forgot to implement a no one won UI :)");
    }

    dispatch({ type: !hasWon ? NEXT_PLAYER : IS_FINISHED });
  }, [state.movesCount]);
}
