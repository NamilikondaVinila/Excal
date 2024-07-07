import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/contexts/UserProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Calculator",
  description: "Expense calculator for individuals to keep track of expenses",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Navbar/>
            <div className="container min-h-[83vh]">
              {children}
            </div>
          <Footer/>
        </UserProvider>
      </body>
    </html>
  );
}
