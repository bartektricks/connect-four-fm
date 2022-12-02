import Button, { ButtonProps } from "components/button/Button";
import typographyStyles from "styles/typography.module.scss";
import roundedBoxStyles from "styles/roundedBox.module.scss";
import styles from "./MenuBlock.module.scss";
import getTextAndBackgroundColor from "utils/getTextAndBackgroundColor";
import type { StrictUnion, SVG } from "utils/types";

type MenuBlockProps = {
  buttons: ButtonProps[];
} & StrictUnion<{ title: string } | { icon: SVG }>;

const MenuBlock = ({ buttons, icon: Icon, title }: MenuBlockProps) => {
  return (
    <nav
      className={`${roundedBoxStyles.roundedBox} ${roundedBoxStyles.large} ${styles.menuBlock}`}
      style={getTextAndBackgroundColor("purple")}
    >
      {title && (
        <h2
          className={`${typographyStyles.text} ${typographyStyles.large} ${styles.title}`}
        >
          {title}
        </h2>
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
