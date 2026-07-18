import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Upskill - Interactive Developer Learning Portal",
  description: "An advanced, interactive full-stack and frontend engineering upskilling platform featuring interactive diagrams, simulators, and live playgrounds.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark selection:bg-[#22d3ee]/20 selection:text-white">
      <body className="min-h-full bg-[#09090b] text-[#f4f4f5] antialiased flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
