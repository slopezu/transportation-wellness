import "../../globals.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from "nextjs-toploader";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tu Aplicación',
  description: 'Descripción de tu aplicación',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextTopLoader
          color="#006BFF"
          crawlSpeed={300}
          showSpinner={false}
          shadow="none"
        />

        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}