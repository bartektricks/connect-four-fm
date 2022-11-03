import clsx from "clsx";
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
} from "react";

import getTextAndBackgroundColor, {
  Background,
} from "utils/getTextAndBackgroundColor";
import roundedBoxStyles from "styles/roundedBox.module.scss";
import Text from "atoms/text/Text";
import styles from "./Button.module.scss";

export type ButtonProps = {
  backgroundColor?: Background;
  style?: CSSProperties;
  isAlignedLeft?: boolean;
  icon?: ElementType;
  children: string;
} & ComponentPropsWithoutRef<"button">;

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
    <button {...props} className={classes} style={style}>
      <Text type="medium" tag="div">
        {children}
      </Text>
      {IconTag && <IconTag />}
    </button>
  );
};

export default Button;
