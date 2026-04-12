import type { Metadata } from "next";
import Link from 'next/link';
import { getCategories, getPostsByCategory } from '../../lib/posts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Pblog";
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "个人博客，记录学习、生活和思考";

export const metadata: Metadata = {
  title: "分类",
  description: "所有文章分类",
  openGraph: {
    type: "website",
    title: `分类 | ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/categories`,
    siteName: siteName,
    images: [{ url: `${siteUrl}/favicon.png`, alt: siteName }],
  },
  twitter: {
    card: "summary",
    title: `分类 | ${siteName}`,
    description: siteDescription,
    images: [`${siteUrl}/favicon.png`],
  },
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">分类</h1>
      
      <div className="card overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left">分类</th>
              <th className="py-3 px-4 text-right">文章数量</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              const posts = getPostsByCategory(category);
              return (
                <tr key={category} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <Link 
                      href={`/categories/${category}`} 
                      className="text-primary hover:underline"
                    >
                      {category}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-right">{posts.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}