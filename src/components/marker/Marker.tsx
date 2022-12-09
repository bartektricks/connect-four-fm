import { ReactComponent as MarkerPink } from "assets/marker-red.svg";
import { ReactComponent as MarkerYellow } from "assets/marker-yellow.svg";
import { ForwardedRef } from "react";
import { CSSProperties, forwardRef } from "react";

interface MarkerProps {
  isPlayers2Turn: boolean;
  className?: string;
  style?: CSSProperties;
}

const Marker = forwardRef(
  (
    { isPlayers2Turn, ...rest }: MarkerProps,
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    const MarkerTag = isPlayers2Turn ? MarkerYellow : MarkerPink;
    return <MarkerTag {...rest} ref={ref} />;
  }
);

Marker.displayName = "MarkerWithRef";

export default Marker;
