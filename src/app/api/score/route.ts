import { NextResponse } from "next/server";
import { calculateCreditScoreFromParams } from "@/lib/scoring";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      dailyTransactions = 45,
      monthlyRevenue = 28000000,
      consistencyRate = 85,
      customerDiversityScore = 80,
      digitalSharePct = 75,
      operatingMonths = 48,
      umkmId = "umkm-01",
    } = body;

    const scoreResult = calculateCreditScoreFromParams(
      {
        dailyTransactions: Number(dailyTransactions),
        monthlyRevenue: Number(monthlyRevenue),
        consistencyRate: Number(consistencyRate),
        customerDiversityScore: Number(customerDiversityScore),
        digitalSharePct: Number(digitalSharePct),
        operatingMonths: Number(operatingMonths),
      },
      umkmId
    );

    return NextResponse.json({
      status: "ok",
      data: scoreResult,
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Gagal menghitung skor" },
      { status: 500 }
    );
  }
}
