"use client";

import { memo, useEffect, useState } from "react";
import type { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name?: string;
  fallback?: React.ReactNode;
}

function toKebabCase(name: string): string {
  return name
    .replace(/[_\s]+/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

const svgCache = new Map<string, string>();

async function fetchIconSvg(kebab: string): Promise<string> {
  if (svgCache.has(kebab)) return svgCache.get(kebab)!;

  const res = await fetch(`/api/icons/${kebab}`);
  if (!res.ok) throw new Error(`Icon "${kebab}" not found`);

  const svg = await res.text();
  svgCache.set(kebab, svg);
  return svg;
}

const DynamicIcon = memo(function DynamicIcon({
  name = "cross",
  fallback = null,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  style,
}: DynamicIconProps) {
  const [svg, setSvg] = useState<string | null>(() => {
    return svgCache.get(toKebabCase(name)) ?? null;
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const kebab = toKebabCase(name);
    if (svgCache.has(kebab)) {
      setSvg(svgCache.get(kebab)!);
      return;
    }

    let cancelled = false;
    setSvg(null);
    setError(false);

    fetchIconSvg(kebab)
      .then((s) => { if (!cancelled) setSvg(s); })
      .catch(() => { if (!cancelled) setError(true); });

    return () => { cancelled = true; };
  }, [name]);

  if (error) return <>{fallback}</>;
  if (!svg) return <>{fallback}</>;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: svg.replace(/^<svg[^>]*>/i, "").replace(/<\/svg>$/i, ""),
      }}
    />
  );
});

export default DynamicIcon;