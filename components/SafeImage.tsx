// Project: FunRadiusP
// Author: Pfolg <https://github.com/csy214-beep>
// Environment: TRAE
// LICENCE: <https://creativecommons.org/licenses/by-nc-sa/4.0>
// Repo: <https://github.com/PfolgCodeDump/FunRadiusP>

"use client";

import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export default function SafeImage({
  src,
  alt,
  className = "",
  loading = "lazy",
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setHasError(true)}
    />
  );
}
