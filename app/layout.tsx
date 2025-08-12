
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "СК Содикс - Искусство строительства",
  description: "Профессиональные решения в области строительства нулевого цикла. Собственный парк спецтехники и десятки реализованных масштабных проектов по всей России.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
