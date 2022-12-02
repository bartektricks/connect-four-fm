import SmallButton from "components/small-button/SmallButton";
import typographyStyles from "styles/typography.module.scss";
import sharedStyles from "styles/roundedBox.module.scss";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import styles from "./WinBlock.module.scss";

const WinBlock = ({ hasPlayer2Won }: { hasPlayer2Won?: boolean }) => {
  return (
    <div
      className={`${sharedStyles.roundedBox} ${styles.winBlock}`}
      style={getTextAndBackgroundColor("white")}
    >
      <span className={typographyStyles.text}>
        Player {hasPlayer2Won ? 2 : 1}
      </span>
      <h2 className={`${typographyStyles.text} ${typographyStyles.large}`}>
        Wins
      </h2>
      <SmallButton to="/game">Play again</SmallButton>
    </div>
  );
};

export default WinBlock;
