import CircleButton from "components/circle-button/CircleButton";
import Text from "components/text/Text";
import sharedStyles from "styles/roundedBox.module.scss";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import styles from "./RulesBlock.module.scss";

const RulesBlock = () => {
  return (
    <div
      className={`${sharedStyles.roundedBox} ${sharedStyles.large} ${styles.rulesBlock}`}
      style={getTextAndBackgroundColor("white")}
    >
      <Text
        tag="h1"
        type="large"
        className={`${styles.title} ${styles.spacer}`}
      >
        Rules
      </Text>
      <Text type="small" className={styles.coloredTitle}>
        Objective
      </Text>
      <p className={styles.spacer}>
        Be the first player to connect 4 of the same colored discs in a row
        (either vertically, horizontally, or diagonally).
      </p>
      <Text type="small" className={styles.coloredTitle}>
        How to play
      </Text>
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
