import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Spread · Inteligência on-chain para compliance e risco",
  description:
    "A Spread segue o dinheiro de golpe quando ele sai do Pix e vira cripto, e avisa a sua exchange antes do saque. Score proporcional, evidência verificável na Solana e canal direto com o banco da vítima.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Spread · O golpe deixa rastro. A gente segue.",
    description:
      "Rastreio on-chain de dinheiro de golpe, aviso no saque e relatórios de compliance para exchanges, fintechs e bancos.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#131b1f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
