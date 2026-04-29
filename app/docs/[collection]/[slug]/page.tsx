import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getDoc,
  getDocCollection,
  getDocCollections,
  getPrevNextDocs,
} from "../../../../lib/docs";
import { markdownToHtml } from "../../../../lib/markdown";
import DocPageClient from "../../../../components/features/DocPageClient";
import { buildMetadata, getDocNotFoundMetadata } from "../../../../lib/i18n/metadata";

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
    return getDocNotFoundMetadata(collection, slug);
  }

  return buildMetadata(
    `/docs/${collection}/${slug}`,
    doc.title,
    doc.description,
  );
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

  const isAutoHideEnabled = process.env.NEXT_PUBLIC_HEADER_AUTO_HIDE_ENABLED !== "false";

  return (
    <DocPageClient
      collection={docCollection}
      doc={doc}
      prev={prev}
      next={next}
      htmlContent={htmlContent}
      isAutoHideEnabled={isAutoHideEnabled}
    />
  );
}
