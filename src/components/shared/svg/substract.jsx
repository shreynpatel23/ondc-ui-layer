import React from "react";
import { ONDC_COLORS } from "../colors";

export default function SubstractSvg(props) {
  const { width = "10", height = "2", color = ONDC_COLORS.WHITE } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 2"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="13" height="2" fill={color} />
    </svg>
  );
}
