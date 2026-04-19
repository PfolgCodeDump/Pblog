// Project: FunRadiusP
// Author: Pfolg <https://github.com/csy214-beep>
// Environment: TRAE
// LICENCE: <https://creativecommons.org/licenses/by-nc-sa/4.0>
// Repo: <https://github.com/PfolgCodeDump/FunRadiusP>

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import VisitorGreeting from "../components/VisitorGreeting";
import StructuredData from "../components/StructuredData";

export default function Home() {
  // 动态问候语
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "夜深了，注意休息";
    if (hour < 12) return "早上好，新的一天开始了";
    if (hour < 18) return "下午好，继续加油";
    return "晚上好，放松一下吧";
  };

  const [greeting, setGreeting] = useState(getGreeting());
  const [animatedChars, setAnimatedChars] = useState<Set<number>>(new Set());
  const animationRef = useRef<number | null>(null);

  // 每小时更新一次问候语
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
      setAnimatedChars(new Set());
    }, 3600000); // 1小时

    return () => clearInterval(interval);
  }, []);

  // 字符动画效果 - 重构版本
  useEffect(() => {
    const startAnimation = () => {
      let index = 0;
      const chars = greeting.length;
      const newAnimatedChars = new Set<number>();

      const animate = () => {
        if (index < chars) {
          newAnimatedChars.add(index);
          setAnimatedChars(new Set(newAnimatedChars));
          index++;
        } else if (index < chars + 10) {
          // 等待一段时间后重置
          index++;
        } else {
          // 重置动画
          index = 0;
          newAnimatedChars.clear();
          setAnimatedChars(new Set());
        }

        animationRef.current = window.setTimeout(animate, 150);
      };

      animate();
    };

    startAnimation();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [greeting]);

  return (
    <>
      <StructuredData type="blog" />
      <div
        id="home-page"
        className="flex flex-col items-center justify-center min-h-[80vh]"
      >
        <h1 className="text-4xl font-bold text-primary mb-6">
          {greeting.split("").map((char, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                animationName: animatedChars.has(index) ? "bounce" : "none",
                animationDuration: "0.6s",
                animationTimingFunction: "ease-out",
                animationFillMode: "forwards",
              }}
            >
              {char}
            </span>
          ))}
        </h1>
        <VisitorGreeting />
        <p className="text-lg text-center mb-12 max-w-2xl">
          欢迎来到我的个人博客，这里记录了我的学习、生活和思考。
        </p>
      </div>
    </>
  );
}
