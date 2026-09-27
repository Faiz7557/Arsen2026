export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-8 text-sm text-zinc-500 dark:text-zinc-400">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-zinc-600 dark:text-zinc-300 font-medium">
            Arsen 2026 Prototype Project
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
            Built with Next.js 16 (App Router), React 19, TypeScript & Tailwind CSS
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <span>&copy; {new Date().getFullYear()} Prototype Arsen Team. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
