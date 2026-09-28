export type UMKMCluster = "Deep Sleepers" | "Stirring Giants" | "Awakened Leaders";

export interface UMKM {
  id: string;
  name: string;
  owner: string;
  category: "Kuliner" | "Kriya & Kerajinan" | "Kelontong" | "Jasa" | "Fashion" | "Pertanian";
  cluster: UMKMCluster;
  province: string;
  city: string;
  establishedYear: number;
  monthlyRevenue: number;
  avgDailyTransactions: number;
  qrisId: string;
  phone: string;
  avatar: string;
  isBankable: boolean;
  creditScore: number;
  grade: "A" | "B" | "C" | "D";
}

export type PaymentMethod = "QRIS" | "E-Wallet" | "Transfer Bank" | "Tunai (Dicatat Kasir)" | "USSD Mode";

export interface Transaction {
  id: string;
  umkmId: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  category: string;
  timestamp: string;
  referenceNumber: string;
  status: "success" | "pending" | "failed";
}

export interface ScoreDimension {
  name: string;
  score: number; // 0 - 100
  weight: number; // percentage
  status: "Optimal" | "Baik" | "Perlu Ditingkatkan" | "Rentan";
  description: string;
}

export interface CreditScoreDetail {
  umkmId: string;
  totalScore: number; // 300 - 850
  grade: "A" | "B" | "C" | "D";
  feasibilityRatio: number; // %
  defaultRisk: number; // %
  maxLoanLimit: number;
  estimatedInterestRate: number; // % per year
  dimensions: {
    transactionFrequency: ScoreDimension;
    revenueConsistency: ScoreDimension;
    customerDiversity: ScoreDimension;
    growthTrend: ScoreDimension;
    digitalTrackRecord: ScoreDimension;
  };
  scoreHistory: {
    month: string;
    score: number;
  }[];
  recommendations: string[];
}

export interface FinancialPartner {
  id: string;
  name: string;
  type: "Bank Himbara" | "Bank Swasta" | "Bank Syariah" | "P2P Lending" | "Fintech Produktif";
  logo: string;
  interestRate: string;
  tenor: string;
  maxLimit: number;
  minScore: number;
  approvalSpeed: string;
  digitalCollateralAccepted: boolean;
  featured: boolean;
  clusterTarget: UMKMCluster[];
  badgeText: string;
}

export interface LoanApplication {
  id: string;
  umkmId: string;
  partnerId: string;
  partnerName: string;
  partnerLogo: string;
  requestedAmount: number;
  approvedAmount: number;
  tenorMonths: number;
  interestRate: number;
  purpose: "Modal Usaha" | "Pembelian Stok" | "Upgrade Alat Kasir/QRIS" | "Ekspansi Cabang";
  status: "Menunggu Review" | "Verifikasi Digital Footprint" | "Disetujui" | "Dana Dicairkan" | "Ditolak";
  submittedAt: string;
  updatedAt: string;
  giatScoreSnapshot: number;
  notes: string;
}

export interface SpatialClusterInfo {
  cluster: UMKMCluster;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  provincesCount: number;
  avgInformalPercentage: number;
  avgProductivity: string;
  educationHighSchoolPct: number;
  unemploymentRate: number;
  recommendedIntervention: string;
  keyProvinces: string[];
}

export interface ProvinceStat {
  code: string;
  name: string;
  cluster: UMKMCluster;
  umkmCount: number;
  informalRate: number; // %
  avgMonthlyOutput: number; // Juta Rp per tenaga kerja
  bankableRate: number; // %
  moranLocal: number;
}
