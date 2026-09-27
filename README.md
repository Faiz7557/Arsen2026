# Arsen 2026 - Prototype Project

Inisialisasi project Next.js modern, lengkap, dan terstruktur untuk pengembangan prototype kompetisi/inovasi Arsen 2026.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Library:** [React](https://react.dev/) 19
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/) 5
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** `clsx`, `tailwind-merge` (`cn` helper)
- **Linter & Formatter:** ESLint 9

---

## 📁 Struktur Direktori

```text
c:\Uner\Lomba\Arsen\2026\Prototype\
├── public/                 # Static assets (images, svg, favicons)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API Route handlers (contoh: /api/health)
│   │   ├── layout.tsx      # Root layout (Navbar & Footer included)
│   │   ├── page.tsx        # Homepage / Landing page prototype
│   │   └── globals.css     # Tailwind v4 configuration & base styles
│   ├── components/
│   │   ├── ui/             # Reusable atomic UI (Button, Card, Badge, dll)
│   │   ├── layout/         # Layout components (Navbar, Footer, dll)
│   │   └── home/           # Feature-specific components
│   ├── hooks/              # Custom React hooks (contoh: use-mounted)
│   ├── lib/                # Utilities & helpers (contoh: utils.ts / cn)
│   └── types/              # Definisi interface & type TypeScript
├── .env.example            # Template environment variables
├── .env.local              # Local environment configuration
├── next.config.ts          # Konfigurasi Next.js
├── package.json            # Daftar script & dependencies
└── tsconfig.json           # Konfigurasi TypeScript
```

---

## 🛠️ Cara Menjalankan

### 1. Development Server
Jalankan server pengembangan lokal:

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

### 2. Build Production
Untuk memastikan tidak ada type error atau linting issue:

```bash
npm run build
```

### 3. Production Server
Menjalankan hasil build:

```bash
npm run start
```

### 4. Linting
```bash
npm run lint
```

---

## 🔌 API Endpoint Bawaan

- **`GET /api/health`**
  - Return JSON status health check server untuk menguji konektivitas client-backend.
