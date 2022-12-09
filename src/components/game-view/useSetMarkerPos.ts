import { useState, useEffect } from "react";

export type MarkerPos = {
  top: string;
  left: string;
  translateX: string;
};

export default function useSetMarkerPos(
  markerRef: React.RefObject<SVGSVGElement>
) {
  const [lastMarkerPos, setLastMarkerPos] = useState<MarkerPos>({
    top: "0",
    left: "50%",
    translateX: "0",
  });

  useEffect(() => {
    if (!markerRef.current) {
      return;
    }

    const { top, left, translateX } = lastMarkerPos;

    if (top !== "0") {
      markerRef.current.style.opacity = "1";
    }

    markerRef.current.style.top = `${top}`;
    markerRef.current.style.transform = `translateX(${translateX})`;
    markerRef.current.style.left = `${left}`;
  });

  return setLastMarkerPos;
}
