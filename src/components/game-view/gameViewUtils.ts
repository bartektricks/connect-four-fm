import { MarkerPos } from "./useSetMarkerPos";
import { RefObject } from "react";

export function moveMarker(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  markerRef: RefObject<SVGSVGElement>,
  setLastMarkerPos: React.Dispatch<React.SetStateAction<MarkerPos>>
) {
  if (markerRef.current === null) return;

  const { width, left, top } = (
    e.target as HTMLButtonElement
  ).getBoundingClientRect();

  const markerWidth = markerRef.current.getBoundingClientRect().width;

  setLastMarkerPos({
    top: `${top - 40}px`,
    left: `${left + width / 2}px`,
    translateX: `${-(markerWidth / 2)}px`,
  });
}
