import { NextResponse } from "next/server";
import initialPartnersData from "@/data/partners.json";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    total: initialPartnersData.length,
    data: initialPartnersData,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { umkmId, partnerId, requestedAmount, tenorMonths, purpose } = body;

    const partner = initialPartnersData.find((p) => p.id === partnerId);

    const application = {
      id: `APP-${Date.now().toString().slice(-6)}`,
      umkmId: umkmId || "umkm-01",
      partnerId,
      partnerName: partner?.name || "Lembaga Keuangan Mitra",
      partnerLogo: partner?.logo || "🏦",
      requestedAmount: Number(requestedAmount),
      approvedAmount: Number(requestedAmount),
      tenorMonths: Number(tenorMonths),
      interestRate: 6.5,
      purpose: purpose || "Modal Usaha",
      status: "Disetujui",
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: "Otomatisasi pencairan berbasis riwayat digital footprint GIAT.",
    };

    return NextResponse.json({
      status: "success",
      message: "Pengajuan pinjaman berhasil diterima mitra keuangan",
      data: application,
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Gagal memproses pengajuan pinjaman" },
      { status: 500 }
    );
  }
}
