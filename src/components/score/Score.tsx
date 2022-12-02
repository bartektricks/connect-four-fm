import { ReactComponent as Player1 } from "assets/player-one.svg";
import { ReactComponent as Player2 } from "assets/player-two.svg";
import clsx from "clsx";

import typographyStyles from "styles/typography.module.scss";
import roundedBoxStyles from "styles/roundedBox.module.scss";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import styles from "./Score.module.scss";

type ScoreProps = {
  score?: number;
  isPlayer2?: boolean;
  className?: string;
};

const Score = ({ score, isPlayer2, className }: ScoreProps) => {
  const Icon = isPlayer2 ? Player2 : Player1;

  const classes = clsx(
    {
      [roundedBoxStyles.roundedBox]: true,
      [styles.score]: true,
      [styles.scoreRight]: isPlayer2,
    },
    className
  );

  const iconClasses = clsx({
    [styles.icon]: true,
    [styles.iconRight]: isPlayer2,
  });

  return (
    <div className={classes} style={getTextAndBackgroundColor("white")}>
      <Icon className={iconClasses} />
      <h2 className={typographyStyles.text}>Player {isPlayer2 ? 2 : 1}</h2>
      <span
        className={`${typographyStyles.text} ${typographyStyles.medium} ${styles.scoreText}`}
      >
        {score || 0}
      </span>
    </div>
  );
};

export default Score;
