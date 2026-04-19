// Project: FunRadiusP
// Author: Pfolg <https://github.com/csy214-beep>
// Environment: TRAE
// LICENCE: <https://creativecommons.org/licenses/by-nc-sa/4.0>
// Repo: <https://github.com/PfolgCodeDump/FunRadiusP>

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPostById, getPosts, Post } from "../../../lib/posts";
import { formatDate, getPrevNextPosts } from "../../../lib/utils";
import { markdownToHtml } from "../../../lib/markdown";
import TableOfContents from "../../../components/TableOfContents";
import GiscusComments from "../../../components/GiscusComments";
import ExpandableCover from "../../../components/ExpandableCover";
import StructuredData from "../../../components/StructuredData";
import MusicPlayer from "../../../components/MusicPlayer";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostById(slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const image = post.image
    ? post.image.startsWith("http://") || post.image.startsWith("https://")
      ? post.image
      : `${siteUrl}${post.image}`
    : `${siteUrl}/favicon.png`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${siteUrl}/posts/${slug}`,
      images: [{ url: image, alt: post.title }],
      publishedTime: post.published,
      modifiedTime: post.published,
      authors: [process.env.NEXT_PUBLIC_AUTHOR_NAME || "Your Name"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostById(slug);
  if (!post) notFound();

  const posts: Post[] = getPosts();
  const { prev, next } = getPrevNextPosts(posts, post.id);
  const htmlContent = await markdownToHtml(post.content, {
    type: "post",
    id: post.id,
  });

  const isAutoHideEnabled =
    process.env.NEXT_PUBLIC_HEADER_AUTO_HIDE_ENABLED !== "false";

  return (
    <>
      <StructuredData type="article" data={post} />
      {post.player && <MusicPlayer player={post.player} />}
      <div
        className={
          isAutoHideEnabled
            ? "max-w-6xl mx-auto px-4"
            : "max-w-6xl mx-auto px-4 pt-20"
        }
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主内容 */}
          <div className="lg:w-3/4 min-w-0">
            <h1
              className="text-3xl font-bold mb-4"
              style={{ color: "var(--primary)" }}
            >
              {post.title}
            </h1>
            <div
              className="flex flex-wrap items-center gap-4 text-sm mb-6"
              style={{ color: "var(--text)", opacity: 0.7 }}
            >
              <span>{formatDate(post.published)}</span>
              {post.category && (
                <Link
                  href={`/categories/${post.category}`}
                  className="px-3 py-1 rounded-full hover:opacity-80 transition-colors"
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--primary)",
                  }}
                >
                  {post.category}
                </Link>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="px-3 py-1 rounded-full hover:opacity-80 transition-colors"
                      style={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--text)",
                      }}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 文章封面 */}
            {post.image && (
              <ExpandableCover image={post.image} alt={post.title} />
            )}

            {/* 文章内容 */}
            <div
              className="prose max-w-none mb-8 post-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* 版权声明 */}
            <div
              className="border-t pt-6 mb-8"
              style={{ borderColor: "var(--secondary)" }}
            >
              <p
                className="text-sm"
                style={{ color: "var(--text)", opacity: 0.7 }}
              >
                © {new Date(post.published).getFullYear()}{" "}
                {process.env.NEXT_PUBLIC_AUTHOR_NAME}. All All rights reserved.
              </p>
            </div>

            {/* 上一篇/下一篇 */}
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="text-left">
                {prev && (
                  <Link
                    href={`/posts/${prev.id}`}
                    className="hover:underline flex items-center transition-all px-4 py-2 rounded-lg"
                    style={{
                      color: "var(--primary)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <span className="mr-2">←</span>
                    <span className="truncate">上一篇：{prev.title}</span>
                  </Link>
                )}
              </div>
              <div className="text-right">
                {next && (
                  <Link
                    href={`/posts/${next.id}`}
                    className="hover:underline flex items-center justify-end transition-all px-4 py-2 rounded-lg"
                    style={{
                      color: "var(--primary)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <span className="truncate">下一篇：{next.title}</span>
                    <span className="ml-2">→</span>
                  </Link>
                )}
              </div>
            </div>

            {/* 评论区 */}
            <GiscusComments />
          </div>

          {/* 侧边栏 */}
          <div className="lg:w-1/4 flex-shrink-0 hidden lg:block">
            {/* 目录 */}
            {isAutoHideEnabled ? (
              <div className="sticky top-4">
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">目录</h3>
                  <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                    <TableOfContents content={htmlContent} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="sticky top-24">
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
    </>
  );
}
