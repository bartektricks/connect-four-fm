import { useGetGameContext } from "context/useGameContext";
import { useCallback } from "react";
import { useEffect, useRef, useState } from "react";

const INITIAL_TIME = 30;

export default function usePlayerTurnCountdown(isPaused: boolean) {
  const { state, setNextPlayer } = useGetGameContext();
  const [counter, setCounter] = useState(INITIAL_TIME);
  const timerRef = useRef(0);

  const resetTime = useCallback(() => {
    setCounter(INITIAL_TIME);
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    timerRef.current = setTimeout(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter <= 0) {
      setNextPlayer();
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [counter, isPaused]);

  useEffect(() => {
    resetTime();
  }, [state.movesCount, resetTime]);

  return { counter, resetTime };
}
