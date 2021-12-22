import React from "react";
import { ONDC_COLORS } from "../colors";

export default function CrossSvg(props) {
  const {
    width = "15",
    height = "15",
    color = ONDC_COLORS.WHITE,
    onClick,
    style,
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      onClick={onClick}
    >
      <path
        d="M7.56754 8L4 4.43246L0.432462 8L0 7.56754L3.56754 4L0 0.432463L0.432462 -2.25027e-08L4 3.56754L7.56754 -2.25027e-08L8 0.432463L4.43246 4L8 7.56754L7.56754 8Z"
        fill={color}
      />
    </svg>
  );
}
