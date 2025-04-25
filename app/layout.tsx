import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

let title = "ai-cover – Générateur de lettres de motivation IA";
let description =
  "Créez en quelques secondes des lettres de motivation personnalisées en streaming grâce aux modèles Mixtral 8x7B et Llama 3.1 8B via Together AI.";
let url = "https://ai-cover-p3rj.vercel.app/";
let ogimage = "g";
let sitename = "https://ai-cover-p3rj.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <PlausibleProvider domain="twitterbio.io" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
