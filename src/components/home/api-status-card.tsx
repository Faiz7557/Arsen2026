"use client";

import { useState } from "react";
import { Activity, CheckCircle2, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ApiStatusCard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    status?: string;
    message?: string;
    timestamp?: string;
    framework?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkApi() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/health");
      if (!res.ok) throw new Error("Gagal mengambil data dari server");
      const json = await res.json();
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-blue-200 dark:border-blue-800 bg-white dark:bg-[#071c3b] shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#082046] dark:text-blue-300" />
            <CardTitle>Tes API Route (Health Check)</CardTitle>
          </div>
          <Badge variant={data ? "success" : "navy"}>
            {data ? "Online" : "Siap Ditest"}
          </Badge>
        </div>
        <CardDescription>
          Uji endpoint backend <code>/api/health</code> secara langsung dari browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] p-4 font-mono text-xs overflow-x-auto border border-blue-100 dark:border-blue-900/40">
          {loading ? (
            <div className="flex items-center gap-2 text-slate-500">
              <RefreshCw className="h-4 w-4 animate-spin text-[#0284c7]" />
              <span>Memanggil endpoint /api/health...</span>
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 text-rose-500 font-bold">
              <AlertCircle className="h-4 w-4" />
              <span>Error: {error}</span>
            </div>
          ) : data ? (
            <pre className="text-emerald-700 dark:text-emerald-400 font-bold">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (
            <span className="text-slate-500">
              Klik tombol di bawah untuk mengetes komunikasi API.
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="navy"
            onClick={checkApi}
            disabled={loading}
            className="gap-2 font-bold cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Memuat...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 text-amber-300" />
                <span>Trigger API Health</span>
              </>
            )}
          </Button>

          {data?.timestamp && (
            <span className="text-[11px] text-slate-400 font-mono">
              Response: {new Date(data.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
