import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategories, getPostsByCategory } from "../../../lib/posts";
import { formatDate } from "../../../lib/utils";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  console.log("Generating static params for categories:", categories);
  return categories.map((category) => ({
    slug: category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = getCategories();
  const category = categories.find((cat) => cat === slug);

  if (!category) {
    console.log("Category not found:", slug);
    console.log("Available categories:", categories);
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">分类：{category}</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">该分类暂无文章</p>
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
                </div>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="text-xs bg-secondary text-primary px-2 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      {tag}
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