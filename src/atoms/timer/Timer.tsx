import Text from "atoms/text/Text";
import sharedStyles from "styles/roundedBox.module.scss";

type TimerProps = {
  timeLeft?: number;
  isPlayers2Turn?: boolean;
};

const Timer = ({ timeLeft, isPlayers2Turn }: TimerProps) => {
  return (
    <div className={sharedStyles.roundedBox}>
      <Text>{`Player ${isPlayers2Turn ? 2 : 1}'s turn`}</Text>
      <Text>{`${timeLeft}s`}</Text>
    </div>
  );
};

export default Timer;
