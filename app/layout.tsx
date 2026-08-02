import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const siteUrl = "https://mentoria.kuaraceramicas.com.br";
const socialImage = "/assets/hero-desktop-coletivo.jpg?v=20260730";

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
  metadataBase: new URL(siteUrl),
  title: "Forno de Latão • Mentoria online com Amanda Maciel",
  description: "Construa seu próprio Forno de Latão e aprenda a conduzir queimas artesanais de cerâmica com autonomia e segurança.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/assets/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/assets/favicon-32.png",
    apple: "/assets/apple-touch-icon.png",
  },
  openGraph: {
    url: "/",
    title: "Forno de Latão • Mentoria online com Amanda Maciel",
    description: "Da construção às primeiras queimas, com acompanhamento ao vivo.",
    images: [{ url: socialImage, width: 2400, height: 1600, alt: "Peças de cerâmica sendo colocadas no Forno de Latão" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forno de Latão • Mentoria online com Amanda Maciel",
    description: "Da construção às primeiras queimas, com acompanhamento ao vivo.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
