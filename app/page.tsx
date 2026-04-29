"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import VisitorGreeting from "../components/widgets/VisitorGreeting";
import StructuredData from "../components/ui/StructuredData";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t, language } = useLanguage();

  // 动态问候语 - 使用翻译函数
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return t("home.greetingNight");
    if (hour < 12) return t("home.greetingMorning");
    if (hour < 18) return t("home.greetingAfternoon");
    return t("home.greetingEvening");
  };

  const [greeting, setGreeting] = useState(getGreeting());
  const [animatedChars, setAnimatedChars] = useState<Set<number>>(new Set());
  const animationRef = useRef<number | null>(null);

  // 语言切换时更新问候语
  useEffect(() => {
    setGreeting(getGreeting());
    setAnimatedChars(new Set());
  }, [language, t]);

  // 每小时更新一次问候语
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
      setAnimatedChars(new Set());
    }, 3600000); // 1小时

    return () => clearInterval(interval);
  }, [t]);

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
          {t("home.welcome")}
        </p>
      </div>
    </>
  );
}
