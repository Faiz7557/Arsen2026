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
    <Card className="border-blue-500/20 bg-gradient-to-br from-white to-blue-50/30 dark:from-zinc-900 dark:to-blue-950/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle>Tes API Route (Health Check)</CardTitle>
          </div>
          <Badge variant={data ? "success" : "default"}>
            {data ? "Online" : "Siap Ditest"}
          </Badge>
        </div>
        <CardDescription>
          Uji endpoint backend <code>/api/health</code> secara langsung dari browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-zinc-100 dark:bg-zinc-950 p-4 font-mono text-xs overflow-x-auto border border-zinc-200 dark:border-zinc-800">
          {loading ? (
            <div className="flex items-center gap-2 text-zinc-500">
              <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
              <span>Memanggil endpoint /api/health...</span>
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 text-rose-500">
              <AlertCircle className="h-4 w-4" />
              <span>Error: {error}</span>
            </div>
          ) : data ? (
            <pre className="text-emerald-600 dark:text-emerald-400">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (
            <span className="text-zinc-500">
              Klik tombol di bawah untuk mengetes komunikasi API.
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button
            size="sm"
            onClick={checkApi}
            disabled={loading}
            className="gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Memuat...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Trigger API Health</span>
              </>
            )}
          </Button>

          {data?.timestamp && (
            <span className="text-[11px] text-zinc-400">
              Response: {new Date(data.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
