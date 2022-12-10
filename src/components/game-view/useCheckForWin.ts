import { COLUMN_COUNT, GameReducer, ROW_COUNT } from "./useGameReducer";
import { IS_FINISHED, NEXT_PLAYER } from "./useGameReducer";
import { useEffect } from "react";

const adjacentTypes = [
  "row",
  "column",
  "diagonal",
  "negative_diagonal",
] as const;

function hasMatchingAdjacentNumbers(
  col: number,
  row: number,
  type: typeof adjacentTypes[number],
  matchingNumber: number,
  arr: number[][]
) {
  const adjacentTokens = [];

  for (let i = 0; i < 4; i++) {
    let item: number | undefined;

    if (type === "row") {
      item = arr?.[col + i]?.[row];
    }

    if (type === "column") {
      item = arr?.[col]?.[row + i];
    }

    if (type === "diagonal") {
      item = arr?.[col + i]?.[row + i];
    }

    if (type === "negative_diagonal") {
      item = arr?.[col - i]?.[row + i];
    }

    adjacentTokens.push(item);
  }

  return adjacentTokens.every((number) => number === matchingNumber);
}

export default function useCheckForWin(
  state: GameReducer[0],
  dispatch: GameReducer[1]
) {
  useEffect(() => {
    if (!state.movesCount) {
      return;
    }
    // There's no chance to win in less than 5 moves.
    if (state.movesCount < 5) {
      dispatch({ type: NEXT_PLAYER });
      return;
    }

    let hasWon = false;
    const currentPlayer = state.isPlayers2Turn ? 2 : 1;

    state.board.forEach((column, c) => {
      column.forEach((_, r) => {
        if (
          adjacentTypes.find((type) =>
            hasMatchingAdjacentNumbers(c, r, type, currentPlayer, state.board)
          )
        ) {
          hasWon = true;
          return;
        }
      });
    });

    if (state.movesCount >= ROW_COUNT * COLUMN_COUNT && !hasWon) {
      alert("I forgot to implement a no one won UI :)");
    }

    dispatch({ type: !hasWon ? NEXT_PLAYER : IS_FINISHED });
  }, [state.movesCount]);
}
