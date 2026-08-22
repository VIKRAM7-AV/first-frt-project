import { NextResponse } from "next/server";
import { getTamilNaduMandiRates, TargetProduct } from "@/lib/mandi";

export const dynamic = "force-dynamic";
export const revalidate = 21600; // Cache for 6 hours (Server-side ISR)

export type { TargetProduct };

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get("refresh") === "true";

    const response = await getTamilNaduMandiRates(forceRefresh);

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
        "CDN-Cache-Control": "public, s-maxage=21600",
      },
    });
  } catch (error: any) {
    console.error("Error in mandi-rates API route:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch live Tamil Nadu Mandi records",
      },
      { status: 500 }
    );
  }
}
