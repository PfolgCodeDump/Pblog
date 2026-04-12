import type { Metadata } from "next";
import Link from 'next/link';
import { getTags, getPostsByTag } from '../../lib/posts';
import { getTagSize } from "../../lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Pblog";
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "个人博客，记录学习、生活和思考";

export const metadata: Metadata = {
  title: "标签",
  description: "所有文章标签",
  openGraph: {
    type: "website",
    title: `标签 | ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/tags`,
    siteName: siteName,
    images: [{ url: `${siteUrl}/favicon.png`, alt: siteName }],
  },
  twitter: {
    card: "summary",
    title: `标签 | ${siteName}`,
    description: siteDescription,
    images: [`${siteUrl}/favicon.png`],
  },
};

export default function TagsPage() {
  const tags = getTags();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">标签云</h1>

      <div className="card p-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {tags.map((tag) => {
            const posts = getPostsByTag(tag);
            const sizeClass = getTagSize(posts.length);

            return (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className={`${sizeClass} font-medium text-primary hover:text-dark transition-colors`}
              >
                {tag} ({posts.length})
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}