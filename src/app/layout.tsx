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
  title: "Spread · Travel Rule e antifraude para ativos virtuais",
  description:
    "O Travel Rule da Res. BCB 520 pronto para a sua instituição: troca das informações do art. 44 com qualquer contraparte, checagem na lista do BCB e auditoria. E a inteligência da Spread para reter o saque do dinheiro de golpe.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Spread · O golpe deixa rastro. A gente segue.",
    description:
      "Travel Rule para a Res. BCB 520 e antifraude que retém o saque do dinheiro de golpe, para exchanges, corretoras e bancos.",
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
