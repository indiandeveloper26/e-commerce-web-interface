import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./componet/header";
import ProviderWrapper from "./Redux/provider";
import { ThemeProvider } from "./Redux/contextapi";
import { ToastContainer } from "react-toastify";
import Footer from "./componet/footer";
import GlobalClickListener from "./componet/GlobalClickListener";
import { Toaster } from "react-hot-toast";
import ProgressBar from "./componet/ProgressBar";


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
        <ProgressBar />
        <ProviderWrapper>
          <ThemeProvider>


            <Header />

            <main>
              {children}
            </main>
            <Footer />
            <ToastContainer />



            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
              }}
            />


            {/* <GlobalClickListener /> */}

          </ThemeProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}