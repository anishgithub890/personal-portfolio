import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type Day = { date: string; count: number; color?: string; level?: number };
type Week = { days: Day[] };

function isValidDate(value: string | null): value is string {
  return !!value && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function normalizeWeeksFromGraphQL(weeks: Array<{ contributionDays: Array<{ date: string; contributionCount: number; color?: string }> }>): Week[] {
  return weeks.map((w) => ({
    days: w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, color: d.color }))
  }));
}

function normalizeWeeksFromJogruber(data: any): Week[] | null {
  const weeks = (data?.weeks || data?.data?.weeks) as Array<{ contributionDays?: any[]; days?: any[] }> | undefined;
  if (Array.isArray(weeks)) {
    return weeks.map((w) => ({
      days: (w.contributionDays || w.days || []).map((d: any) => ({
        date: d.date,
        count: d.contributionCount ?? d.count ?? 0,
        color: d.color,
        level: d.level
      }))
    }));
  }
  const contributions = (data?.contributions || data?.data?.contributions) as Array<any> | undefined;
  if (Array.isArray(contributions)) {
    // Build continuous calendar from contributions array
    const byDate = new Map(contributions.map((d) => [d.date, d]));
    const dates = contributions.map((d) => d.date).sort();
    if (dates.length === 0) return [];
    const start = new Date(dates[0]);
    const end = new Date(dates[dates.length - 1]);
    const startDow = start.getUTCDay();
    const totalDays = Math.max(0, Math.floor((end.getTime() - start.getTime()) / 86400000) + 1);
    const cols = Math.ceil((startDow + totalDays) / 7);
    const result: Week[] = [];
    for (let c = 0; c < cols; c++) {
      const days: Day[] = [];
      for (let r = 0; r < 7; r++) {
        const idx = c * 7 + r - startDow;
        const date = new Date(start.getTime() + idx * 86400000);
        const dateStr = date.toISOString().slice(0, 10);
        const src = byDate.get(dateStr);
        const count = src?.contributionCount ?? src?.count ?? 0;
        days.push({ date: dateStr, count, color: src?.color, level: src?.level });
      }
      result.push({ days });
    }
    return result;
  }
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'anishgithub890';
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!username) {
      return NextResponse.json({ error: 'Missing username' }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    if (token && isValidDate(from) && isValidDate(to)) {
      const gql = `
        query($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays { date contributionCount color }
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
        body: JSON.stringify({ query: gql, variables: { login: username, from, to } }),
        cache: 'no-store'
      });
      if (gqlRes.ok) {
        const data = await gqlRes.json();
        const weeksRaw = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
        const total = data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
        const weeks = normalizeWeeksFromGraphQL(weeksRaw);
        return NextResponse.json({ username, from, to, total, weeks });
      }
    }

    // Fallback to public API with date filters
    if (isValidDate(from) && isValidDate(to)) {
      const apiUrl = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?from=${from}&to=${to}`;
      const res = await fetch(apiUrl, { cache: 'no-store', headers: { 'User-Agent': 'PortfolioSite/1.0' } });
      if (res.ok) {
        const data = await res.json();
        const weeks = normalizeWeeksFromJogruber(data);
        const total = data?.totalContributions ?? data?.data?.totalContributions ?? 0;
        if (weeks) return NextResponse.json({ username, from, to, total, weeks });
      }
    }

    // Final fallback without date filters
    const res2 = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`, { cache: 'no-store', headers: { 'User-Agent': 'PortfolioSite/1.0' } });
    if (res2.ok) {
      const data = await res2.json();
      const weeks = normalizeWeeksFromJogruber(data) ?? [];
      const total = data?.totalContributions ?? data?.data?.totalContributions ?? 0;
      return NextResponse.json({ username, total, weeks });
    }

    return NextResponse.json({ error: 'Unable to fetch contributions' }, { status: 502 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


