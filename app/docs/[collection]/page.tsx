import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getDocCollection, getDocCollections } from "../../../lib/docs";

interface CollectionPageProps {
  params: Promise<{ collection: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { collection } = await params;
  const docCollection = getDocCollection(collection);

  if (!docCollection) {
    return {
      title: "文档集未找到",
    };
  }

  return {
    title: docCollection.title,
    description: docCollection.description,
  };
}

export async function generateStaticParams() {
  const collections = getDocCollections();
  return collections.map((collection) => ({
    collection: collection.id,
  }));
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collection } = await params;
  const docCollection = getDocCollection(collection);
  if (!docCollection) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Link
        href="/docs"
        className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
        style={{ color: "var(--primary)" }}
      >
        <span>←</span>
        <span>返回文档集</span>
      </Link>

      <div className="card mb-8">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{docCollection.icon}</span>
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--primary)" }}>
              {docCollection.title}
            </h1>
            <p style={{ color: "var(--text)", opacity: 0.8 }}>
              {docCollection.description}
            </p>
            <div className="mt-4 text-sm" style={{ color: "var(--text)", opacity: 0.6 }}>
              共 {docCollection.docs.length} 篇文档
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {docCollection.docs.map((doc, index) => (
          <Link
            key={doc.id}
            href={`/docs/${collection}/${encodeURIComponent(doc.id)}`}
            className="card hover:translate-x-2 transition-all duration-300 block"
          >
            <div className="flex items-center gap-4">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--background)",
                }}
              >
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--primary)" }}>
                  {doc.title}
                </h3>
                {doc.description && (
                  <p className="text-sm" style={{ color: "var(--text)", opacity: 0.7 }}>
                    {doc.description}
                  </p>
                )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                style={{ color: "var(--text)", opacity: 0.5 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
