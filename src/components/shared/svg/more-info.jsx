import React from "react";
import { ONDC_COLORS } from "../colors";

export default function MoreInfo(props) {
  const {
    color = ONDC_COLORS.ACCENTCOLOR,
    width = "5",
    height = "20",
    style,
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 5 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill={color} />
      <circle cx="2.5" cy="10.5" r="2.5" fill={color} />
      <circle cx="2.5" cy="18.5" r="2.5" fill={color} />
    </svg>
  );
}
