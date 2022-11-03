import type { ComponentPropsWithoutRef } from "react";
import style from "./CircleButton.module.scss";

const CircleButton = (props: ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      {...props}
      className={`${style.circleButton} ${props.className || ""}`}
    >
      <svg
        className={style.circleButtonSVG}
        width="70px"
        height="75px"
        viewBox="0 0 70 75"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <circle
            className={style.circleButtonSVGShadow}
            fill="#000000"
            cx="35"
            cy="35"
            r="35"
          ></circle>
          <circle
            className={style.circleButtonSVGShadow}
            fill="#000000"
            cx="35"
            cy="40"
            r="35"
          ></circle>
          <circle fill="#FD6687" cx="35" cy="35" r="32"></circle>
          <polyline
            stroke="#FFFFFF"
            strokeWidth="3"
            points="20 34.5819497 30.2640104 44.84596 50.1099704 25"
          ></polyline>
        </g>
      </svg>
    </button>
  );
};

export default CircleButton;
