// Project: FunRadiusP
// Author: Pfolg <https://github.com/csy214-beep>
// Environment: TRAE
// LICENCE: <https://creativecommons.org/licenses/by-nc-sa/4.0>
// Repo: <https://github.com/PfolgCodeDump/FunRadiusP>

import Link from "next/link";
import { getPosts } from "../../../lib/posts";
import { paginate, formatDate } from "../../../lib/utils";
import Pagination from "../../../components/Pagination";
import SafeImage from "../../../components/SafeImage";

const PAGE_SIZE = 5;

export async function generateStaticParams() {
  const posts = getPosts();
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const currentPage = parseInt(page || "1");
  const posts = getPosts();
  const { items: paginatedPosts, totalPages } = paginate(
    posts,
    currentPage,
    PAGE_SIZE,
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1
        className="text-3xl font-bold mb-8"
        style={{ color: "var(--primary)" }}
      >
        文章列表
      </h1>

      <div className="space-y-6">
        {paginatedPosts.map((post) => {
          if (!post) return null;
          return (
            <div key={post.id} className="card flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/posts/${post.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div
                  className="flex items-center text-sm mb-4"
                  style={{ color: "var(--text)", opacity: 0.7 }}
                >
                  <span>{formatDate(post.published)}</span>
                  <span className="mx-2">·</span>
                  <Link
                    href={`/categories/${post.category}`}
                    className="hover:text-primary transition-colors"
                    style={{ color: "var(--text)", opacity: 0.7 }}
                  >
                    {post.category}
                  </Link>
                </div>
                <p
                  className="mb-4"
                  style={{ color: "var(--text)", opacity: 0.8 }}
                >
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="text-xs px-2 py-1 rounded-full hover:opacity-80 transition-colors"
                      style={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--text)",
                      }}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              {post.image && (
                <div className="md:w-48 flex-shrink-0">
                  <Link href={`/posts/${post.id}`} className="block">
                    <div
                      className="rounded-lg overflow-hidden shadow-md hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "var(--secondary)" }}
                    >
                      <SafeImage
                        src={post.image}
                        alt={post.title}
                        className="w-full h-32 object-cover"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/articles"
      />
    </div>
  );
}
