import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

import Providers from "./utils/providers";
import ToggleDarkMode from "@/components/ToggleDarkMode";
const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de países",
  description: "Uma lista de países criada com NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body className={nunitoSans.className}>
        <Providers>
          <main className="flex min-h-screen flex-col items-center bg-gray-100   dark:bg-slate-600">
            <nav className="flex h-16 w-full items-center justify-center bg-white py-10 dark:bg-slate-700">
              <section className="container flex items-center justify-between ">
                <Link href="/" className="flex items-center gap-3">
                  <Image src="/logo.svg" alt="" width={55} height={55} />
                  <h1 className="text-2xl font-bold">Lista de Países</h1>
                </Link>
                <ToggleDarkMode />
              </section>
            </nav>

            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
