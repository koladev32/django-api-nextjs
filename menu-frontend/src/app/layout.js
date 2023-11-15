import { Inter } from "next/font/google";

import "./style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Restaurant Menu",
  description: "A simple UI to handle menus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="menu-container">{children}</main>
      </body>
    </html>
  );
}
