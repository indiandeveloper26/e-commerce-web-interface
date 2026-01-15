import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./componet/header";
import ProviderWrapper from "./Redux/provider";
import { ThemeProvider } from "./Redux/contextapi";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProviderWrapper>
          <ThemeProvider>

            <Header />

            <main>
              {children}
            </main>
            <ToastContainer />

          </ThemeProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}