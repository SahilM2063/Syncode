import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { Header } from "./header";
import NextTopLaoder from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Syncode",
  description:
    "An application to help developers with their code by syncing with other developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={
          inter.className + "flex flex-col justify-between items-center h-screen"
        }
      >
        <Provider>
          <NextTopLaoder />
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
