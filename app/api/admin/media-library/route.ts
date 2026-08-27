import { NextResponse } from "next/server";
import { getMediaLibrary } from "../../../../lib/mediaLibrary";

export async function GET() {
  return NextResponse.json({ items: getMediaLibrary() });
}
