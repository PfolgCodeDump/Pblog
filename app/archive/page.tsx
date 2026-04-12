import type { Metadata } from "next";
import Link from "next/link";
import { getPostsGroupedByYear } from "../../lib/posts";
import { formatDate } from "../../lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Pblog";
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "个人博客，记录学习、生活和思考";

export const metadata: Metadata = {
  title: "归档",
  description: "按年份归档的文章列表",
  openGraph: {
    type: "website",
    title: `归档 | ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/archive`,
    siteName: siteName,
    images: [{ url: `${siteUrl}/favicon.png`, alt: siteName }],
  },
  twitter: {
    card: "summary",
    title: `归档 | ${siteName}`,
    description: siteDescription,
    images: [`${siteUrl}/favicon.png`],
  },
};

export default async function ArchivePage() {
  const postsByYear = getPostsGroupedByYear();
  const years = Object.keys(postsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );
  const currentYear = new Date().getFullYear().toString();

  // 如果有今年的文章，显示今年；否则显示最新的一年
  const targetYear = postsByYear[currentYear] ? currentYear : years[0];
  const posts = postsByYear[targetYear];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧年份导航 */}
        <aside className="lg:w-48 flex-shrink-0">
          <div className="card year-nav-card sticky top-30">
            <h2 className="text-lg font-semibold mb-3 text-primary">年份</h2>
            <nav className="space-y-1">
              {years.map((y) => (
                <Link
                  key={y}
                  href={`/archive/${y}`}
                  className={`block px-2 py-1.5 rounded transition-colors ${
                    y === targetYear
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-secondary"
                  }`}
                >
                  {y} 年 ({postsByYear[y].length})
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* 右侧文章列表 */}
        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-8 text-primary">
            {targetYear} 年文章
          </h1>

          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="card">
                <h3 className="text-lg font-semibold mb-2">
                  <Link
                    href={`/posts/${post.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-500 text-sm">
                  {formatDate(post.published)}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
