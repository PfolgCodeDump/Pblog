/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export", // 开启纯静态导出
  trailingSlash: true, // 路径统一带/，避免路由异常
  distDir: "output",
  // Next.js 会自动处理 basePath，无需手动加 /Pblog。但如果你有直接写在 <a href="/xxx"> 里的路径，需要改成 <a href={"/Pblog/xxx"}> 或使用 next/link。最好全部改用 next/link 和 next/router。
};

module.exports = nextConfig;