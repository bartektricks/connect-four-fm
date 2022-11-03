import SmallButton from "components/small-button/SmallButton";
import Text from "components/text/Text";
import sharedStyles from "styles/roundedBox.module.scss";
import styles from "./WinBlock.module.scss";

const WinBlock = ({ hasPlayer2Won }: { hasPlayer2Won?: boolean }) => {
  return (
    <div className={`${sharedStyles.roundedBox} ${styles.winBlock}`}>
      <Text tag="span" type="xsmall">
        Player {hasPlayer2Won ? 2 : 1}
      </Text>
      <Text type="large">Wins</Text>
      <SmallButton
        onClick={() => {
          //! TODO restart game
          alert("todo");
        }}
      >
        Play again
      </SmallButton>
    </div>
  );
};

export default WinBlock;
