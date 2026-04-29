import Script from "next/script";

interface StructuredDataProps {
  type: "website" | "article" | "blog" | "person";
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "FunRadiusP";
  const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME || "Your Name";

  let structuredData: any;

  switch (type) {
    case "website":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        description:
          process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
          "个人博客，记录学习、生活和思考",
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@type": "Person",
          name: authorName,
        },
        inLanguage: "zh-CN",
      };
      break;

    case "blog":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: siteName,
        description:
          process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
          "个人博客，记录学习、生活和思考",
        url: siteUrl,
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@type": "Person",
          name: authorName,
        },
        inLanguage: "zh-CN",
      };
      break;

    case "article":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data?.title || "",
        description: data?.description || "",
        datePublished: data?.published || "",
        dateModified: data?.published || "",
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@type": "Person",
          name: authorName,
        },
        image: data?.image
          ? (data.image.startsWith("http://") || data.image.startsWith("https://")
              ? data.image
              : `${siteUrl}${data.image}`)
          : `${siteUrl}/favicon.png`,
        keywords: data?.tags?.join(", ") || "",
        inLanguage: "zh-CN",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}/posts/${data?.id}`,
        },
      };
      break;

    case "person":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: authorName,
        url: siteUrl,
        sameAs: [],
      };
      break;

    default:
      return null;
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
