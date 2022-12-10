import { useContext } from "react";
import { createContext, useCallback, useReducer } from "react";

export const COLUMN_COUNT = 7;
export const ROW_COUNT = 6;
const BOARD = Array.from({ length: COLUMN_COUNT }).map(() =>
  Array.from({ length: ROW_COUNT }).map(() => 0)
);

export const ADD_TOKEN = "add_token";
export const NEXT_PLAYER = "next_player";
export const RESTART_GAME = "restart_game";
export const NEXT_MATCH = "next_match";
export const IS_FINISHED = "is_finished";

const INITIAL_STATE = {
  isFinished: false,
  isPlayers2Turn: false,
  board: BOARD,
  movesCount: 0,
  score: [0, 0],
};

type AddToken = { type: typeof ADD_TOKEN; columnIndex: number };
type RestartGame = { type: typeof RESTART_GAME };
type NextMatch = { type: typeof NEXT_MATCH };
type IsFinished = { type: typeof IS_FINISHED };
type NextPlayer = { type: typeof NEXT_PLAYER };

type ActionType = AddToken | RestartGame | IsFinished | NextPlayer | NextMatch;

function gameReducer(
  state: typeof INITIAL_STATE,
  action: ActionType
): typeof INITIAL_STATE {
  switch (action.type) {
    case NEXT_PLAYER:
      return {
        ...state,
        isPlayers2Turn: !state.isPlayers2Turn,
      };
    case IS_FINISHED: {
      const score = [...state.score];

      score[state.isPlayers2Turn ? 1 : 0] += 1;

      return {
        ...state,
        isFinished: true,
        score,
      };
    }
    case NEXT_MATCH:
      return {
        ...INITIAL_STATE,
        score: state.score,
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

function useManageGame() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const setToken = useCallback((columnIndex: number) => {
    dispatch({ type: ADD_TOKEN, columnIndex });
  }, []);

  const setNextPlayer = useCallback(() => {
    dispatch({ type: NEXT_PLAYER });
  }, []);

  const setRestartGame = useCallback(() => {
    dispatch({ type: RESTART_GAME });
  }, []);

  const setNextMatch = useCallback(() => {
    dispatch({ type: NEXT_MATCH });
  }, []);

  const setIsFinished = useCallback(() => {
    dispatch({ type: IS_FINISHED });
  }, []);

  return {
    state,
    setToken,
    setNextPlayer,
    setRestartGame,
    setNextMatch,
    setIsFinished,
  };
}

type UseManageGameResult = ReturnType<typeof useManageGame>;

const GameContext = createContext<UseManageGameResult>(
  {} as UseManageGameResult
);

export const GameContextProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <GameContext.Provider value={useManageGame()}>
      {children}
    </GameContext.Provider>
  );
};

export const useGetGameContext = () => useContext(GameContext);
