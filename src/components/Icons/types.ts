import { SVGProps } from "react";

export interface IconSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  filled?: boolean;
  label?: string;
}
