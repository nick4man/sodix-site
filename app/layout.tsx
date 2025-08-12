
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sodix",
  description: "Sodix - Professional solutions in zero-cycle construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
