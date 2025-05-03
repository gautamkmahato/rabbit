import "./globals.css";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import GitHubContextProvider from "./context/githubContext";
import { Providers } from "./context/Providers";

// Load fonts with CSS variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "GitHub Code Review SaaS",
  description: "AI-powered PR review tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
      <body className="font-roboto antialiased">
        <Providers>
          <GitHubContextProvider>
            {children}
          </GitHubContextProvider>
        </Providers>
      </body>
    </html>
  );
}
