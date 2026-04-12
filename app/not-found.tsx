"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    const text = "小笨蛋，页面跑偏啦～";
    setChars(text.split(""));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center px-4 max-w-md w-full">
        <div className="mb-8">
          <img
            src="/backgrounds/404.png"
            alt="404错误图片"
            className="w-full max-w-xs mx-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
          {chars.map((char, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                animation: `bounce 1.5s infinite alternate`,
                animationDelay: `${index * 0.1}s`,
                transformOrigin: "center bottom",
              }}
            >
              {char}
            </span>
          ))}
        </h2>

        <p className="text-sm mb-8 leading-relaxed" style={{ color: "var(--text)", opacity: 0.8 }}>
          你可以选择刷新页面或者返回主页
        </p>

        <Link
          href="/"
          className="inline-block text-white text-base px-8 py-3 rounded-lg transition-colors duration-200 font-bold tracking-wider"
          style={{ backgroundColor: "var(--primary)" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--dark)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--primary)"}
        >
          返回首页
        </Link>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
