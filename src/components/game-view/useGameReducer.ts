import { useReducer } from "react";

const COLUMN_COUNT = 7;
const ROW_COUNT = 6;
const BOARD = Array.from({ length: COLUMN_COUNT }).map(() =>
  Array.from({ length: ROW_COUNT }).map(() => 0)
);

export const ADD_TOKEN = "add_token";
export const RESTART_GAME = "restart_game";
export const IS_FINISHED = "is_finished";

const INITIAL_STATE = {
  isFinished: false,
  isPlayers2Turn: false,
  board: BOARD,
  movesCount: 0,
};

type AddToken = { type: typeof ADD_TOKEN; columnIndex: number };
type RestartGame = { type: typeof RESTART_GAME };
type IsFinished = { type: typeof IS_FINISHED };

type ActionType = AddToken | RestartGame | IsFinished;

function reducer(
  state: typeof INITIAL_STATE,
  action: ActionType
): typeof INITIAL_STATE {
  switch (action.type) {
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
      const lastEmptyFieldIndex =
        state.board[action.columnIndex].lastIndexOf(0);

      const isStepAllowed = lastEmptyFieldIndex !== -1;

      const tokenBoard = isStepAllowed
        ? state.board.map((column, stateColumnIndex) => {
            if (action.columnIndex !== stateColumnIndex) {
              return column;
            }

            const columnCopy = [...column];

            columnCopy[lastEmptyFieldIndex] = state.isPlayers2Turn ? 2 : 1;

            return columnCopy;
          })
        : state.board;

      return {
        ...state,
        board: tokenBoard,
        movesCount: state.movesCount + (isStepAllowed ? 1 : 0),
        isPlayers2Turn: isStepAllowed
          ? !state.isPlayers2Turn
          : state.isPlayers2Turn,
      };
    }
    default:
      throw new Error("Type doesn't exist");
  }
}

export default function useGameReducer() {
  return useReducer(reducer, INITIAL_STATE);
}
