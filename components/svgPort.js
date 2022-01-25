import * as React from "react"

const SvgPort = ({fill, desc, border}) => {
  if(fill === '#null') {
    return (
      <span>nl</span>
    )
  } else {
    return (
      <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 4334.92 4334.92"
  >
    <title>{desc}</title>
    <g id="Camada_x0020_1">
      <g id="_2202454032320">
        <path style={{
            fill: `${border}`
          }} d="M-.01 4334.93h4334.92V.01H-.01z" />
        <path
          d="M829.72 1201.77v2372.64l313.97.71v-459.39c0-37.93-15.44-126.57 16.19-151.05l252.08-.19.95 607.08 322.74 3.68.09-610.84 270.4-2.37 1.17 613.04h323.12l-2.71-611.31 270.45-1.58 1.12 612.89 322.7-3.51.08-606.28 252.95-.61c13.4 10.37 17.91.88 16.79 66.02l-.6 544.38 313.97-.67V1201.77l-532.37-.07-.49-439.69H1362.08l-.06 438.74-532.3 1.02z"
          style={{
            fill: `${fill}`,
          }}
        />
      </g>
    </g>
  </svg>
    )
  }
}

export default SvgPort
