import type { PropsWithChildren } from "react";

import clsx from "clsx";
import styles from "./Text.module.scss";

type TextProps = {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  type?: "large" | "medium" | "small" | "xsmall";
  className?: string;
};

const Text = ({
  tag: TagName = "h2",
  type = "xsmall",
  children,
  className,
}: PropsWithChildren<TextProps>) => {
  const classes = clsx(
    {
      [styles.text]: true,
      [styles[type]]: type !== "xsmall",
    },
    className
  );

  return <TagName className={classes}>{children}</TagName>;
};

export default Text;
