import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobile: () => void;
}

const NOTIFS = [
  { id: 1, text: 'Transaksi baru INV-...0042 berhasil', time: '5 menit lalu', unread: true },
  { id: 2, text: 'Stok "Donat Coklat" habis', time: '1 jam lalu', unread: true },
  { id: 3, text: 'Stok "Soto Ayam" menipis (0 tersisa)', time: '3 jam lalu', unread: true },
  { id: 4, text: 'Laporan harian siap dilihat', time: '1 hari lalu', unread: false },
];

export default function Header({ title, subtitle, onOpenMobile }: HeaderProps) {
  const [openNotif, setOpenNotif] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenNotif(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const unread = NOTIFS.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6">
      <button
        onClick={onOpenMobile}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-bold text-slate-800 md:text-lg">{title}</h1>
        {subtitle && <p className="hidden truncate text-xs text-slate-400 sm:block">{subtitle}</p>}
      </div>

      {/* Search (decorative) */}
      <div className="relative hidden md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari..."
          className="w-56 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      {/* Notifications */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpenNotif((o) => !o)}
          className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </button>

        {openNotif && (
          <div className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-semibold text-slate-700">Notifikasi</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {NOTIFS.map((n) => (
                <div key={n.id} className="flex gap-3 border-b border-slate-50 px-4 py-3 hover:bg-slate-50">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? 'bg-brand-500' : 'bg-slate-300'}`} />
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700">{n.text}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full px-4 py-2.5 text-center text-sm font-medium text-brand-600 hover:bg-slate-50">
              Tandai semua dibaca
            </button>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
          AD
        </div>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-700">Andi Pratama</p>
          <p className="text-xs text-slate-400">Kasir</p>
        </div>
      </div>
    </header>
  );
}
