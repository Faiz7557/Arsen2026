"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { UMKM, Transaction, FinancialPartner, LoanApplication, CreditScoreDetail } from "@/types";
import initialUmkmData from "@/data/umkm.json";
import initialTrxData from "@/data/transaksi.json";
import initialPartnersData from "@/data/partners.json";
import { calculateScoreFromTransactions } from "@/lib/scoring";

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: "success" | "info" | "warning" | "error";
}

interface GiatContextType {
  umkms: UMKM[];
  activeUmkm: UMKM;
  setActiveUmkmId: (id: string) => void;
  transactions: Transaction[];
  addTransaction: (trx: Omit<Transaction, "id" | "timestamp" | "status" | "referenceNumber">) => Transaction;
  scoreDetail: CreditScoreDetail;
  partners: FinancialPartner[];
  applications: LoanApplication[];
  submitLoanApplication: (partnerId: string, amount: number, tenorMonths: number, purpose: LoanApplication["purpose"]) => LoanApplication;
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastMessage["type"]) => void;
  dismissToast: (id: string) => void;
  resetDemoData: () => void;
}

const GiatContext = createContext<GiatContextType | undefined>(undefined);

export function GiatProvider({ children }: { children: React.ReactNode }) {
  const [umkms] = useState<UMKM[]>(initialUmkmData as UMKM[]);

  const [activeUmkmId, setActiveUmkmIdState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedUmkmId = localStorage.getItem("giat_active_umkm");
        if (savedUmkmId) return savedUmkmId;
      } catch {
        // ignore
      }
    }
    return "umkm-01";
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTrx = localStorage.getItem("giat_transactions");
        if (savedTrx) return JSON.parse(savedTrx);
      } catch {
        // ignore
      }
    }
    return initialTrxData as Transaction[];
  });

  const [partners] = useState<FinancialPartner[]>(initialPartnersData as FinancialPartner[]);

  const [applications, setApplications] = useState<LoanApplication[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedApps = localStorage.getItem("giat_applications");
        if (savedApps) return JSON.parse(savedApps);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: "APP-2026-001",
        umkmId: "umkm-01",
        partnerId: "partner-bri",
        partnerName: "Bank Rakyat Indonesia (KUR Digital)",
        partnerLogo: "🏛️",
        requestedAmount: 45000000,
        approvedAmount: 45000000,
        tenorMonths: 24,
        interestRate: 6.0,
        purpose: "Modal Usaha",
        status: "Disetujui",
        submittedAt: "2026-09-20T10:00:00+07:00",
        updatedAt: "2026-09-22T14:30:00+07:00",
        giatScoreSnapshot: 738,
        notes: "Disetujui berdasarkan data perputaran kasir QRIS konsisten 48 trx/hari."
      }
    ];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastCountRef = useRef(0);
  const trxCountRef = useRef(0);

  const activeUmkm = umkms.find((u) => u.id === activeUmkmId) || umkms[0];

  // Active UMKM's transactions
  const activeUmkmTrx = transactions.filter((t) => t.umkmId === activeUmkm.id);

  // Recalculate score reactively
  const scoreDetail = calculateScoreFromTransactions(
    activeUmkmTrx.length > 0 ? activeUmkmTrx : (initialTrxData as Transaction[]),
    activeUmkm
  );

  const setActiveUmkmId = useCallback((id: string) => {
    setActiveUmkmIdState(id);
    try {
      localStorage.setItem("giat_active_umkm", id);
    } catch {
      // ignore
    }
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, description?: string, type: ToastMessage["type"] = "success") => {
    toastCountRef.current += 1;
    const id = `toast-${toastCountRef.current}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  }, [dismissToast]);

  const addTransaction = useCallback((trxData: Omit<Transaction, "id" | "timestamp" | "status" | "referenceNumber">) => {
    trxCountRef.current += 1;
    const randomRef = `QRIS-ID-${1000000 + trxCountRef.current}`;
    const newTrx: Transaction = {
      ...trxData,
      id: `TRX-${trxCountRef.current}`,
      timestamp: "2026-09-28T14:30:00+07:00",
      status: "success",
      referenceNumber: randomRef,
    };

    setTransactions((prev) => {
      const updated = [newTrx, ...prev];
      try {
        localStorage.setItem("giat_transactions", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    showToast(
      "Transaksi Berhasil Disimpan!",
      `${trxData.customerName} - Rp ${trxData.amount.toLocaleString("id-ID")} (${trxData.method})`,
      "success"
    );

    return newTrx;
  }, [showToast]);

  const submitLoanApplication = useCallback((
    partnerId: string,
    amount: number,
    tenorMonths: number,
    purpose: LoanApplication["purpose"]
  ) => {
    const partner = partners.find((p) => p.id === partnerId);
    trxCountRef.current += 1;
    const newApp: LoanApplication = {
      id: `APP-2026-${trxCountRef.current}`,
      umkmId: activeUmkm.id,
      partnerId,
      partnerName: partner?.name || "Lembaga Keuangan Mitra",
      partnerLogo: partner?.logo || "🏦",
      requestedAmount: amount,
      approvedAmount: scoreDetail.totalScore >= (partner?.minScore || 650) ? amount : Math.round(amount * 0.8),
      tenorMonths,
      interestRate: scoreDetail.estimatedInterestRate,
      purpose,
      status: scoreDetail.totalScore >= (partner?.minScore || 650) ? "Disetujui" : "Verifikasi Digital Footprint",
      submittedAt: "2026-09-28T14:35:00+07:00",
      updatedAt: "2026-09-28T14:35:00+07:00",
      giatScoreSnapshot: scoreDetail.totalScore,
      notes: "Verifikasi otomatis berbasis jejak transaksi digital GIAT Kasir & QRIS.",
    };

    setApplications((prev) => {
      const updated = [newApp, ...prev];
      try {
        localStorage.setItem("giat_applications", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    showToast(
      "Pengajuan Kredit Terkirim!",
      `Diajukan ke ${newApp.partnerName} senilai Rp ${amount.toLocaleString("id-ID")}`,
      "info"
    );

    return newApp;
  }, [activeUmkm.id, partners, scoreDetail.estimatedInterestRate, scoreDetail.totalScore, showToast]);

  const resetDemoData = useCallback(() => {
    setTransactions(initialTrxData as Transaction[]);
    setApplications([]);
    setActiveUmkmIdState("umkm-01");
    try {
      localStorage.removeItem("giat_transactions");
      localStorage.removeItem("giat_applications");
      localStorage.removeItem("giat_active_umkm");
    } catch {
      // ignore
    }
    showToast("Data Demo Direset", "Semua data transaksi & pengajuan telah dikembalikan ke kondisi awal.", "info");
  }, [showToast]);

  return (
    <GiatContext.Provider
      value={{
        umkms,
        activeUmkm,
        setActiveUmkmId,
        transactions,
        addTransaction,
        scoreDetail,
        partners,
        applications,
        submitLoanApplication,
        toasts,
        showToast,
        dismissToast,
        resetDemoData,
      }}
    >
      {children}
    </GiatContext.Provider>
  );
}

export function useGiat() {
  const context = useContext(GiatContext);
  if (!context) {
    throw new Error("useGiat must be used within a GiatProvider");
  }
  return context;
}
