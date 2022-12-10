import { useEffect, useRef, useState } from "react";
import { GameReducer, NEXT_PLAYER } from "./useGameReducer";

const INITIAL_TIME = 30;

export default function usePlayerTurnCountdown(
  state: GameReducer[0],
  dispatch: GameReducer[1]
) {
  const timerRef = useRef(0);
  const [counter, setCounter] = useState(INITIAL_TIME);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter <= 0) {
      dispatch({ type: NEXT_PLAYER });
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [counter, state.isFinished]);

  useEffect(() => {
    if (state.isFinished && timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [state.isFinished]);

  useEffect(() => {
    setCounter(INITIAL_TIME);
  }, [state.isPlayers2Turn]);

  return counter;
}
