import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//_app.js 
import '@fortawesome/fontawesome-svg-core/styles.css'; //importing font awesome css
import { config } from '@fortawesome/fontawesome-svg-core';
import { SessionProvider } from "next-auth/react";
import { NextAuthProvider } from "@/components/providers/providers";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


const inter = Inter({ subsets: ["latin"] });
const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={`${inter.className}`}>
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
