// Project: FunRadiusP
// Author: Pfolg <https://github.com/csy214-beep>
// Environment: TRAE
// LICENCE: <https://creativecommons.org/licenses/by-nc-sa/4.0>
// Repo: <https://github.com/PfolgCodeDump/FunRadiusP>

import type { Metadata } from "next";
import { markdownToHtml, getSpecPageContent } from "../../lib/markdown";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "FunRadiusP";
const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "个人博客，记录学习、生活和思考";

export const metadata: Metadata = {
  title: "关于",
  description: "关于我，个人介绍",
  openGraph: {
    type: "website",
    title: `关于 | ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/about`,
    siteName: siteName,
    images: [{ url: `${siteUrl}/favicon.png`, alt: siteName }],
  },
  twitter: {
    card: "summary",
    title: `关于 | ${siteName}`,
    description: siteDescription,
    images: [`${siteUrl}/favicon.png`],
  },
};

export default async function AboutPage() {
  const content = await getSpecPageContent("about");
  const htmlContent = await markdownToHtml(content);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">关于我</h1>
      <div className="card p-6">
        <div
          className="prose max-w-none"
          style={{ display: "block", margin: "0 auto", textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
