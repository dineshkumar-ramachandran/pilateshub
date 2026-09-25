import { ImageResponse } from "next/og";

export const alt = "PilatesHub · Pilates studio in HSR Layout, Bengaluru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fdfbf7",
          color: "#1f1a12",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#a9832a" }}>
          PILATES STUDIO · BENGALURU
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 130, lineHeight: 1, fontStyle: "italic" }}>Move with</div>
          <div style={{ fontSize: 130, lineHeight: 1, color: "#a9832a", fontStyle: "italic" }}>
            intention.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span>PilatesHub</span>
          <span style={{ color: "#7d7159" }}>pilateshub.in</span>
        </div>
      </div>
    ),
    size
  );
}
