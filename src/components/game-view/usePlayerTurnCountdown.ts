import { useGetGameContext } from "context/useGameContext";
import { useEffect, useRef, useState } from "react";

const INITIAL_TIME = 30;

export default function usePlayerTurnCountdown(isPaused: boolean) {
  const { state, setNextPlayer } = useGetGameContext();
  const [counter, setCounter] = useState(INITIAL_TIME);
  const timerRef = useRef(0);

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
    if (state.isFinished && timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [state.isFinished]);

  useEffect(() => {
    setCounter(INITIAL_TIME);
  }, [state.isPlayers2Turn]);

  return counter;
}
