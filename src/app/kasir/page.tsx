"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  QrCode,
  Smartphone,
  PlusCircle,
  Clock,
  ArrowRight,
  Sparkles,
  SignalZero,
  Receipt,
  RotateCw,
  CheckCircle2,
} from "lucide-react";
import { useGiat } from "@/context/giat-context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { PaymentMethod, Transaction } from "@/types";
import { DigitalReceiptModal } from "@/components/kasir/digital-receipt-modal";

export default function KasirPage() {
  const { activeUmkm, transactions, addTransaction, scoreDetail } = useGiat();

  // Mode: digital (QRIS) vs lite (USSD)
  const [activeTab, setActiveTab] = useState<string>("qris");

  // Receipt Modal state
  const [latestReceipt, setLatestReceipt] = useState<Transaction | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Makanan & Minuman");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("QRIS");
  const [isScanning, setIsScanning] = useState(false);

  // USSD Simulator State
  const [ussdStep, setUssdStep] = useState<number>(0);
  const [ussdInput, setUssdInput] = useState<string>("");
  const [ussdAmount, setUssdAmount] = useState<string>("");

  // Filter transactions for current active UMKM
  const umkmTransactions = transactions.filter((t) => t.umkmId === activeUmkm.id);

  // Stats today
  const totalRevenue = umkmTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalCount = umkmTransactions.length;
  const qrisSharePct = totalCount > 0
    ? Math.round(
        (umkmTransactions.filter((t) => t.method === "QRIS" || t.method === "E-Wallet").length /
          totalCount) *
          100
      )
    : 0;

  // Preset quick items based on UMKM category
  const quickItems = [
    { label: "Paket Hemat Siang", price: 25000 },
    { label: "Paket Lengkap Spesial", price: 45000 },
    { label: "Pesanan Rombongan", price: 120000 },
    { label: "Minuman & Camilan", price: 15000 },
  ];

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    const newTrx = addTransaction({
      umkmId: activeUmkm.id,
      customerName: customerName || "Pelanggan Reguler",
      amount: Number(amount),
      method: paymentMethod,
      category: category || "Penjualan Kasir",
    });

    if (newTrx) {
      setLatestReceipt(newTrx);
      setIsReceiptOpen(true);
    }

    setCustomerName("");
    setAmount("");
  };

  const simulateRandomQrisScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const randomCustomers = [
        "Andi Pratama",
        "Dewi Lestari",
        "Bayu Wicaksono",
        "Citra Maharani",
        "Fajar Hidayat",
        "Maya Anggraini",
      ];
      const randomMenus = [
        "Soto Ayam Kampung + Teh Hangat",
        "2 Porsi Soto Daging Kuah Bening",
        "Paket Makan Siang Karyawan",
        "Pesanan Takeaway Box",
        "Sarapan Komplit",
      ];
      const randomAmounts = [28000, 35000, 52000, 78000, 110000, 44000];

      const chosenCustomer = randomCustomers[Math.floor(Math.random() * randomCustomers.length)];
      const chosenMenu = randomMenus[Math.floor(Math.random() * randomMenus.length)];
      const chosenAmount = randomAmounts[Math.floor(Math.random() * randomAmounts.length)];

      const newTrx = addTransaction({
        umkmId: activeUmkm.id,
        customerName: chosenCustomer,
        amount: chosenAmount,
        method: "QRIS",
        category: chosenMenu,
      });

      if (newTrx) {
        setLatestReceipt(newTrx);
        setIsReceiptOpen(true);
      }

      setIsScanning(false);
    }, 900);
  };

  // USSD Simulator logic
  const handleUssdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ussdStep === 0) {
      if (ussdInput === "*141*98#" || ussdInput === "1" || ussdInput.length > 0) {
        setUssdStep(1);
        setUssdInput("");
      }
    } else if (ussdStep === 1) {
      if (ussdInput === "1") {
        setUssdStep(2); // Ask amount
      } else if (ussdInput === "2") {
        setUssdStep(4); // View summary
      } else if (ussdInput === "3") {
        setUssdStep(5); // View score
      }
      setUssdInput("");
    } else if (ussdStep === 2) {
      if (Number(ussdInput) > 0) {
        setUssdAmount(ussdInput);
        setUssdStep(3);
      }
      setUssdInput("");
    } else if (ussdStep === 3) {
      const finalAmount = Number(ussdAmount) || 25000;
      const finalCustomer = ussdInput || "Pelanggan USSD Mode";
      const newTrx = addTransaction({
        umkmId: activeUmkm.id,
        customerName: finalCustomer,
        amount: finalAmount,
        method: "USSD Mode",
        category: "Transaksi Mode Lite (3T)",
      });
      if (newTrx) {
        setLatestReceipt(newTrx);
        setIsReceiptOpen(true);
      }
      setUssdStep(6);
      setUssdInput("");
    }
  };

  const resetUssd = () => {
    setUssdStep(0);
    setUssdInput("*141*98#");
    setUssdAmount("");
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-blue-100 dark:border-blue-900/40">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="infographic-number-badge">8</span>
            <Badge variant="navy" className="text-xs">
              Modul 1: GIAT Kasir &amp; Mode Lite
            </Badge>
            <span className="text-xs text-slate-500 font-semibold">• Merekam Transaksi Otomatis</span>
          </div>
          <h1 className="text-3xl font-black text-[#082046] dark:text-white tracking-tight flex items-center gap-3">
            <span>{activeUmkm.avatar}</span>
            <span>{activeUmkm.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-200/70 mt-1">
            QRIS Merchant ID: <code className="font-mono text-[#0284c7] font-bold">{activeUmkm.qrisId}</code> • Klaster Wilayah:{" "}
            <span className="font-bold text-[#082046] dark:text-white">{activeUmkm.cluster} ({activeUmkm.city})</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/score">
            <Button variant="gold" className="gap-2 font-black shadow-md">
              <span>Cek GIAT Score</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Omzet Terekam"
          value={`Rp ${(totalRevenue / 1000).toLocaleString("id-ID")} rb`}
          subtitle="Total dari semua pencatatan"
          icon={<Receipt className="h-5 w-5" />}
          accentColor="navy"
        />
        <StatCard
          title="Jumlah Transaksi"
          value={`${totalCount} Trx`}
          subtitle="Frekuensi perputaran arus kas"
          icon={<Clock className="h-5 w-5" />}
          accentColor="cyan"
        />
        <StatCard
          title="Rasio Non-Tunai / QRIS"
          value={`${qrisSharePct}%`}
          subtitle="Jejak digital tervalidasi"
          icon={<CreditCard className="h-5 w-5" />}
          accentColor="emerald"
        />
        <StatCard
          title="Estimasi Skor Kredit"
          value={`${scoreDetail.totalScore}`}
          badge={`Grade ${scoreDetail.grade}`}
          subtitle={`${scoreDetail.feasibilityRatio}% Feasible`}
          icon={<Sparkles className="h-5 w-5" />}
          accentColor="gold"
        />
      </div>

      {/* Main Grid: Input / Scanner on Left, Transaction List on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Kasir Input / QRIS Simulator / USSD */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mode Switcher Tabs */}
          <Tabs
            tabs={[
              {
                id: "qris",
                label: "Mode QRIS Dinamis (Online)",
                icon: <QrCode className="h-4 w-4 text-[#0284c7]" />,
                badge: "Standard",
              },
              {
                id: "ussd",
                label: "Mode Lite USSD (*141*98#)",
                icon: <SignalZero className="h-4 w-4 text-amber-500" />,
                badge: "Wilayah 3T",
              },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Mode 1: QRIS Digital */}
          {activeTab === "qris" && (
            <Card className="border-blue-200 dark:border-blue-800 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-[#082046] dark:text-blue-300" />
                    <CardTitle className="text-lg">Simulasi Kasir &amp; QRIS Dinamis</CardTitle>
                  </div>
                  <Badge variant="success">QRIS Nasional Aktif</Badge>
                </div>
                <CardDescription>
                  Setiap transaksi QRIS langsung tercatat otomatis dan menaikkan skor kelayakan kredit alternatif tanpa verifikasi berkas manual.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Instant QRIS Scan Generator Button */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#082046]/60 dark:to-[#0d2f60]/60 border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-[#082046] text-amber-300 flex items-center justify-center shrink-0 shadow-md">
                      <QrCode className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-[#082046] dark:text-white">
                        Simulasikan Pembeli Bayar QRIS
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-blue-200/70">
                        Otomatis menghasilkan 1 transaksi sukses dengan nominal &amp; pembeli acak.
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={simulateRandomQrisScan}
                    disabled={isScanning}
                    variant="gold"
                    className="w-full sm:w-auto gap-2 font-black shadow-md cursor-pointer shrink-0"
                  >
                    {isScanning ? (
                      <>
                        <RotateCw className="h-4 w-4 animate-spin" />
                        <span>Merekam Transaksi...</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="h-4 w-4" />
                        <span>Tap Scan QRIS</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Quick Presets */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-blue-200/60 uppercase tracking-wider block mb-2">
                    Menu Cepat (Pilih untuk isi otomatis)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {quickItems.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCategory(item.label);
                          setAmount(item.price.toString());
                        }}
                        className="p-3 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-white dark:bg-[#071c3b] hover:border-blue-400 hover:bg-blue-50 text-left transition-all cursor-pointer shadow-xs"
                      >
                        <div className="text-xs font-bold text-[#082046] dark:text-white truncate">
                          {item.label}
                        </div>
                        <div className="text-xs font-black text-[#0284c7] mt-1">
                          Rp {item.price.toLocaleString("id-ID")}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Manual Form Input */}
                <form onSubmit={handleManualSubmit} className="space-y-4 pt-3 border-t border-blue-100 dark:border-blue-900/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-blue-200 block mb-1">
                        Nama Pembeli / Keterangan
                      </label>
                      <Input
                        placeholder="Contoh: Pak Herman (Pelanggan Meja 4)"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-blue-200 block mb-1">
                        Nominal Penjualan (Rp) *
                      </label>
                      <Input
                        type="number"
                        placeholder="Contoh: 35000"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-blue-200 block mb-1">
                        Item / Menu
                      </label>
                      <Input
                        placeholder="Contoh: Soto Daging + Nasi"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-blue-200 block mb-1">
                        Metode Pembayaran
                      </label>
                      <Select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      >
                        <option value="QRIS">QRIS Dinamis (Rekomendasi)</option>
                        <option value="E-Wallet">E-Wallet (GoPay/OVO/ShopeePay)</option>
                        <option value="Transfer Bank">Transfer Bank Mandiri/BCA/BRI</option>
                        <option value="Tunai (Dicatat Kasir)">Tunai (Dicatat Kasir)</option>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" variant="navy" className="w-full gap-2 font-black h-11 cursor-pointer">
                    <PlusCircle className="h-4 w-4 text-amber-300" />
                    <span>Catat Transaksi Kasir</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Mode 2: Mode Lite (USSD *141*98#) */}
          {activeTab === "ussd" && (
            <Card className="border-amber-300 dark:border-amber-800 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SignalZero className="h-5 w-5 text-amber-600" />
                    <CardTitle className="text-lg">GIAT Mode Lite (Simulasi USSD *141*98#)</CardTitle>
                  </div>
                  <Badge variant="gold">Inovasi Khusus 3T</Badge>
                </div>
                <CardDescription>
                  Inovasi untuk pedagang di wilayah minim sinyal atau blank spot (Klaster Deep Sleepers). Memanfaatkan jaringan seluler 2G tanpa membutuhkan kuota internet.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Feature phone terminal screen simulator */}
                <div className="max-w-md mx-auto rounded-3xl bg-[#031508] text-[#4ade80] p-6 font-mono shadow-2xl border-4 border-zinc-800">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-3 border-b border-zinc-800">
                    <span>TELKOMSEL 2G</span>
                    <span className="text-amber-400 font-bold">GIAT LITE</span>
                    <span>100% 🔋</span>
                  </div>

                  {/* Terminal Display */}
                  <div className="py-6 min-h-[160px] text-xs leading-relaxed">
                    {ussdStep === 0 && (
                      <div>
                        <p className="text-zinc-300 mb-2">Panggil Kode USSD GIAT:</p>
                        <p className="text-[#4ade80] font-black text-sm bg-zinc-900 p-2.5 rounded-xl border border-zinc-700">
                          *141*98#
                        </p>
                        <p className="text-zinc-400 text-[11px] mt-3">
                          Tekan Kirim untuk memanggil menu pencatatan kasir offline.
                        </p>
                      </div>
                    )}

                    {ussdStep === 1 && (
                      <div>
                        <p className="text-yellow-300 font-bold mb-2">== MENU GIAT LITE ==</p>
                        <p>1. Catat Penjualan Cepat</p>
                        <p>2. Cek Total Hari Ini</p>
                        <p>3. Cek Skor Kredit GIAT</p>
                        <p className="text-zinc-400 mt-2">Ketik angka respon (1-3):</p>
                      </div>
                    )}

                    {ussdStep === 2 && (
                      <div>
                        <p className="text-yellow-300 font-bold mb-2">== CATAT PENJUALAN ==</p>
                        <p className="text-zinc-300">Masukkan Nominal Penjualan (Rp):</p>
                        <p className="text-zinc-400 text-[10px]">Contoh: 25000</p>
                      </div>
                    )}

                    {ussdStep === 3 && (
                      <div>
                        <p className="text-yellow-300 font-bold mb-2">== KETERANGAN TRANSAKSI ==</p>
                        <p className="text-zinc-300">Nominal: Rp {Number(ussdAmount).toLocaleString("id-ID")}</p>
                        <p className="text-zinc-300 mt-1">Masukkan Keterangan / Nama Pembeli:</p>
                        <p className="text-zinc-400 text-[10px]">Contoh: Beras 2kg atau Warung Depan</p>
                      </div>
                    )}

                    {ussdStep === 4 && (
                      <div>
                        <p className="text-yellow-300 font-bold mb-2">== RINGKASAN HARI INI ==</p>
                        <p>Total Transaksi: {totalCount} Trx</p>
                        <p>Total Omzet: Rp {totalRevenue.toLocaleString("id-ID")}</p>
                        <p className="text-[#4ade80] mt-2">Data tersinkron otomatis ke server.</p>
                      </div>
                    )}

                    {ussdStep === 5 && (
                      <div>
                        <p className="text-yellow-300 font-bold mb-2">== SKOR GIAT ANDA ==</p>
                        <p>Skor: {scoreDetail.totalScore} ({scoreDetail.grade})</p>
                        <p>Plafon Pinjaman: Rp {(scoreDetail.maxLoanLimit / 1000000).toFixed(0)} Jt</p>
                        <p className="text-[#4ade80] mt-2">Status: Feasible &amp; Siap Diajukan.</p>
                      </div>
                    )}

                    {ussdStep === 6 && (
                      <div>
                        <p className="text-[#4ade80] font-bold mb-2">✅ TRANSAKSI BERHASIL DICATAT!</p>
                        <p>Nominal: Rp {Number(ussdAmount).toLocaleString("id-ID")}</p>
                        <p className="text-zinc-400 text-[11px] mt-1">
                          Riwayat otomatis ditambahkan ke skor alternatif UMKM Anda.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Terminal Input Form */}
                  <form onSubmit={handleUssdSubmit} className="pt-3 border-t border-zinc-800 flex gap-2">
                    <input
                      type="text"
                      className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#4ade80] font-mono"
                      placeholder={ussdStep === 0 ? "*141*98#" : "Ketik respon..."}
                      value={ussdInput}
                      onChange={(e) => setUssdInput(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#4ade80] hover:bg-emerald-400 text-zinc-950 font-black text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Kirim
                    </button>
                    {ussdStep > 0 && (
                      <button
                        type="button"
                        onClick={resetUssd}
                        className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-xl cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </form>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                  <strong>💡 Relevansi Statistik Spasial:</strong> Hasil analisis ekonometrika menemukan Klaster <strong>Deep Sleepers</strong> terkonsentrasi di daerah 3T dengan penetrasi sinyal 4G terbatas. Inovasi USSD memastikan tidak ada satupun UMKM yang tereliminasi dari pencatatan data formal.
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column (5 cols): Live Transaction Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#082046]" />
              <h3 className="font-black text-[#082046] dark:text-white">
                Riwayat Transaksi Terkini
              </h3>
            </div>
            <Badge variant="navy" className="font-mono text-xs">
              {umkmTransactions.length} Data
            </Badge>
          </div>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {umkmTransactions.map((trx) => (
              <div
                key={trx.id}
                className="infographic-card p-4 flex flex-col justify-between gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="font-black text-sm text-[#082046] dark:text-white">
                      {trx.customerName}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-blue-200/70">
                      {trx.category}
                    </p>
                  </div>
                  <span className="font-black text-sm text-emerald-600 dark:text-emerald-400 shrink-0">
                    +Rp {trx.amount.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-blue-100 dark:border-blue-900/40 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono font-bold text-[10px] ${
                        trx.method === "QRIS"
                          ? "bg-blue-100 text-[#082046]"
                          : trx.method === "USSD Mode"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {trx.method}
                    </span>
                    <span className="font-mono text-[10px] truncate max-w-[120px]">
                      {trx.referenceNumber}
                    </span>
                  </div>
                  <span>{new Date(trx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-200 dark:border-blue-800 text-center">
            <p className="text-xs text-slate-600 dark:text-blue-100/80">
              Transaksi yang tercatat otomatis mengalir ke algoritma pembobotan <strong>GIAT Score</strong>.
            </p>
            <Link href="/score" className="mt-3 inline-block w-full">
              <Button variant="navy" size="sm" className="w-full gap-2 text-xs font-bold">
                <span>Periksa Kenaikan Skor Kredit</span>
                <ArrowRight className="h-3.5 w-3.5 text-amber-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Digital Receipt Modal */}
      <DigitalReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        transaction={latestReceipt}
        umkm={activeUmkm}
      />
    </div>
  );
}
