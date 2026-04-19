// Project: FunRadiusP
// Author: Pfolg <https://github.com/csy214-beep>
// Environment: TRAE
// LICENCE: <https://creativecommons.org/licenses/by-nc-sa/4.0>
// Repo: <https://github.com/PfolgCodeDump/FunRadiusP>

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getDoc,
  getDocCollection,
  getDocCollections,
  getPrevNextDocs,
  Doc,
  DocCollection,
} from "../../../../lib/docs";
import { markdownToHtml } from "../../../../lib/markdown";
import TableOfContents from "../../../../components/TableOfContents";
import GiscusComments from "../../../../components/GiscusComments";

interface DocPageProps {
  params: Promise<{ collection: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { collection, slug } = await params;
  const docId = decodeURIComponent(slug);
  const doc = getDoc(collection, docId);

  if (!doc) {
    return {
      title: "文档未找到",
    };
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export async function generateStaticParams() {
  const collections = getDocCollections();
  const params: { collection: string; slug: string }[] = [];

  collections.forEach((collection) => {
    collection.docs.forEach((doc) => {
      params.push({
        collection: collection.id,
        slug: encodeURIComponent(doc.id),
      });
    });
  });

  return params;
}

function DocSidebar({
  collection,
  currentDocId,
}: {
  collection: DocCollection;
  currentDocId: string;
}) {
  return (
    <div className="card">
      <Link
        href={`/docs/${collection.id}`}
        className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        style={{ color: "var(--primary)" }}
      >
        <span className="text-2xl">{collection.icon}</span>
        <span className="font-bold">{collection.title}</span>
      </Link>
      <div className="space-y-1 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {collection.docs.map((doc, index) => (
          <Link
            key={doc.id}
            href={`/docs/${collection.id}/${encodeURIComponent(doc.id)}`}
            className={`block px-3 py-2 rounded-md text-sm transition-all ${
              doc.id === currentDocId
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-primary/5"
            }`}
            style={{
              color: doc.id === currentDocId ? "var(--primary)" : "var(--text)",
            }}
          >
            <span className="mr-2 opacity-60">{index + 1}.</span>
            <span className="truncate">{doc.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function DocPage({ params }: DocPageProps) {
  const { collection, slug } = await params;
  const docId = decodeURIComponent(slug);
  const doc = getDoc(collection, docId);
  if (!doc) notFound();

  const docCollection = getDocCollection(collection);
  if (!docCollection) notFound();

  const { prev, next } = getPrevNextDocs(docCollection, docId);
  const htmlContent = await markdownToHtml(doc.content, {
    type: "doc",
    id: docId,
    collection: collection,
  });

  const isAutoHideEnabled =
    process.env.NEXT_PUBLIC_HEADER_AUTO_HIDE_ENABLED !== "false";

  return (
    <div className={isAutoHideEnabled ? "w-full" : "w-full pt-20"}>
      <div className="flex flex-col lg:flex-row">
        {/* 左侧 - 文件目录 - 靠左停靠 */}
        <div className="lg:w-72 flex-shrink-0 hidden lg:block">
          {isAutoHideEnabled ? (
            <div className="sticky top-4 pl-4">
              <DocSidebar collection={docCollection} currentDocId={docId} />
            </div>
          ) : (
            <div className="sticky top-24 pl-4">
              <DocSidebar collection={docCollection} currentDocId={docId} />
            </div>
          )}
        </div>

        {/* 中间 - 内容 - 扩大宽度 */}
        <div className="flex-1 min-w-0 px-4 lg:px-8">
          <Link
            href={`/docs/${collection}`}
            className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity lg:hidden"
            style={{ color: "var(--primary)" }}
          >
            <span>←</span>
            <span>返回 {docCollection.title}</span>
          </Link>

          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--primary)" }}
          >
            {doc.title}
          </h1>

          {doc.description && (
            <p
              className="text-xl mb-8"
              style={{ color: "var(--text)", opacity: 0.8 }}
            >
              {doc.description}
            </p>
          )}

          <div
            className="prose max-w-none mb-12 post-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* 上一篇/下一篇 */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="text-left">
              {prev && (
                <Link
                  href={`/docs/${collection}/${encodeURIComponent(prev.id)}`}
                  className="block p-4 rounded-lg card hover:translate-x-1 transition-all"
                >
                  <div
                    className="text-sm mb-1"
                    style={{ color: "var(--text)", opacity: 0.6 }}
                  >
                    上一篇
                  </div>
                  <div
                    className="font-semibold"
                    style={{ color: "var(--primary)" }}
                  >
                    {prev.title}
                  </div>
                </Link>
              )}
            </div>
            <div className="text-right">
              {next && (
                <Link
                  href={`/docs/${collection}/${encodeURIComponent(next.id)}`}
                  className="block p-4 rounded-lg card hover:-translate-x-1 transition-all"
                >
                  <div
                    className="text-sm mb-1"
                    style={{ color: "var(--text)", opacity: 0.6 }}
                  >
                    下一篇
                  </div>
                  <div
                    className="font-semibold"
                    style={{ color: "var(--primary)" }}
                  >
                    {next.title}
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* 评论区 */}
          <GiscusComments />
        </div>

        {/* 右侧 - 文章目录 - 靠右停靠 */}
        <div className="lg:w-72 flex-shrink-0 hidden xl:block">
          {isAutoHideEnabled ? (
            <div className="sticky top-4 pr-4">
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">目录</h3>
                <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <TableOfContents content={htmlContent} />
                </div>
              </div>
            </div>
          ) : (
            <div className="sticky top-24 pr-4">
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">目录</h3>
                <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
                  <TableOfContents content={htmlContent} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
