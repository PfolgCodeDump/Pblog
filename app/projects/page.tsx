import type { Metadata } from "next";
import { markdownToHtml, getSpecPageContent } from "../../lib/markdown";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Pblog";
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "个人博客，记录学习、生活和思考";

export const metadata: Metadata = {
  title: "项目",
  description: "我的项目展示",
  openGraph: {
    type: "website",
    title: `项目 | ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/projects`,
    siteName: siteName,
    images: [{ url: `${siteUrl}/favicon.png`, alt: siteName }],
  },
  twitter: {
    card: "summary",
    title: `项目 | ${siteName}`,
    description: siteDescription,
    images: [`${siteUrl}/favicon.png`],
  },
};

export default async function ProjectsPage() {
  const content = await getSpecPageContent('projects');
  const htmlContent = await markdownToHtml(content);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">我的项目</h1>
      <div className="card p-6">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
}
