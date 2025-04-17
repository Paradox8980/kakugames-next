import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";

const dosis = Dosis({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kakugames",
  description: "Kakugames",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${dosis.variable} antialiased flex justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
