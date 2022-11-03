import Button, { ButtonProps } from "atoms/button/Button";
import Text from "atoms/text/Text";
import sharedStyles from "styles/roundedBox.module.scss";
import styles from "./MenuBlock.module.scss";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import type { ElementType } from "react";
import type { StrictUnion } from "utils/types";

type MenuBlockProps = {
  buttons: ButtonProps[];
} & StrictUnion<{ title: string } | { icon: ElementType }>;

const MenuBlock = ({ buttons, icon: Icon, title }: MenuBlockProps) => {
  return (
    <nav
      className={`${sharedStyles.roundedBox} ${sharedStyles.large} ${styles.menuBlock}`}
      style={getTextAndBackgroundColor("purple")}
    >
      {title && (
        <Text className={styles.title} type="large">
          {title}
        </Text>
      )}
      {Icon && <Icon className={styles.icon} />}
      <ul className={styles.list}>
        {buttons.map((button) => (
          <li key={button.children}>
            <Button {...button} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuBlock;
