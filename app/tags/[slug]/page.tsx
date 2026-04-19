// Project: FunRadiusP
// Author: Pfolg <https://github.com/csy214-beep>
// Environment: TRAE
// LICENCE: <https://creativecommons.org/licenses/by-nc-sa/4.0>
// Repo: <https://github.com/PfolgCodeDump/FunRadiusP>

import { notFound } from "next/navigation";
import Link from "next/link";
import { getTags, getPostsByTag } from "../../../lib/posts";
import { formatDate } from "../../../lib/utils";

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tags = getTags();
  return tags.map((tag) => ({
    slug: tag,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tags = getTags();
  const tag = tags.find((t) => t === slug);
  if (!tag) {
    console.log("Tag not found:", slug);
    console.log("Available tags:", tags);
    notFound();
  }

  const posts = getPostsByTag(tag);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">标签：{tag}</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">该标签暂无文章</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => {
            if (!post) return null;
            return (
              <div key={post.id} className="card">
                <h2 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/posts/${post.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span>{formatDate(post.published)}</span>
                  <span className="mx-2">·</span>
                  <Link
                    href={`/categories/${post.category}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.category}
                  </Link>
                </div>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t: string) => (
                    <Link
                      key={t}
                      href={`/tags/${t}`}
                      className="text-xs bg-secondary text-primary px-2 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
