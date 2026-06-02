import { useMemo } from "react";
import { Cloud, renderSimpleIcon } from "react-icon-cloud";

export const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

const renderIcon = (icon) =>
  renderSimpleIcon({
    icon,
    bgHex: "#080510",
    fallbackHex: "#ffffff",
    minContrastRatio: 2,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  });

export default function IconCloud({ icons = [], imageArray }) {
  const renderedIcons = useMemo(
    () => icons.filter(Boolean).map(renderIcon),
    [icons]
  );

  return (
    <Cloud {...cloudProps}>
      <>
        <>{renderedIcons}</>
        {imageArray?.length > 0 &&
          imageArray.map((image, index) => (
            <a key={index} href="#" onClick={(e) => e.preventDefault()}>
              <img height="42" width="42" alt="icon" src={image} />
            </a>
          ))}
      </>
    </Cloud>
  );
}
