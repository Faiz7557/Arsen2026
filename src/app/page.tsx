import {
  Code2,
  Rocket,
  ShieldCheck,
  Zap,
  LayoutGrid,
  ExternalLink,
  Database,
  Palette,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApiStatusCard } from "@/components/home/api-status-card";

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Next.js 16 (App Router)",
      description: "Arsitektur terkini dengan Server Components, Turbopack, dan performa super cepat.",
      badge: "Core",
    },
    {
      icon: Palette,
      title: "Tailwind CSS v4",
      description: "Styling utility-first modern generasi terbaru yang efisien dan responsif.",
      badge: "Design",
    },
    {
      icon: ShieldCheck,
      title: "Full TypeScript Strict",
      description: "Type safety menyeluruh untuk meminimalisir bug dan mempercepat proses prototyping.",
      badge: "Safety",
    },
    {
      icon: LayoutGrid,
      title: "Modular Component System",
      description: "Komponen UI siap pakai (Button, Card, Badge, Modal) terstruktur rapi di /src/components.",
      badge: "UI Kit",
    },
    {
      icon: Database,
      title: "API Route Ready",
      description: "Dukungan backend terintegrasi dengan Next.js Route Handlers di /src/app/api.",
      badge: "Backend",
    },
    {
      icon: Terminal,
      title: "Production Ready",
      description: "Dilengkapi ESLint, validasi build, environment variable sample, dan git repository.",
      badge: "Quality",
    },
  ];

  const projectStructure = [
    { path: "src/app/", desc: "Next.js App Router (pages, layout, API routes)" },
    { path: "src/components/ui/", desc: "Reusable atomic UI components" },
    { path: "src/components/layout/", desc: "Layout components (Navbar, Footer, Sidebar)" },
    { path: "src/lib/", desc: "Helper utilities & functions (e.g. cn class merger)" },
    { path: "src/hooks/", desc: "Custom React hooks untuk state & logika" },
    { path: "src/types/", desc: "Definisi tipe data TypeScript global" },
    { path: "public/", desc: "Static assets (images, icons, fonts)" },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-28">
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="default" className="py-1 px-3 text-xs">
            🚀 Arsen 2026 Prototype
          </Badge>
          <Badge variant="success" className="py-1 px-3 text-xs">
            Siap Dikembangkan
          </Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl mx-auto leading-tight">
          Next.js Enterprise Stack Siap Pakai untuk Inovasi{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Arsen 2026
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Fondasi lengkap dengan Next.js 16, React 19, TypeScript, Tailwind CSS v4, Lucide Icons, dan arsitektur modular yang rapi.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#features">
            <Button size="lg" className="gap-2 shadow-lg shadow-blue-500/25">
              <Rocket className="h-5 w-5" />
              <span>Jelajahi Fitur</span>
            </Button>
          </a>
          <a href="#structure">
            <Button variant="outline" size="lg" className="gap-2">
              <Code2 className="h-5 w-5" />
              <span>Struktur Folder</span>
            </Button>
          </a>
        </div>
      </section>

      {/* Live API Tester & Quick Metrics */}
      <section id="tech-stack" className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 scroll-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <ApiStatusCard />
          </div>

          <Card className="bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
            <CardHeader>
              <CardTitle className="text-base">Spesifikasi Proyek</CardTitle>
              <CardDescription>Detail konfigurasi environment saat ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-500">Framework</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Next.js 16.3.6 (App Router)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-500">React Core</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">React 19.2.8</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-500">Styling</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Tailwind CSS v4</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-500">Language</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">TypeScript 5</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-zinc-500">Linter</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">ESLint 9</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Fitur & Keunggulan Setup
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400">
            Segala kelengkapan yang Anda butuhkan untuk membangun prototype lomba berkualitas tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="hover:border-blue-500/50 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <Badge variant="outline">{item.badge}</Badge>
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Project Structure Section */}
      <section id="structure" className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16 border-t border-zinc-200/80 dark:border-zinc-800">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Struktur Direktori Terorganisir
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400">
            Didesain rapi sesuai best practice industri agar kode mudah dikembangkan bersama tim.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Direktori & Tanggung Jawab
            </span>
            <span className="text-xs text-zinc-400">src/ based</span>
          </div>
          <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800">
            {projectStructure.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-3.5 gap-2 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                <code className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {item.path}
                </code>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Step Banner */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-12 text-white shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">Siap Mengembangkan Prototype?</h3>
            <p className="mt-2 text-blue-100 max-w-xl text-sm sm:text-base">
              Buka <code className="bg-white/20 px-2 py-0.5 rounded text-white font-mono">src/app/page.tsx</code> untuk mulai menyesuaikan halaman dengan konsep prototype lomba Arsen 2026.
            </p>
          </div>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="secondary" size="lg" className="gap-2 shrink-0">
              <span>Dokumentasi Next.js</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
