// Project: FunRadiusP
// Author: Pfolg <https://github.com/csy214-beep>
// Environment: TRAE
// LICENCE: <https://creativecommons.org/licenses/by-nc-sa/4.0>
// Repo: <https://github.com/PfolgCodeDump/FunRadiusP>

import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import Live2DWidget from "../components/Live2DWidget";
import AnchorHandler from "../components/AnchorHandler";
import CodeBlockCopy from "../components/CodeBlockCopy";
import Particles from "../components/Particles";
import StructuredData from "../components/StructuredData";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "FunRadiusP";
const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "个人博客，记录学习、生活和思考";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME || "Your Name";
const defaultImage = `${siteUrl}/favicon.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ["博客", "个人博客", "技术博客", "学习", "生活", "思考"],
  authors: [{ name: authorName, url: siteUrl }],
  creator: authorName,
  publisher: authorName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: defaultImage,
        width: 512,
        height: 512,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [defaultImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const links = [
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css",
    integrity:
      "sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww",
    crossorigin: "anonymous",
  },
  {
    rel: "alternate",
    type: "application/rss+xml",
    title: "RSS Feed",
    href: "/rss.xml",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <StructuredData type="website" />
        {process.env.NEXT_PUBLIC_PARTICLES_ENABLED === "true" && <Particles />}
        <Header />
        <main
          className="container mx-auto px-4 py-8 relative z-10"
          style={{ paddingTop: "96px" }}
        >
          {children}
        </main>
        <Footer />
        <BackToTop />
        <Live2DWidget />
        <AnchorHandler />
        <CodeBlockCopy />
      </body>
    </html>
  );
}
