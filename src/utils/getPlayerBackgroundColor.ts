import getTextAndBackgroundColor from "./getTextAndBackgroundColor";

export default function getPlayerBackgroundColor(isPlayer2: boolean) {
  return getTextAndBackgroundColor(isPlayer2 ? "yellow" : "pink");
}
