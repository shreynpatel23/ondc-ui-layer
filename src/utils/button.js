import { ONDC_COLORS } from "../components/shared/colors";

export const buttonSize = {
  small: "small",
  medium: "medium",
  large: "large",
};

export const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
};

export function getButtonStyle(type) {
  switch (type) {
    case buttonTypes.primary:
      return {
        backgroundColor: ONDC_COLORS.ACCENTCOLOR,
        border: 0,
        transition: "all 0.3s",
        buttonTextColor: ONDC_COLORS.WHITE,
      };

    case buttonTypes.secondary:
      return {
        backgroundColor: `rgba(${ONDC_COLORS.PLACEHOLDERTEXT}, 0.15)`,
        border: `1px solid ${ONDC_COLORS.PLACEHOLDERTEXT}`,
        transition: "all 0.3s",
        buttonTextColor: ONDC_COLORS.SECONDARYCOLOR,
      };

    case buttonTypes.success:
      return {
        backgroundColor: ONDC_COLORS.SUCCESS,
        border: 0,
        transition: "all 0.3s",
        buttonTextColor: ONDC_COLORS.WHITE,
      };

    case buttonTypes.danger:
      return {
        backgroundColor: ONDC_COLORS.ERROR,
        border: 0,
        transition: "all 0.3s",
        buttonTextColor: ONDC_COLORS.WHITE,
      };
  }
}
