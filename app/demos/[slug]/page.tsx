import type { Metadata } from "next";
import { getDemos, getDemoById, getDemoHtmlContent } from "../../../lib/demos";
import DemoDetailPageClient from "../../../components/features/DemoDetailPageClient";
import { buildMetadata, getDemoNotFoundMetadata } from "../../../lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemoById(slug);

  if (!demo) {
    return getDemoNotFoundMetadata(slug);
  }

  const metadata = buildMetadata(`/demos/${slug}`, demo.title, demo.description);
  return {
    ...metadata,
    keywords: demo.tags,
  };
}

export async function generateStaticParams() {
  const demos = getDemos();
  return demos.map((demo) => ({
    slug: demo.id,
  }));
}

export default async function DemoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = getDemoById(slug);

  const htmlContent = demo
    ? getDemoHtmlContent(slug, demo.hasShowHtml ? "show" : "demo")
    : undefined;

  return <DemoDetailPageClient demo={demo} htmlContent={htmlContent} />;
}
