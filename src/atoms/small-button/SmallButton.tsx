import Text from "atoms/text/Text";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import styles from "./SmallButton.module.scss";

const SmallButton = ({
  children,
  ...props
}: Omit<
  PropsWithChildren<ComponentPropsWithoutRef<"button">>,
  "className"
>) => {
  return (
    <button {...props} className={styles.smallButton}>
      <Text type="xsmall">{children}</Text>
    </button>
  );
};

export default SmallButton;
