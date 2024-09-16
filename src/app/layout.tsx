import type { Metadata } from "next";
import "./globals.css";

/// Import Poppins from Google Fonts
import { Poppins } from "next/font/google";
import MainIndexPage from "@/layout/MainIndexPage";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Wavee",
  description: "One Touch Music Player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <MainIndexPage>
          {children}
        </MainIndexPage>
      </body>
    </html>
  );
}
