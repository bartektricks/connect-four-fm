import CircleButton from "components/circle-button/CircleButton";
import typographyStyles from "styles/typography.module.scss";
import roudedBoxStyles from "styles/roundedBox.module.scss";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import styles from "./RulesBlock.module.scss";

const RulesBlock = () => {
  return (
    <div
      className={`${roudedBoxStyles.roundedBox} ${roudedBoxStyles.large} ${styles.rulesBlock}`}
      style={getTextAndBackgroundColor("white")}
    >
      <h1
        className={`${typographyStyles.text} ${typographyStyles.large} ${styles.title} ${styles.spacer}`}
      >
        Rules
      </h1>
      <h2
        className={`${typographyStyles.text} ${typographyStyles.small} ${styles.coloredTitle}`}
      >
        Objective
      </h2>
      <p className={styles.spacer}>
        Be the first player to connect 4 of the same colored discs in a row
        (either vertically, horizontally, or diagonally).
      </p>
      <h2
        className={`${typographyStyles.text} ${typographyStyles.small} ${styles.coloredTitle}`}
      >
        How to play
      </h2>
      <ol className={styles.list}>
        <Rule>Red goes first in the first game.</Rule>
        <Rule>
          Players must alternate turns, and only one disc can be dropped in each
          turn.
        </Rule>
        <Rule>The game ends when there is a 4-in-a-row or a stalemate.</Rule>
        <Rule>
          The starter of the previous game goes second on the next game.
        </Rule>
      </ol>
      <CircleButton to="/" className={styles.button} />
    </div>
  );
};

const Rule = ({ children }: { children: string }) => (
  <li className={styles.listItem}>
    <p className={styles.listItemText}>{children}</p>
  </li>
);

export default RulesBlock;
