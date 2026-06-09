import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import Navbar from "@/component/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Navbar />
        <main className="container mt-4">{children}</main>
      </body>
    </html>
  );
}
