interface BarChartProps {
  data: number[];
  labels: string[];
  height?: number;
  formatValue?: (n: number) => string;
}

export default function BarChart({ data, labels, height = 220, formatValue }: BarChartProps) {
  const max = Math.max(...data, 1);
  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2" style={{ height }}>
        {data.map((v, i) => {
          const pct = (v / max) * 100;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative flex w-full flex-1 items-end justify-center">
                <div
                  className="group relative w-full max-w-[44px] rounded-t-lg bg-gradient-to-t from-brand-500 to-brand-400 transition-all hover:from-brand-600 hover:to-brand-500"
                  style={{ height: `${Math.max(pct, 3)}%` }}
                >
                  <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {formatValue ? formatValue(v) : v.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-500">{labels[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
