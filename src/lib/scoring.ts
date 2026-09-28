import { CreditScoreDetail, ScoreDimension, Transaction, UMKM } from "@/types";

export interface ScoringInputParameters {
  dailyTransactions: number;
  monthlyRevenue: number;
  consistencyRate: number; // 0 - 100%
  customerDiversityScore: number; // 0 - 100
  digitalSharePct: number; // 0 - 100% (QRIS + E-Wallet vs Tunai)
  operatingMonths: number;
}

export function calculateCreditScoreFromParams(
  params: ScoringInputParameters,
  umkmId: string = "umkm-01"
): CreditScoreDetail {
  // 1. Transaction Frequency (weight 25%)
  // Baseline: 50 trx/day = 90 score
  const freqScore = Math.min(100, Math.max(20, Math.round((params.dailyTransactions / 50) * 85 + 15)));
  const freqDimension: ScoreDimension = {
    name: "Frekuensi Transaksi",
    score: freqScore,
    weight: 25,
    status: freqScore >= 80 ? "Optimal" : freqScore >= 65 ? "Baik" : freqScore >= 45 ? "Perlu Ditingkatkan" : "Rentan",
    description: `Rata-rata ${params.dailyTransactions} transaksi/hari tercatat di sistem kasir. Menunjukkan perputaran cashflow harian.`
  };

  // 2. Revenue Consistency (weight 30%)
  const consistencyScore = Math.min(100, Math.max(30, Math.round(params.consistencyRate)));
  const consistencyDimension: ScoreDimension = {
    name: "Konsistensi Pendapatan",
    score: consistencyScore,
    weight: 30,
    status: consistencyScore >= 80 ? "Optimal" : consistencyScore >= 65 ? "Baik" : consistencyScore >= 50 ? "Perlu Ditingkatkan" : "Rentan",
    description: `Tingkat stabilitas omzet harian & bulanan sebesar ${params.consistencyRate}%. Meminimalisir risiko gagal bayar mendadak.`
  };

  // 3. Customer Diversity (weight 20%)
  const diversityScore = Math.min(100, Math.max(20, Math.round(params.customerDiversityScore)));
  const diversityDimension: ScoreDimension = {
    name: "Diversifikasi Pelanggan",
    score: diversityScore,
    weight: 20,
    status: diversityScore >= 75 ? "Optimal" : diversityScore >= 60 ? "Baik" : "Perlu Ditingkatkan",
    description: `Indeks variasi pembeli unik ${diversityScore}/100. Usaha tidak bergantung pada satu atau dua pembeli saja.`
  };

  // 4. Growth Trend (weight 15%)
  const growthScore = Math.min(100, Math.max(25, Math.round(50 + (params.monthlyRevenue > 30000000 ? 35 : params.monthlyRevenue > 20000000 ? 25 : 10))));
  const growthDimension: ScoreDimension = {
    name: "Tren Pertumbuhan Omzet",
    score: growthScore,
    weight: 15,
    status: growthScore >= 75 ? "Optimal" : "Baik",
    description: `Omzet bulanan sekitar Rp ${(params.monthlyRevenue / 1000000).toFixed(1)} Juta menunjukkan prospek skalabilitas usaha.`
  };

  // 5. Digital Track Record & QRIS Adopsi (weight 10%)
  const digitalScore = Math.min(100, Math.max(20, Math.round(params.digitalSharePct * 0.9 + 10)));
  const digitalDimension: ScoreDimension = {
    name: "Jejak Digital & Pembayaran Non-Tunai",
    score: digitalScore,
    weight: 10,
    status: digitalScore >= 70 ? "Optimal" : "Baik",
    description: `${params.digitalSharePct}% transaksi terekam via QRIS/E-Wallet atau sistem kasir terverifikasi.`
  };

  // Weighted Score Calculation
  const normalizedScore =
    (freqScore * 0.25) +
    (consistencyScore * 0.30) +
    (diversityScore * 0.20) +
    (growthScore * 0.15) +
    (digitalScore * 0.10);

  // Scaled to Credit Bureau scale: 300 - 850
  const totalScore = Math.round(300 + (normalizedScore / 100) * 550);

  let grade: "A" | "B" | "C" | "D" = "C";
  let feasibilityRatio = 65;
  let defaultRisk = 7.5;
  let maxLoanLimit = 25000000;
  let estimatedInterestRate = 10.5;

  if (totalScore >= 760) {
    grade = "A";
    feasibilityRatio = 94;
    defaultRisk = 1.8;
    maxLoanLimit = 150000000;
    estimatedInterestRate = 6.0;
  } else if (totalScore >= 680) {
    grade = "B";
    feasibilityRatio = 84;
    defaultRisk = 3.9;
    maxLoanLimit = 75000000;
    estimatedInterestRate = 7.5;
  } else if (totalScore >= 600) {
    grade = "C";
    feasibilityRatio = 68;
    defaultRisk = 7.2;
    maxLoanLimit = 35000000;
    estimatedInterestRate = 9.5;
  } else {
    grade = "D";
    feasibilityRatio = 48;
    defaultRisk = 14.0;
    maxLoanLimit = 10000000;
    estimatedInterestRate = 12.0;
  }

  return {
    umkmId,
    totalScore,
    grade,
    feasibilityRatio,
    defaultRisk,
    maxLoanLimit,
    estimatedInterestRate,
    dimensions: {
      transactionFrequency: freqDimension,
      revenueConsistency: consistencyDimension,
      customerDiversity: diversityDimension,
      growthTrend: growthDimension,
      digitalTrackRecord: digitalDimension,
    },
    scoreHistory: [
      { month: "Apr 2026", score: Math.max(300, totalScore - 55) },
      { month: "Mei 2026", score: Math.max(300, totalScore - 38) },
      { month: "Jun 2026", score: Math.max(300, totalScore - 26) },
      { month: "Jul 2026", score: Math.max(300, totalScore - 14) },
      { month: "Agu 2026", score: Math.max(300, totalScore - 6) },
      { month: "Sep 2026 (Kini)", score: totalScore }
    ],
    recommendations: [
      totalScore < 700
        ? "Tingkatkan frekuensi pencatatan transaksi kasir non-tunai secara rutin untuk memperkuat riwayat."
        : "Pertahankan konsistensi arus kas masuk harian di atas Rp 800.000.",
      "Gunakan mode QRIS pada saat jam sibuk untuk meningkatkan diversifikasi data pembeli unik.",
      "Pertahankan rasio penyelesaian transaksi di atas 95% untuk menjaga kepercayaan perbankan mitra."
    ]
  };
}

export function calculateScoreFromTransactions(
  transactions: Transaction[],
  umkm: UMKM
): CreditScoreDetail {
  const count = transactions.length;
  const totalAmount = transactions.reduce((acc, t) => acc + t.amount, 0);
  const qrisCount = transactions.filter(t => t.method === "QRIS" || t.method === "E-Wallet").length;
  const digitalSharePct = count > 0 ? Math.round((qrisCount / count) * 100) : 50;
  
  // Calculate unique customers approximation
  const uniqueCustomers = new Set(transactions.map(t => t.customerName)).size;
  const diversityPct = count > 0 ? Math.min(100, Math.round((uniqueCustomers / count) * 100) + 20) : 70;

  return calculateCreditScoreFromParams({
    dailyTransactions: Math.max(umkm.avgDailyTransactions, count),
    monthlyRevenue: Math.max(umkm.monthlyRevenue, totalAmount * 3),
    consistencyRate: 85,
    customerDiversityScore: diversityPct,
    digitalSharePct: digitalSharePct,
    operatingMonths: (2026 - umkm.establishedYear) * 12
  }, umkm.id);
}
