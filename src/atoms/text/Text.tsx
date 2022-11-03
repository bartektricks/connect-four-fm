import type { ElementType, PropsWithChildren } from "react";

import clsx from "clsx";
import styles from "./Text.module.scss";

type TextProps = {
  tag?: ElementType;
  type?: "large" | "medium" | "small" | "xsmall";
  isLowerCase?: boolean;
  className?: string;
};

const Text = ({
  tag: TagName = "h2",
  type = "xsmall",
  children,
  className,
  isLowerCase = false,
}: PropsWithChildren<TextProps>) => {
  const classes = clsx(
    {
      [styles.text]: true,
      [styles[type]]: type !== "xsmall",
      [styles.isLowerCase]: isLowerCase,
    },
    className
  );

  return <TagName className={classes}>{children}</TagName>;
};

export default Text;
