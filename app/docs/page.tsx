// Project: FunRadiusP
// Author: Pfolg <https://github.com/csy214-beep>
// Environment: TRAE
// LICENCE: <https://creativecommons.org/licenses/by-nc-sa/4.0>
// Repo: <https://github.com/PfolgCodeDump/FunRadiusP>

import type { Metadata } from "next";
import Link from "next/link";
import { getDocCollections } from "../../lib/docs";

export const metadata: Metadata = {
  title: "文档集",
  description: "技术文档和教程",
};

export default async function DocsPage() {
  const collections = getDocCollections();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1
        className="text-4xl font-bold mb-8"
        style={{ color: "var(--primary)" }}
      >
        文档集
      </h1>

      {collections.length === 0 ? (
        <div className="card text-center py-12">
          <p style={{ color: "var(--text)", opacity: 0.7 }}>暂无文档集</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/docs/${collection.id}`}
              className="card hover:translate-y-[-4px] transition-all duration-300 block"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{collection.icon}</span>
                <div className="flex-1 min-w-0">
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: "var(--primary)" }}
                  >
                    {collection.title}
                  </h2>
                  <p
                    className="text-sm mb-3"
                    style={{ color: "var(--text)", opacity: 0.8 }}
                  >
                    {collection.description}
                  </p>
                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "var(--text)", opacity: 0.6 }}
                  >
                    <span>{collection.docs.length} 篇文档</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
