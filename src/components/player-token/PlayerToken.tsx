import { ReactComponent as Player1TokenSmall } from "assets/counter-red-small.svg";
import { ReactComponent as Player1TokenLarge } from "assets/counter-red-large.svg";
import { ReactComponent as Player2TokenSmall } from "assets/counter-yellow-small.svg";
import { ReactComponent as Player2TokenLarge } from "assets/counter-yellow-large.svg";
import styles from "./PlayerToken.module.scss";

const PlayerToken = ({ isPlayer2 }: { isPlayer2: boolean }) => {
  const SmallToken = isPlayer2 ? Player2TokenSmall : Player1TokenSmall;
  const LargeToken = isPlayer2 ? Player2TokenLarge : Player1TokenLarge;

  return (
    <>
      <SmallToken className={`${styles.token} ${styles.small}`} />
      <LargeToken className={styles.token} />
    </>
  );
};

export default PlayerToken;
