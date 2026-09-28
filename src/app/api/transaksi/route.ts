import { NextResponse } from "next/server";
import initialTrxData from "@/data/transaksi.json";
import { Transaction } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const umkmId = searchParams.get("umkmId");

  let result = initialTrxData as Transaction[];
  if (umkmId) {
    result = result.filter((t) => t.umkmId === umkmId);
  }

  return NextResponse.json({
    status: "ok",
    total: result.length,
    data: result,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { umkmId, customerName, amount, method, category } = body;

    if (!customerName || !amount) {
      return NextResponse.json(
        { status: "error", message: "customerName dan amount wajib diisi" },
        { status: 400 }
      );
    }

    const newTrx: Transaction = {
      id: `TRX-${Date.now()}`,
      umkmId: umkmId || "umkm-01",
      customerName,
      amount: Number(amount),
      method: method || "QRIS",
      category: category || "Penjualan Umum",
      timestamp: new Date().toISOString(),
      referenceNumber: `QRIS-ID-${Math.floor(1000000 + Math.random() * 9000000)}`,
      status: "success",
    };

    return NextResponse.json({
      status: "success",
      message: "Transaksi berhasil dicatat ke GIAT Kasir",
      data: newTrx,
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Format payload invalid" },
      { status: 500 }
    );
  }
}
