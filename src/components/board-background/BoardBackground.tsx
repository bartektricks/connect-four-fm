import type { PropsWithChildren } from "react";
import type { Background } from "utils/getTextAndBackgroundColor";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import styles from "./BoardBackground.module.scss";

type BoardBackgroundProps = {
  backgroundColor?: Extract<Background, "dark-purple" | "purple">;
  subBackgroundColor?: Extract<Background, "dark-purple" | "yellow" | "pink">;
};

const BoardBackground = ({
  children,
  subBackgroundColor,
  backgroundColor,
}: PropsWithChildren<BoardBackgroundProps>) => {
  const backgroundStyles = getTextAndBackgroundColor(
    backgroundColor || "dark-purple"
  );
  const subBackgroundStyles = subBackgroundColor
    ? getTextAndBackgroundColor(subBackgroundColor)
    : {};

  return (
    <section className={styles.boardBackground} style={backgroundStyles}>
      <span className={styles.subBackground} style={subBackgroundStyles} />
      {children}
    </section>
  );
};

export default BoardBackground;
