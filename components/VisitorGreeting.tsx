"use client";

import { useEffect, useState } from "react";

export default function VisitorGreeting() {
  const [os, setOs] = useState("Unknown OS");
  const [browser, setBrowser] = useState("Unknown Browser");

  useEffect(() => {
    const detectOS = () => {
      const userAgent = window.navigator.userAgent;
      const platform = window.navigator.platform;

      if (userAgent.includes("Win")) return "Windows";
      if (userAgent.includes("Mac")) return "macOS";
      if (userAgent.includes("Linux")) return "Linux";
      if (userAgent.includes("Android")) return "Android";
      if (userAgent.includes("like Mac")) return "iOS";
      if (userAgent.includes("X11")) return "UNIX";

      return platform || "Unknown OS";
    };

    const detectBrowser = () => {
      const userAgent = window.navigator.userAgent;

      if (userAgent.includes("Edg")) return "Edge";
      if (userAgent.includes("Chrome")) return "Chrome";
      if (userAgent.includes("Firefox")) return "Firefox";
      if (userAgent.includes("Safari")) return "Safari";
      if (userAgent.includes("Opera") || userAgent.includes("OPR"))
        return "Opera";

      return "Unknown Browser";
    };

    setOs(detectOS());
    setBrowser(detectBrowser());
  }, []);

  return (
    <p
      className="text-sm text-center mb-8 opacity-70"
      style={{
        animation: "float 3s ease-in-out infinite",
      }}
    >
      欢迎，来自 {os} 的 {browser} 的您！
    </p>
  );
}
