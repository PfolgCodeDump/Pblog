export default function Footer() {
  return (
    <footer
      className="border-t mt-12 py-8 relative z-20"
      style={{
        backgroundColor: "var(--background)",
        borderColor: "var(--secondary)",
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <p style={{ color: "var(--text)" }}>
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_AUTHOR_NAME}.
          All rights reserved.
        </p>
        <p
          className="text-sm mt-2"
          style={{ color: "var(--text)", opacity: 0.7 }}
        >
          基于 Next.js + TypeScript + Tailwind CSS 构建
        </p>
      </div>
    </footer>
  );
}