import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//_app.js 
import '@fortawesome/fontawesome-svg-core/styles.css'; //importing font awesome css
import { config } from '@fortawesome/fontawesome-svg-core';
import { NextAuthProvider } from "@/components/providers/NextauthclientProvider";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


const inter = Inter({ subsets: ["latin"] });
const APP_NAME = "WareLink App";
const APP_DEFAULT_TITLE = "WareLink App";
const APP_TITLE_TEMPLATE = "WareLink ";
const APP_DESCRIPTION = "WareHouse Management System";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
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
