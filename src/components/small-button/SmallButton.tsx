import type { PropsWithChildren } from "react";
import type { LinkProps } from "react-router-dom";
import type { Background } from "utils/getTextAndBackgroundColor";
import { Link } from "react-router-dom";
import typographyStyles from "styles/typography.module.scss";
import styles from "./SmallButton.module.scss";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";

type SmallButtonTypes = {
  backgroundColor?: Background;
} & Omit<PropsWithChildren<LinkProps>, "className" | "style">;

const SmallButton = ({
  children,
  backgroundColor,
  ...props
}: SmallButtonTypes) => {
  const style = {
    ...getTextAndBackgroundColor(backgroundColor || "purple"),
    "--text-color": "var(--white)",
  };

  return (
    <Link {...props} className={styles.smallButton} style={style}>
      <h2 className={typographyStyles.text}>{children}</h2>
    </Link>
  );
};

export default SmallButton;
