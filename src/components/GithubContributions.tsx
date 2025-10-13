'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface GithubContributionsProps {
  username?: string;
  from?: string; // YYYY-MM-DD
  to?: string;   // YYYY-MM-DD
}

type Day = { date: string; count: number; color?: string; level?: number };
type Week = { days: Day[] };

export default function GithubContributions({ username, from, to }: GithubContributionsProps) {
  const [weeks, setWeeks] = useState<Week[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [svgFallback, setSvgFallback] = useState<string | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<{
    x: number;
    y: number;
    date: string;
    count: number;
    visible: boolean;
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setError(null);
        const params = new URLSearchParams();
        if (username) params.set('username', username);
        if (from) params.set('from', from);
        if (to) params.set('to', to);
        const res = await fetch(`/api/github/contributions-json?${params.toString()}`, { signal: controller.signal, cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load contributions');
        const data = await res.json();
        const w = data.weeks || [];
        setWeeks(w);
        setTotal(typeof data.total === 'number' ? data.total : null);
        // Determine if there are any contributions in the requested range
        const hasAnyInRange = Array.isArray(w)
          ? w.some((week: Week) =>
              week.days.some((d: Day) => {
                if (from && to) {
                  const t = new Date(d.date).getTime();
                  return t >= new Date(from).getTime() && t <= new Date(to).getTime() && d.count > 0;
                }
                return d.count > 0;
              })
            )
          : false;
        if (!Array.isArray(w) || w.length === 0 || !hasAnyInRange) {
          try {
            const svgRes = await fetch(`/api/github/contributions?${params.toString()}`, { signal: controller.signal, cache: 'no-store' });
            if (svgRes.ok) {
              const svgText = await svgRes.text();
              setSvgFallback(svgText);
            } else {
              setSvgFallback(null);
            }
          } catch {
            setSvgFallback(null);
          }
        } else {
          setSvgFallback(null);
        }
      } catch (err) {
        const isAbort = (err instanceof DOMException && err.name === 'AbortError') || (typeof err === 'object' && err !== null && 'name' in err && (err as { name?: unknown }).name === 'AbortError');
        if (!isAbort) {
          try {
            const params = new URLSearchParams();
            if (username) params.set('username', username);
            if (from) params.set('from', from);
            if (to) params.set('to', to);
            const svgRes = await fetch(`/api/github/contributions?${params.toString()}`, { signal: controller.signal, cache: 'no-store' });
            if (svgRes.ok) {
              const svgText = await svgRes.text();
              setSvgFallback(svgText);
              setError(null);
            } else {
              setError('Unable to load GitHub contributions right now.');
            }
          } catch {
            setError('Unable to load GitHub contributions right now.');
          }
        }
      }
    };
    fetchData();
    return () => controller.abort();
  }, [username, from, to]);

  // Sizes chosen to closely match GitHub's visual density
  const cell = 11;
  const gap = 2;
  const palette = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

  const getFill = (d: Day) => {
    if (d.color) return d.color;
    const lvl = d.level ?? (d.count > 15 ? 4 : d.count > 9 ? 3 : d.count > 4 ? 2 : d.count > 0 ? 1 : 0);
    return palette[Math.min(4, Math.max(0, lvl))];
  };

  const monthLabels = (weeksInput: Week[]) => {
    if (!weeksInput || weeksInput.length === 0) return [] as Array<{ x: number; label: string }>;
    const labels: Array<{ x: number; label: string }> = [];
    for (let wi = 0; wi < weeksInput.length; wi++) {
      const firstDay = weeksInput[wi].days?.[0]?.date;
      if (!firstDay) continue;
      const date = new Date(firstDay);
      if (date.getUTCDate() <= 7) {
        const x = gap + wi * (cell + gap);
        const label = date.toLocaleString('en-US', { month: 'short' });
        // Avoid duplicates when month spans multiple consecutive weeks
        if (labels.length === 0 || labels[labels.length - 1].label !== label) {
          labels.push({ x, label });
        }
      }
    }
    return labels;
  };

  const showTooltip = (wi: number, di: number, d: Day) => {
    // Compute coordinates in the SVG's pixel space
    const x = gap + wi * (cell + gap);
    const y = 10 + gap + di * (cell + gap);
    setHover({ x, y, date: d.date, count: d.count, visible: true });
  };

  const hideTooltip = () => setHover(null);

  const isWithinRange = (dateStr: string) => {
    if (!from || !to) return true;
    const t = new Date(dateStr).getTime();
    const f = new Date(from).getTime();
    const tt = new Date(to).getTime();
    return t >= f && t <= tt;
  };

  const trimWeeksToRange = (w: Week[] | null): Week[] | null => {
    if (!w || !from || !to) return w;
    let startIdx = 0;
    let endIdx = w.length - 1;
    for (let i = 0; i < w.length; i++) {
      if (w[i].days.some((d) => isWithinRange(d.date))) {
        startIdx = i;
        break;
      }
    }
    for (let i = w.length - 1; i >= 0; i--) {
      if (w[i].days.some((d) => isWithinRange(d.date))) {
        endIdx = i;
        break;
      }
    }
    const sliced = w.slice(startIdx, endIdx + 1).map((week) => ({
      days: week.days.map((d) => ({ ...d }))
    }));
    return sliced;
  };

  const formatDateDDMMMyyyy = (dateStr: string) => {
    const d = new Date(dateStr);
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const mon = d.toLocaleString('en-US', { month: 'short' });
    const yyyy = d.getUTCFullYear();
    return `${dd}-${mon}-${yyyy}`;
  };

  // Derived values used for rendering
  const weeksInView: Week[] = (weeks ? (trimWeeksToRange(weeks) || weeks) : []) as Week[];
  const svgW = weeksInView.length * (cell + gap) + gap;
  const svgH = 7 * (cell + gap) + gap + 14;
  const displayTotal = (from && to)
    ? weeksInView.reduce((acc, w) => acc + w.days.reduce((a, d) => a + (isWithinRange(d.date) ? d.count : 0), 0), 0)
    : (typeof total === 'number' ? total : 0);
  const tooltipStyle: CSSProperties | undefined = hover
    ? (() => {
        const cont = gridContainerRef.current;
        let left = (hover.x + 18) - (cont?.scrollLeft || 0) + 2;
        let top = (hover.y + 18) - (cont?.scrollTop || 0) + 2;
        left = Math.max(0, Math.min(left, svgW - 160));
        top = Math.max(0, Math.min(top, svgH - 48));
        return { left, top } as CSSProperties;
      })()
    : undefined;

  // Build daily sequence within range for timeline
  type Daily = { date: string; count: number };
  const dailyInRange: Daily[] = (() => {
    if (!from || !to || !weeksInView || weeksInView.length === 0) return [];
    const map = new Map<string, number>();
    weeksInView.forEach((w) => w.days.forEach((d) => {
      if (isWithinRange(d.date)) {
        map.set(d.date, (map.get(d.date) || 0) + (d.count || 0));
      }
    }));
    const startMs = new Date(from).getTime();
    const endMs = new Date(to).getTime();
    const dayMs = 86400000;
    const arr: Daily[] = [];
    for (let t = startMs; t <= endMs; t += dayMs) {
      const dateStr = new Date(t).toISOString().slice(0, 10);
      arr.push({ date: dateStr, count: map.get(dateStr) || 0 });
    }
    return arr;
  })();

  const timeline = (() => {
    if (!dailyInRange || dailyInRange.length === 0) return null;
    const padX = 8;
    const padY = 6;
    const height = 60;
    const width = Math.max(320, Math.min(900, dailyInRange.length * 4 + padX * 2));
    const innerW = width - padX * 2;
    const innerH = height - padY * 2;
    const maxCount = Math.max(1, ...dailyInRange.map(d => d.count));
    const stepX = innerW / Math.max(1, dailyInRange.length - 1);
    const points = dailyInRange.map((d, i) => {
      const x = padX + i * stepX;
      const y = padY + (innerH - (d.count / maxCount) * innerH);
      return `${x},${y}`;
    }).join(' ');
    // Month ticks at first of month
    const ticks: Array<{ x: number; label: string }> = [];
    for (let i = 0; i < dailyInRange.length; i++) {
      const dt = new Date(dailyInRange[i].date);
      if (dt.getUTCDate() === 1) {
        const x = padX + i * stepX;
        const label = dt.toLocaleString('en-US', { month: 'short' });
        if (ticks.length === 0 || ticks[ticks.length - 1].label !== label) {
          ticks.push({ x, label });
        }
      }
    }
    return { width, height, padX, padY, points, ticks };
  })();

  return (
    <section id="github" className="py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-10"
        >
          <h2 className="text-2xl xxs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 xxs:mb-3 sm:mb-4">
            GitHub <span className="gradient-text">Contributions</span>
          </h2>
          {from && to && (
            <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto">
              {formatDateDDMMMyyyy(from)} → {formatDateDDMMMyyyy(to)}
            </p>
          )}
        </motion.div>

        <Card className="max-w-5xl mx-auto">
          <CardContent className="p-3 sm:p-4 md:p-6 overflow-auto">
            {error && (
              <div className="text-center py-8">
                <p className="text-sm text-destructive mb-2">{error}</p>
                <p className="text-xs text-foreground/60">Please check back later</p>
              </div>
            )}
            {!error && !weeks && (
              <div className="h-32 sm:h-40 flex items-center justify-center text-foreground/60 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading contributions...</span>
                </div>
              </div>
            )}
            {!error && weeks && (
              <div className="flex flex-col gap-4">
                {/* Contribution Grid */}
                {(() => {
                  if (weeksInView.length === 0 && svgFallback) {
                    return (
                      <div className="w-full overflow-x-auto -mx-2 px-2">
                        <div 
                          className="min-w-[300px] xxs:min-w-[400px] xs:min-w-[500px] sm:min-w-0 max-w-full" 
                          dangerouslySetInnerHTML={{ __html: svgFallback }} 
                          style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto', height: 'auto' }}
                        />
                      </div>
                    );
                  }
                  
                  if (weeksInView.length === 0) {
                    return <p className="text-sm text-foreground/60 text-center py-4">No contributions in this range.</p>;
                  }

                  const monthLbls = monthLabels(weeksInView);
                  
                  return (
                    <div className="w-full overflow-x-auto -mx-2 px-2 pb-2">
                      <div className="flex justify-center">
                        <div className="relative" ref={gridContainerRef}>
                          <svg width={svgW} height={svgH}>
                            {/* Month labels */}
                            {monthLbls.map((m, i) => (
                              <text key={i} x={m.x} y={10} fontSize="10" fill="currentColor" className="text-foreground/60">
                                {m.label}
                              </text>
                            ))}
                            
                            {/* Day labels */}
                            {['Mon', 'Wed', 'Fri'].map((day, i) => (
                              <text 
                                key={day} 
                                x={0} 
                                y={14 + gap + (i * 2 + 1) * (cell + gap) + cell / 2} 
                                fontSize="9" 
                                fill="currentColor" 
                                className="text-foreground/60"
                                textAnchor="end"
                                dominantBaseline="middle"
                              >
                                {day}
                              </text>
                            ))}
                            
                            {/* Contribution squares */}
                            <g transform="translate(20, 0)">
                              {weeksInView.map((week, wi) =>
                                week.days.map((d, di) => {
                                  if (!isWithinRange(d.date)) return null;
                                  const x = gap + wi * (cell + gap);
                                  const y = 14 + gap + di * (cell + gap);
                                  return (
                                    <rect
                                      key={`${wi}-${di}`}
                                      x={x}
                                      y={y}
                                      width={cell}
                                      height={cell}
                                      rx={2}
                                      fill={getFill(d)}
                                      className="transition-all duration-200 hover:ring-2 hover:ring-primary cursor-pointer"
                                      onMouseEnter={() => showTooltip(wi, di, d)}
                                      onMouseLeave={hideTooltip}
                                    />
                                  );
                                })
                              )}
                            </g>
                          </svg>
                          
                          {/* Tooltip */}
                          {hover && (
                            <div
                              className="absolute z-10 bg-popover border border-border rounded-md shadow-lg px-3 py-2 text-xs pointer-events-none"
                              style={tooltipStyle}
                            >
                              <div className="font-semibold">{hover.count} contributions</div>
                              <div className="text-muted-foreground">{formatDateDDMMMyyyy(hover.date)}</div>
                            </div>
                          )}
                        </div>
                        
                        {/* Legend */}
                        {/* <div className="flex items-center justify-center gap-2 mt-4 text-xs text-foreground/60">
                          <span>Less</span>
                          {palette.map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                          <span>More</span>
                        </div> */}
                      </div>
                    </div>
                  );
                })()}
                
                {/* Stats summary */}
                {displayTotal > 0 && (
                  <div className="text-center pt-2 border-t">
                    <p className="text-sm font-medium">
                      <span className="text-2xl font-bold text-primary">{displayTotal}</span>
                      <span className="text-foreground/70 ml-2">total contributions</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


