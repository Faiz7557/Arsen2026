import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Arsen 2026 Prototype API is up and running!",
    timestamp: new Date().toISOString(),
    framework: "Next.js 16 + React 19",
  });
}
