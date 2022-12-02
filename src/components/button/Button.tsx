import type { CSSProperties } from "react";
import type { LinkProps } from "react-router-dom";
import clsx from "clsx";
import { Link } from "react-router-dom";

import getTextAndBackgroundColor, {
  Background,
} from "utils/getTextAndBackgroundColor";
import roundedBoxStyles from "styles/roundedBox.module.scss";
import typographyStyles from "styles/typography.module.scss";
import styles from "./Button.module.scss";
import { SVG } from "utils/types";

export type ButtonProps = {
  backgroundColor?: Background;
  style?: CSSProperties;
  isAlignedLeft?: boolean;
  icon?: SVG;
  children: string;
} & LinkProps;

const Button = ({
  children,
  backgroundColor = "white",
  isAlignedLeft,
  icon: IconTag,
  ...props
}: ButtonProps) => {
  const classes = clsx({
    [roundedBoxStyles.roundedBox]: true,
    [roundedBoxStyles.isHoverable]: true,
    [styles.button]: true,
    [styles.isAlignedLeft]: isAlignedLeft,
    [styles.hasIcon]: !!IconTag,
  });

  const style = {
    ...(props?.style || {}),
    ...getTextAndBackgroundColor(backgroundColor),
  };

  return (
    <Link {...props} className={classes} style={style}>
      <span className={`${typographyStyles.text} ${typographyStyles.medium}`}>
        {children}
      </span>
      {IconTag && <IconTag />}
    </Link>
  );
};

export default Button;
