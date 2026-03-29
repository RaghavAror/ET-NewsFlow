import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ET NewsFlow",
  description: "Premium AI-powered news intelligence",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}