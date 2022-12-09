import { useReducer } from "react";

export const COLUMN_COUNT = 7;
export const ROW_COUNT = 6;
const BOARD = Array.from({ length: COLUMN_COUNT }).map(() =>
  Array.from({ length: ROW_COUNT }).map(() => 0)
);

export const ADD_TOKEN = "add_token";
export const NEXT_PLAYER = "next_player";
export const RESTART_GAME = "restart_game";
export const IS_FINISHED = "is_finished";

const INITIAL_STATE = {
  isFinished: false,
  isPlayers2Turn: false,
  lastTokenAdded: 0,
  board: BOARD,
  movesCount: 0,
};

type AddToken = { type: typeof ADD_TOKEN; columnIndex: number };
type RestartGame = { type: typeof RESTART_GAME };
type IsFinished = { type: typeof IS_FINISHED };
type NextPlayer = { type: typeof NEXT_PLAYER };

type ActionType = AddToken | RestartGame | IsFinished | NextPlayer;

function reducer(
  state: typeof INITIAL_STATE,
  action: ActionType
): typeof INITIAL_STATE {
  switch (action.type) {
    case NEXT_PLAYER:
      return {
        ...state,
        isPlayers2Turn: !state.isPlayers2Turn,
      };
    case IS_FINISHED:
      return {
        ...state,
        isFinished: true,
      };
    case RESTART_GAME:
      return {
        ...INITIAL_STATE,
      };
    case ADD_TOKEN: {
      const currentPlayer = state.isPlayers2Turn ? 2 : 1;
      const lastEmptyFieldIndex =
        state.board[action.columnIndex].lastIndexOf(0);

      const isStepAllowed = lastEmptyFieldIndex !== -1;

      if (state.isFinished || !isStepAllowed) {
        return state;
      }

      return {
        ...state,
        board: state.board.map((column, stateColumnIndex) => {
          if (action.columnIndex !== stateColumnIndex) {
            return column;
          }

          const columnCopy = [...column];

          columnCopy[lastEmptyFieldIndex] = currentPlayer;

          return columnCopy;
        }),
        movesCount: state.movesCount + 1,
      };
    }
    default:
      throw new Error("Type doesn't exist");
  }
}

export default function useGameReducer() {
  return useReducer(reducer, INITIAL_STATE);
}

export type GameReducer = ReturnType<typeof useGameReducer>;
