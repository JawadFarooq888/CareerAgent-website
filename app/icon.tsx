import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#0f766e" />
        <path d="M21.5 10.2A8 8 0 1 0 21.5 21.8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M16.5 16h7m0 0-3-3m3 3-3 3"
          stroke="#99f6e4"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    { ...size }
  );
}
