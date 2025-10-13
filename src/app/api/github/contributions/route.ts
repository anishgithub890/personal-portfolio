import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'anishgithub890';
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!username) {
      return new Response(JSON.stringify({ error: 'Missing username' }), { status: 400 });
    }

    // Validate date format if provided (YYYY-MM-DD)
    const isValidDate = (value: string | null) => !!value && /^\d{4}-\d{2}-\d{2}$/.test(value);

    // If we have a token and a valid date range, use GitHub GraphQL for reliable data
    const token = process.env.GITHUB_TOKEN;
    if (token && isValidDate(from) && isValidDate(to)) {
      const gql = `
        query($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    color
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      const gqlRes = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'PortfolioSite/1.0'
        },
        body: JSON.stringify({
          query: gql,
          variables: { login: username, from, to }
        }),
        cache: 'no-store'
      });

      if (gqlRes.ok) {
        const data = await gqlRes.json();
        const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks as Array<{ contributionDays: Array<{ color: string; date: string; contributionCount: number }> }>;
        const total = data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions as number | undefined;

        if (Array.isArray(weeks) && weeks.length > 0) {
          const cell = 12;
          const gap = 3;
          const width = weeks.length * (cell + gap) + gap;
          const height = 7 * (cell + gap) + gap + 40; // extra for title

          const rects: string[] = [];
          weeks.forEach((week, wi) => {
            week.contributionDays.forEach((day, di) => {
              const x = gap + wi * (cell + gap);
              const y = 30 + gap + di * (cell + gap);
              const fill = day.color || '#ebedf0';
              const title = `${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}`;
              rects.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" ry="2" fill="${fill}"><title>${title}</title></rect>`);
            });
          });

          const heading = `GitHub Contributions${typeof total === 'number' ? ` • ${total} total` : ''}`;
          const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${heading}">
  <title>${heading}</title>
  <style>
    text{font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Noto Sans', 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; fill: #6a737d}
  </style>
  <text x="0" y="18" font-size="14" font-weight="600">${heading}</text>
  ${rects.join('\n  ')}
</svg>`;

          return new Response(svg, {
            status: 200,
            headers: {
              'Content-Type': 'image/svg+xml; charset=utf-8',
              'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
            }
          });
        }
      }
      // if GraphQL fails, fall through to scraping
    }

    const qs = new URLSearchParams();
    if (isValidDate(from)) qs.set('from', from as string);
    if (isValidDate(to)) qs.set('to', to as string);

    const githubUrl = `https://github.com/users/${encodeURIComponent(username)}/contributions${qs.toString() ? `?${qs.toString()}` : ''}`;

    const response = await fetch(githubUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PortfolioSite/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': `https://github.com/${encodeURIComponent(username)}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch contributions' }), { status: response.status });
    }

    const text = await response.text();
    // Extract the first <svg>...</svg> block if the response is HTML
    const match = text.match(/<svg[\s\S]*?<\/svg>/i);
    const svgContent = match ? match[0] : text;

    if (!svgContent.toLowerCase().includes('<svg')) {
      // Third fallback: public contributions API (no token) -> generate SVG
      if (isValidDate(from) && isValidDate(to)) {
        try {
          const apiUrl = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?from=${from}&to=${to}`;
          const altRes = await fetch(apiUrl, { cache: 'no-store', headers: { 'User-Agent': 'PortfolioSite/1.0' } });
          if (altRes.ok) {
            const altData = await altRes.json();
            // Try "weeks" shape first
            const weeks = (altData?.weeks || altData?.data?.weeks) as Array<{ contributionDays: Array<{ color?: string; date: string; count?: number; contributionCount?: number; level?: number }> }> | undefined;
            if (Array.isArray(weeks) && weeks.length > 0) {
              const cell = 12;
              const gap = 3;
              const width = weeks.length * (cell + gap) + gap;
              const height = 7 * (cell + gap) + gap + 40;
              const rects: string[] = [];
              weeks.forEach((week, wi) => {
                week.contributionDays.forEach((day, di) => {
                  const x = gap + wi * (cell + gap);
                  const y = 30 + gap + di * (cell + gap);
                  const count = day.contributionCount ?? day.count ?? 0;
                  const fill = day.color || (count > 0 ? '#40c463' : '#ebedf0');
                  const title = `${day.date}: ${count} contribution${count === 1 ? '' : 's'}`;
                  rects.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" ry="2" fill="${fill}"><title>${title}</title></rect>`);
                });
              });
              const heading = `GitHub Contributions`;
              const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${heading}">
  <title>${heading}</title>
  ${rects.join('\n  ')}
