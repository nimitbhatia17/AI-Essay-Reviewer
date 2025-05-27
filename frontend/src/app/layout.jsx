import { Geist, Geist_Mono } from "next/font/google";
import CustomProvider from "@/redux/provider";
import Navbar from "@/app/components/common/Navbar";
import { Setup } from "@/app/components/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Essay Reviewer",
  description:
    "The next generation of essay review and college applications...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue`}
      >
        <CustomProvider>
          <Setup />
          <Navbar />
          {children}
        </CustomProvider>
      </body>
    </html>
  );
}
