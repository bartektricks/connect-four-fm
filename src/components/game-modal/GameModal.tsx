import { createPortal } from "react-dom";
import { useGetGameContext } from "context/useGameContext";
import MenuBlock from "components/menu-block/MenuBlock";
import styles from "./GameModal.module.scss";
import { useEffect } from "react";

type GameModalProps = {
  isOpen: boolean;
  handleSetIsOpen: (val: false) => void;
};

const GameModal = ({ isOpen, handleSetIsOpen }: GameModalProps) => {
  const { setRestartGame } = useGetGameContext();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }

    return () => {
      document.body.classList.remove("scroll-lock");
    };
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <div className={styles.gameModal}>
          <MenuBlock
            title="Pause"
            buttons={[
              {
                to: "/game",
                children: "Continue game",
                backgroundColor: "white",
                onClick: (e) => {
                  e.preventDefault();
                  handleSetIsOpen(false);
                },
              },
              {
                to: "/game",
                children: "Restart",
                backgroundColor: "white",
                onClick: (e) => {
                  e.preventDefault();
                  setRestartGame();
                  handleSetIsOpen(false);
                },
              },
              {
                to: "/",
                children: "Quit game",
                backgroundColor: "pink",
              },
            ]}
          />
        </div>,
        document.body
      )
    : null;
};

export default GameModal;
