import React from "react";
import { ONDC_COLORS } from "../colors";

export default function AddSvg(props) {
  const { width = "10", height = "10", color = ONDC_COLORS.WHITE } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 6V0.5H5.5V6H0V8H5.5V13.5H7.5V8H13V6H7.5Z"
        fill={color}
      />
    </svg>
  );
}
