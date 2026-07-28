import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const display = Lora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://forma-curso-online.luizagosling.chatgpt.site"),
  title: "Forno de Latão — Mentoria com Amanda Maciel",
  description: "Construa seu próprio Forno de Latão e aprenda a conduzir queimas artesanais de cerâmica com autonomia e segurança.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Forno de Latão — Mentoria com Amanda Maciel",
    description: "Da construção às primeiras queimas, com acompanhamento ao vivo.",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "Forno de Latão - Mentoria online com Amanda Maciel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forno de Latão — Mentoria com Amanda Maciel",
    description: "Da construção às primeiras queimas, com acompanhamento ao vivo.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
