// Project: FunRadiusP
// Author: Pfolg <https://github.com/csy214-beep>
// Environment: TRAE
// LICENCE: <https://creativecommons.org/licenses/by-nc-sa/4.0>
// Repo: <https://github.com/PfolgCodeDump/FunRadiusP>

import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsGroupedByYear } from "../../../lib/posts";
import { formatDate } from "../../../lib/utils";

interface ArchiveYearPageProps {
  params: Promise<{ year: string }>;
}

export async function generateStaticParams() {
  const postsByYear = getPostsGroupedByYear();
  const years = Object.keys(postsByYear);
  return years.map((year) => ({
    year: year,
  }));
}

export default async function ArchiveYearPage({
  params,
}: ArchiveYearPageProps) {
  const { year } = await params;
  const postsByYear = getPostsGroupedByYear();
  const years = Object.keys(postsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  if (!postsByYear[year]) {
    notFound();
  }

  const posts = postsByYear[year];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧年份导航 */}
        <aside className="lg:w-48 flex-shrink-0">
          <div className="card sticky top-4">
            <h2 className="text-lg font-semibold mb-4 text-primary">年份</h2>
            <nav className="space-y-1">
              {years.map((y) => (
                <Link
                  key={y}
                  href={`/archive/${y}`}
                  className={`block px-3 py-2 rounded transition-colors ${
                    y === year
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
            {year} 年文章
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
