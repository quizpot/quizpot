import { readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const VALID_NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  if (!VALID_NAME.test(name)) {
    return new NextResponse("Invalid icon name", { status: 400 });
  }

  try {
    const svgPath = path.join(
      process.cwd(),
      "node_modules",
      "lucide-static",
      "icons",
      `${name}.svg`
    );

    const svg = await readFile(svgPath, "utf-8");

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Icon not found", { status: 404 });
  }
}