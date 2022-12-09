import SmallButton from "components/small-button/SmallButton";
import typographyStyles from "styles/typography.module.scss";
import sharedStyles from "styles/roundedBox.module.scss";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import styles from "./WinBlock.module.scss";

const WinBlock = ({
  hasPlayer2Won,
  onClick,
}: {
  hasPlayer2Won?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
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
      <SmallButton to="/game" onClick={onClick}>
        Play again
      </SmallButton>
    </div>
  );
};

export default WinBlock;
