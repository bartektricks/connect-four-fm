import { ReactComponent as Player1 } from "assets/player-one.svg";
import { ReactComponent as Player2 } from "assets/player-two.svg";
import Text from "atoms/text/Text";

import sharedStyles from "styles/roundedBox.module.scss";
import styles from "./Score.module.scss";

type ScoreProps = {
  score?: number;
  isPlayer2?: boolean;
};

const Score = ({ score, isPlayer2 }: ScoreProps) => {
  const Icon = isPlayer2 ? Player2 : Player1;

  return (
    <div className={`${sharedStyles.roundedBox} ${styles.score}`}>
      <Icon className={styles.icon} />
      <Text tag="h2" type="small">{`Player ${isPlayer2 ? 2 : 1}`}</Text>
      <Text tag="span" type="large">
        {score || 0}
      </Text>
    </div>
  );
};

export default Score;