</svg>`;
              return new Response(svg, {
                status: 200,
                headers: {
                  'Content-Type': 'image/svg+xml; charset=utf-8',
                  'Cache-Control': 's-maxage=1800, stale-while-revalidate=86400'
                }
              });
            }

            // Try flat contributions array fallback
            const contributions = (altData?.contributions || altData?.data?.contributions) as Array<{ date: string; color?: string; count?: number; contributionCount?: number; level?: number }> | undefined;
            if (Array.isArray(contributions) && contributions.length > 0 && from && to) {
              const cell = 12;
              const gap = 3;
              const fromDate = new Date(from);
              const toDate = new Date(to);
              const startDow = fromDate.getUTCDay(); // 0..6
              const totalDays = Math.max(0, Math.floor((toDate.getTime() - fromDate.getTime()) / 86400000) + 1);
              const cols = Math.ceil((startDow + totalDays) / 7);
              const width = cols * (cell + gap) + gap;
              const height = 7 * (cell + gap) + gap + 40;
              const byDate = new Map(contributions.map(d => [d.date, d]));
              const rects: string[] = [];
              for (let i = 0; i < totalDays; i++) {
                const date = new Date(fromDate.getTime() + i * 86400000);
                const dateStr = date.toISOString().slice(0, 10);
                const idx = startDow + i;
                const col = Math.floor(idx / 7);
                const row = idx % 7;
                const x = gap + col * (cell + gap);
                const y = 30 + gap + row * (cell + gap);
                const entry = byDate.get(dateStr);
                const count = entry?.contributionCount ?? entry?.count ?? 0;
                const palette = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
                const fill = entry?.color || palette[Math.min(4, Math.max(0, entry?.level ?? (count > 15 ? 4 : count > 9 ? 3 : count > 4 ? 2 : count > 0 ? 1 : 0)))];
                const title = `${dateStr}: ${count} contribution${count === 1 ? '' : 's'}`;
                rects.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" ry="2" fill="${fill}"><title>${title}</title></rect>`);
              }
              const heading = `GitHub Contributions`;
              const svg = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${width}\" height=\"${height}\" viewBox=\"0 0 ${width} ${height}\" role=\"img\" aria-label=\"${heading}\">\n  <title>${heading}</title>\n  ${rects.join('\n  ')}\n</svg>`;
              return new Response(svg, {
                status: 200,
                headers: {
                  'Content-Type': 'image/svg+xml; charset=utf-8',
                  'Cache-Control': 's-maxage=1800, stale-while-revalidate=86400'
                }
              });
            }
          }
        } catch (_err) {
          // ignore and fall through to 502
        }
      }

      // Try alternative API without date filters as a degraded fallback
      try {
        const altUrl = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`;
        const altRes2 = await fetch(altUrl, { cache: 'no-store', headers: { 'User-Agent': 'PortfolioSite/1.0' } });
        if (altRes2.ok) {
          const altData2 = await altRes2.json();
          const weeks2 = (altData2?.weeks || altData2?.data?.weeks) as Array<{ contributionDays: Array<{ color?: string; date: string; count?: number; contributionCount?: number; level?: number }> }> | undefined;
          if (Array.isArray(weeks2) && weeks2.length > 0) {
            const cell = 12;
            const gap = 3;
            const width = weeks2.length * (cell + gap) + gap;
            const height = 7 * (cell + gap) + gap + 40;
            const rects: string[] = [];
            weeks2.forEach((week, wi) => {
              week.contributionDays.forEach((day, di) => {
                const x = gap + wi * (cell + gap);
                const y = 30 + gap + di * (cell + gap);
                const count = day.contributionCount ?? day.count ?? 0;
                const fill = day.color || (count > 0 ? '#40c463' : '#ebedf0');
                const title = `${day.date}: ${count} contribution${count === 1 ? '' : 's'}`;
                rects.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" ry="2" fill="${fill}"><title>${title}</title></rect>`);
              });
            });
            const heading = `GitHub Contributions`;
            const svg2 = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${width}\" height=\"${height}\" viewBox=\"0 0 ${width} ${height}\" role=\"img\" aria-label=\"${heading}\">\n  <title>${heading}</title>\n  ${rects.join('\n  ')}\n</svg>`;
            return new Response(svg2, {
              status: 200,
              headers: {
                'Content-Type': 'image/svg+xml; charset=utf-8',
                'Cache-Control': 's-maxage=1800, stale-while-revalidate=86400'
              }
            });
          }
        }
      } catch (_err) {
        // ignore
      }

      // Final fallback: ghchart (no custom range)
      try {
        const chartUrl = `https://ghchart.rshah.org/40c463/${encodeURIComponent(username)}`;
        const chartRes = await fetch(chartUrl, { cache: 'no-store', headers: { 'User-Agent': 'PortfolioSite/1.0' } });
        if (chartRes.ok) {
          const chartSvg = await chartRes.text();
          if (chartSvg.toLowerCase().includes('<svg')) {
            return new Response(chartSvg, {
              status: 200,
              headers: {
                'Content-Type': 'image/svg+xml; charset=utf-8',
                'Cache-Control': 's-maxage=1800, stale-while-revalidate=86400'
              }
            });
          }
        }
      } catch (_err) {
        // ignore
      }

      return new Response(JSON.stringify({ error: 'No SVG found in response' }), { status: 502 });
    }

    return new Response(svgContent, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}


