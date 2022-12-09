import { RefObject, useEffect } from "react";

export default function useResetMarkerOpacity(
  markerRef: RefObject<SVGSVGElement>
) {
  useEffect(() => {
    const resetMarkerOpacity = () => {
      if (!markerRef.current) return;
      markerRef.current.style.opacity = "0";
    };

    window.addEventListener("resize", resetMarkerOpacity);

    return () => {
      window.removeEventListener("resize", resetMarkerOpacity);
    };
  }, [markerRef.current]);
}
