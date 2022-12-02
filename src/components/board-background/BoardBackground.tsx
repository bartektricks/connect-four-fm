import clsx from "clsx";
import type { PropsWithChildren } from "react";
import type { Background } from "utils/getTextAndBackgroundColor";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import styles from "./BoardBackground.module.scss";

type BoardBackgroundProps = {
  backgroundColor?: Extract<Background, "dark-purple" | "purple">;
  isAlignedTop?: boolean;
};

const BoardBackground = ({
  children,
  backgroundColor,
  isAlignedTop = false,
}: PropsWithChildren<BoardBackgroundProps>) => {
  const backgroundStyles = getTextAndBackgroundColor(
    backgroundColor || "dark-purple"
  );

  const classes = clsx({
    [styles.boardBackground]: true,
    [styles.isAlignedTop]: !!isAlignedTop,
  });

  return (
    <section className={classes} style={backgroundStyles}>
      {children}
    </section>
  );
};

export default BoardBackground;
