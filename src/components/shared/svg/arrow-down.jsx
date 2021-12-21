import React from "react";
import { ONDC_COLORS } from "../colors";

export default function ArrowDown(props) {
  const { width = "8", height = "4", color = ONDC_COLORS.ACCENTCOLOR } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.67371 4C3.62706 4 3.55708 3.97134 3.51043 3.94267L0.244772 0.502955C0.151468 0.388298 0.128141 0.216312 0.221446 0.101655C0.31475 -0.0130022 0.454707 -0.0416665 0.548012 0.0729907L3.67371 3.34072L6.77608 0.0729907C6.86939 -0.0416665 7.00935 -0.0130022 7.10265 0.101655C7.19595 0.216312 7.17263 0.416962 7.07932 0.502955L3.81367 3.94267C3.79034 3.97134 3.72036 4 3.67371 4Z"
        fill={color}
      />
    </svg>
  );
}
