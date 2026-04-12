'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import ColorPicker from "./ColorPicker";

export default function Header() {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(process.env.NEXT_PUBLIC_HEADER_AUTO_HIDE_ENABLED === 'false');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const isAutoHideEnabled = process.env.NEXT_PUBLIC_HEADER_AUTO_HIDE_ENABLED !== 'false';

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/articles") {
      return pathname.startsWith("/articles") || pathname.startsWith("/posts");
    }
    if (href === "/docs") {
      return pathname.startsWith("/docs");
    }
    return pathname.startsWith(href);
  };

  const showHeader = () => {
    setIsHeaderVisible(true);
  };

  const hideHeader = () => {
    if (isMoreMenuOpen || isMobileMenuOpen) {
      return;
    }
    setIsHeaderVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(e.target as Node)
      ) {
        setIsMoreMenuOpen(false);
      }
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        hideHeader();
      }
    };

    const handleScroll = () => {
      hideHeader();
    };

    document.addEventListener("click", handleClickOutside);

    let handleMouseMove: (e: MouseEvent) => void;
    let handleTouchMove: (e: TouchEvent) => void;
    let handleTouchStart: (e: TouchEvent) => void;
    if (isAutoHideEnabled) {
      handleMouseMove = (e: MouseEvent) => {
        if (e.clientY < 100) {
          showHeader();
        }
      };
      handleTouchMove = (e: TouchEvent) => {
        if (e.touches[0].clientY < 150) {
          showHeader();
        }
      };
      handleTouchStart = (e: TouchEvent) => {
        if (e.touches[0].clientY < 150) {
          showHeader();
        }
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (isAutoHideEnabled) {
        if (handleMouseMove) {
          document.removeEventListener("mousemove", handleMouseMove);
        }
        if (handleTouchMove) {
          document.removeEventListener("touchmove", handleTouchMove);
        }
        if (handleTouchStart) {
          document.removeEventListener("touchstart", handleTouchStart);
        }
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isAutoHideEnabled, isMoreMenuOpen, isMobileMenuOpen]);

  const moreMenuItems = [
    { href: "/docs", label: "文档集" },
    { href: "/archive", label: "归档" },
    { href: "/categories", label: "分类" },
    { href: "/tags", label: "标签" },
    { href: "/journey", label: "历程" },
    { href: "/projects", label: "项目" },
    { href: "/demos", label: "Demo" },
    { href: "/information", label: "信息" },
    { href: "/rss.xml", label: "RSS", external: true },
  ];

  const allMenuItems = [
    { href: "/", label: "首页" },
    { href: "/articles", label: "文章" },
    { href: "/about", label: "关于" },
    ...moreMenuItems,
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 shadow-sm backdrop-blur-md transition-transform duration-2000 ease-out ${
        isAutoHideEnabled
          ? isHeaderVisible
            ? "translate-y-0"
            : "-translate-y-full"
          : "translate-y-0"
      }`}
      {...(isAutoHideEnabled && { onMouseEnter: showHeader })}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Pblog
        </Link>

        <div className="flex items-center gap-4">
          {/* 桌面端：首页、文章、关于单独显示 */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-md transition-all duration-150 ${
                isActive("/")
                  ? "bg-primary/10 text-primary"
                  : "hover:text-primary"
              }`}
              style={{ color: "var(--text)" }}
            >
              首页
            </Link>
            <Link
              href="/articles"
              className={`px-3 py-1.5 rounded-md transition-all duration-150 ${
                isActive("/articles")
                  ? "bg-primary/10 text-primary"
                  : "hover:text-primary"
              }`}
              style={{ color: "var(--text)" }}
            >
              文章
            </Link>
            <Link
              href="/about"
              className={`px-3 py-1.5 rounded-md transition-all duration-150 ${
                isActive("/about")
                  ? "bg-primary/10 text-primary"
                  : "hover:text-primary"
              }`}
              style={{ color: "var(--text)" }}
            >
              关于
            </Link>

            {/* 更多菜单下拉 */}
            <div className="relative" ref={moreMenuRef}>
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-150 hover:bg-primary/10"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                style={{ color: "var(--text)" }}
              >
                <span>更多</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${isMoreMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* 更多菜单下拉内容 */}
              {isMoreMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 overflow-hidden"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--secondary)",
                  }}
                >
                  <div className="py-2">
                    {moreMenuItems.map((item) =>
                      item.external ? (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2.5 transition-all duration-150 hover:bg-primary/5 hover:text-primary"
                          onClick={() => setIsMoreMenuOpen(false)}
                          style={{ color: "var(--text)" }}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-2.5 transition-all duration-150 ${
                            isActive(item.href)
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-primary/5 hover:text-primary"
                          }`}
                          onClick={() => setIsMoreMenuOpen(false)}
                          style={{ color: "var(--text)" }}
                        >
                          {item.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 主题颜色切换按钮 */}
          <ColorPicker />

          {/* 主题切换按钮 */}
          <ThemeToggle />

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden transition-colors"
            onClick={() => {
              showHeader();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            style={{ color: "var(--text)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            borderColor: "var(--secondary)",
          }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {allMenuItems.map((item) =>
              (item as any).external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-md transition-all duration-150 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ color: "var(--text)" }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-1.5 px-2 rounded-md transition-all duration-150 ${
                    isActive(item.href) ? "bg-primary/10" : "hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ color: "var(--text)" }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
