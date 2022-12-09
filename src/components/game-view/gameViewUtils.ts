import { RefObject } from "react";

export function moveMarker(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  markerRef: RefObject<SVGSVGElement>
) {
  if (markerRef.current === null) return;

  const { width, left, top } = (
    e.target as HTMLButtonElement
  ).getBoundingClientRect();

  const markerWidth = markerRef.current.getBoundingClientRect().width;

  markerRef.current.style.opacity = "1";
  markerRef.current.style.top = `${top - 40}px`;
  markerRef.current.style.transform = `translateX(-${markerWidth / 2}px)`;
  markerRef.current.style.left = `${left + width / 2}px`;
}
