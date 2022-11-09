import type { CSSProperties } from "react";

const whiteTextBackgrounds = ["pink", "purple"];

export type Background = "white" | "yellow" | "pink" | "purple" | "dark-purple";

export default function getTextAndBackgroundColor(backgroundColor: Background) {
  return {
    "--background-color": `var(--${backgroundColor})`,
    "--text-color": `var(--${
      whiteTextBackgrounds.includes(backgroundColor) ? "white" : "black"
    })`,
  } as CSSProperties;
}
