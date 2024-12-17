import type { CSSProperties, HTMLAttributes } from "react";
import * as Icons from "@/assets/svg";

interface SvgProps extends HTMLAttributes<SVGElement> {
  type: keyof typeof Icons;
  fill?: string;
  stroke?: string;
  style?: CSSProperties;
  size?: string;
  width?: string;
  height?: string;
}

const Svg = ({ type, fill, stroke, style, size, ...rest }: SvgProps) => {
  const SvgIcon = Icons[type];

  const svgProps = {
    style,
    ...(size ? { width: size, height: size } : {}),
    ...(fill ? { fill } : {}),
    ...(stroke ? { stroke } : {}),
  };

  return <SvgIcon {...svgProps} {...rest} />;
};

export default Svg;
