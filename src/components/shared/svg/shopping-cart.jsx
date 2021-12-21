import React from "react";
import { ONDC_COLORS } from "../colors";

export default function ShoppingCart(props) {
  const {
    color = ONDC_COLORS.ACCENTCOLOR,
    width = "20",
    height = "20",
    style,
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.77269 17.7665C6.75121 17.7665 5.92203 18.5957 5.92203 19.6171C5.92203 20.6386 6.75121 21.4678 7.77269 21.4678C8.79417 21.4678 9.62335 20.6386 9.62335 19.6171C9.62335 18.5957 8.79417 17.7665 7.77269 17.7665ZM7.77269 18.5067C8.38554 18.5067 8.88309 19.0043 8.88309 19.6171C8.88309 20.23 8.38554 20.7275 7.77269 20.7275C7.15983 20.7275 6.66229 20.23 6.66229 19.6171C6.66229 19.0043 7.15983 18.5067 7.77269 18.5067Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1753 17.7665C14.1538 17.7665 13.3247 18.5957 13.3247 19.6171C13.3247 20.6386 14.1538 21.4678 15.1753 21.4678C16.1968 21.4678 17.026 20.6386 17.026 19.6171C17.026 18.5957 16.1968 17.7665 15.1753 17.7665ZM15.1753 18.5067C15.7882 18.5067 16.2857 19.0043 16.2857 19.6171C16.2857 20.23 15.7882 20.7275 15.1753 20.7275C14.5625 20.7275 14.0649 20.23 14.0649 19.6171C14.0649 19.0043 14.5625 18.5067 15.1753 18.5067Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.97827 14.0651H15.1753C15.3796 14.0651 15.5455 13.8992 15.5455 13.695C15.5455 13.4907 15.3796 13.3248 15.1753 13.3248H7.3391C7.41858 13.0998 7.4242 12.8536 7.35199 12.6234L4.56411 3.70132H19.5048C19.8531 3.70132 20.1814 3.86491 20.3913 4.14286C20.6011 4.42128 20.6682 4.78181 20.5727 5.11675C19.9527 7.28564 18.957 10.7707 18.4573 12.5194C18.3212 12.9961 17.8854 13.3248 17.3899 13.3248H16.6559C16.4517 13.3248 16.2858 13.4907 16.2858 13.6949C16.2858 13.8991 16.4517 14.065 16.6559 14.065H17.3899C18.2161 14.065 18.9421 13.5173 19.1691 12.7229C19.6688 10.9741 20.6644 7.48906 21.2844 5.3203C21.444 4.7618 21.3321 4.16101 20.9823 3.69718C20.6327 3.23352 20.0856 2.96106 19.5047 2.96106H4.3327L3.6506 0.779097C3.50585 0.315776 3.07658 0 2.59093 0H1.1104C0.497542 0 0 0.497542 0 1.1104C0 1.72325 0.497542 2.22079 1.1104 2.22079H1.77448L5.0989 12.8586L3.81862 15.4191C3.64645 15.7633 3.66462 16.1723 3.8672 16.4994C4.06962 16.8271 4.42671 17.0262 4.81169 17.0262H18.1365C18.7493 17.0262 19.2468 16.5287 19.2468 15.9158C19.2468 15.303 18.7493 14.8054 18.1365 14.8054H6.60821L6.97827 14.0651ZM2.4009 1.74415C2.3553 1.59163 2.21402 1.48059 2.04663 1.48059H1.11022C0.905987 1.48059 0.740087 1.31469 0.740087 1.11046C0.740087 0.906228 0.905987 0.740328 1.11022 0.740328H2.59075C2.75251 0.740328 2.89578 0.84542 2.94386 1.00008L6.64518 12.8443C6.6741 12.9359 6.66584 13.0347 6.62304 13.1201L5.67838 15.0101C5.62104 15.1248 5.62699 15.2609 5.69424 15.3701C5.76199 15.4794 5.8808 15.5456 6.00935 15.5456H18.1361C18.3404 15.5456 18.5063 15.7115 18.5063 15.9158C18.5063 16.12 18.3404 16.2859 18.1361 16.2859H4.81139C4.683 16.2859 4.56419 16.2196 4.49645 16.1104C4.42903 16.0012 4.42308 15.865 4.48042 15.7504L5.82745 13.0562C5.87041 12.9706 5.87817 12.8714 5.84959 12.7804L2.4009 1.74415Z"
        fill={color}
      />
    </svg>
  );
}
