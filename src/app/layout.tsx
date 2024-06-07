import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css"
import Header from "@/components/header";
import mergeClass from "@/utils/class-name";
import { ThemeProvider } from "@/components/theme-provider";
import LocationProvider from "@/contexts/location-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Citizen Connect",
    default: "Citizen Connect",
  },
  description: "Memberikan informasi publik sesuai lokasi anda",
  manifest: "/manifest.webmanifest",
  authors: {
    name: "Nur Fadli Alamsyah Nasir",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  other: {
    "dicoding:email" : "palpal.tech@gmail.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={
        mergeClass(
          `${inter.className} min-h-screen box-border text-slate-500 bg-gray-50`,
          "dark:text-slate-400 dark:bg-slate-900"
        )
      }>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <LocationProvider>
            <Header />
            {children}
          </LocationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
