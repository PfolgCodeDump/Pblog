import type { Metadata } from "next";
import Link from "next/link";
import { getDemos } from "../../lib/demos";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Pblog";
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "个人博客，记录学习、生活和思考";

export const metadata: Metadata = {
  title: "Demo",
  description: "有趣的Demo展示",
  openGraph: {
    type: "website",
    title: `Demo | ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/demos`,
    siteName: siteName,
    images: [{ url: `${siteUrl}/favicon.png`, alt: siteName }],
  },
  twitter: {
    card: "summary",
    title: `Demo | ${siteName}`,
    description: siteDescription,
    images: [`${siteUrl}/favicon.png`],
  },
};

export default async function DemosPage() {
  const demos = getDemos();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">Demo 展示</h1>

      {demos.length === 0 ? (
        <div className="card p-6 text-center">
          <p className="text-gray-500">暂无 demo</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {demos.map((demo) => (
            <Link key={demo.id} href={`/demos/${demo.id}`} className="block">
              <div className="card p-6 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  {demo.title}
                </h2>
                <p className="text-gray-600 mb-4">{demo.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{demo.author}</span>
                  <span>{new Date(demo.date).toLocaleDateString("zh-CN")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
