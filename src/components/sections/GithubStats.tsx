"use client";

import { useEffect, useRef, useState } from "react";

const GITHUB_USERNAME = "Pritammandal77";

interface GitHubData {
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  avatar_url: string;
  html_url: string;
  created_at: string;
}

interface ContribDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContribWeek {
  contributionDays: ContribDay[];
}

// Fetches contribution data via GitHub GraphQL API (public, no auth needed via proxy)
// We'll use github-contributions-api as a fallback free endpoint
async function fetchContributions(username: string): Promise<ContribWeek[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    );
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    // This API returns { total, contributions: [{date, count, level}] }
    const contributions: ContribDay[] = data.contributions;
    // Group into weeks
    const weeks: ContribWeek[] = [];
    let week: ContribDay[] = [];
    // Fill leading empty days
    const firstDay = new Date(contributions[0].date).getDay();
    for (let i = 0; i < firstDay; i++) {
      week.push({ date: "", count: 0, level: 0 });
    }
    for (const day of contributions) {
      week.push(day);
      if (week.length === 7) {
        weeks.push({ contributionDays: week });
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push({ date: "", count: 0, level: 0 });
      weeks.push({ contributionDays: week });
    }
    return weeks;
  } catch {
    return [];
  }
}

function getLevelColor(level: number): string {
  const colors = [
    "bg-zinc-900 border-zinc-800",
    "bg-red-950 border-red-900",
    "bg-red-800 border-red-700",
    "bg-red-600 border-red-500",
    "bg-red-500 border-red-400",
  ];
  return colors[level] ?? colors[0];
}

function getLevelGlow(level: number): string {
  if (level === 0) return "";
  if (level === 1) return "shadow-[0_0_4px_rgba(127,29,29,0.4)]";
  if (level === 2) return "shadow-[0_0_6px_rgba(185,28,28,0.5)]";
  if (level === 3) return "shadow-[0_0_8px_rgba(239,68,68,0.6)]";
  return "shadow-[0_0_10px_rgba(239,68,68,0.8)]";
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function GitHubStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [ghData, setGhData] = useState<GitHubData | null>(null);
  const [weeks, setWeeks] = useState<ContribWeek[]>([]);
  const [totalContribs, setTotalContribs] = useState(0);
  const [hoveredDay, setHoveredDay] = useState<ContribDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [graphVisible, setGraphVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [userRes, contribWeeks] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetchContributions(GITHUB_USERNAME),
        ]);
        const user: GitHubData = await userRes.json();
        setGhData(user);
        setWeeks(contribWeeks);
        const total = contribWeeks.reduce(
          (acc, w) => acc + w.contributionDays.reduce((a, d) => a + d.count, 0),
          0,
        );
        setTotalContribs(total);
      } finally {
        setLoading(false);
        setTimeout(() => setGraphVisible(true), 300);
      }
    }
    load();
  }, []);

  const yearsOnGitHub = ghData
    ? new Date().getFullYear() - new Date(ghData.created_at).getFullYear()
    : 0;

  // Month labels for the graph
  const monthLabels: { label: string; weekIndex: number }[] = [];
  if (weeks.length > 0) {
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const day = week.contributionDays.find((d) => d.date);
      if (day?.date) {
        const m = new Date(day.date).getMonth();
        if (m !== lastMonth) {
          monthLabels.push({ label: MONTHS[m], weekIndex: wi });
          lastMonth = m;
        }
      }
    });
  }

  return (
    <>
      <section id="github" ref={sectionRef} className="gh-section">
        {/* Background layers */}
        <div className="gh-grid-bg" />
        <div className="gh-radial" />
        <div className="gh-aura-left" />
        <div className="gh-aura-right" />

        {/* Web corner */}
        <svg
          className="web-corner"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[40, 80, 120, 160, 200, 240].map((r, i) => (
            <circle
              key={i}
              cx="300"
              cy="0"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,255)" // 👈 balanced
              strokeWidth="0.8"
            />
          ))}

          {[0, 30, 60, 90, 120, 150, 180].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="300"
                y1="0"
                x2={300 + 250 * Math.cos(rad + Math.PI / 2)}
                y2={250 * Math.sin(rad + Math.PI / 2)}
                stroke="rgba(255,255,255,255)" // 👈 balanced
                strokeWidth="0.6"
              />
            );
          })}
        </svg>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* ===== HEADER ===== */}
          <div
            className={`mb-16 fade-up ${visible ? "show" : ""}`}
            style={{ transitionDelay: "0s" }}
          >
            <div className="inline-block px-4 py-1 mb-5 border border-red-500/30 rounded-full bg-red-500/5">
              <span
                className="text-red-500 text-xs font-bold uppercase tracking-[0.25em]"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                // github_stats
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.03em",
              }}
              className="text-5xl md:text-7xl text-gray-200 leading-none mb-4"
            >
              Code
              {/* <br /> */}
              <span className="ml-3 bg-linear-to-r from-red-600 to-pink-700 bg-clip-text text-transparent">
                Activity
              </span>
            </h2>
            <p
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-zinc-500 text-xs tracking-widest"
            >
              // Swinging through commits, one web at a time
            </p>
          </div>

          {/* ===== STAT CARDS ROW ===== */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-up ${visible ? "show" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            {[
              {
                label: "Repositories",
                value: ghData?.public_repos ?? "—",
                sub: "public projects",
              },
              {
                label: "Followers",
                value: ghData?.followers ?? "—",
                sub: "web-heads",
              },
              {
                label: "Following",
                value: ghData?.following ?? "—",
                sub: "in the network",
              },
              {
                label: "Contributions",
                value: totalContribs || "—",
                sub: "last 365 days",
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className="stat-card"
                style={{ transitionDelay: `${0.2 + i * 0.07}s` }}
              >
                <p className="stat-label">{s.label}</p>
                <p className="stat-value">
                  {loading ? (
                    <span className="skeleton inline-block w-14 h-10" />
                  ) : (
                    <>
                      {String(s.value).slice(0, -1)}
                      <span>{String(s.value).slice(-1)}</span>
                    </>
                  )}
                </p>
                <p className="stat-sub">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* ===== CONTRIBUTION GRAPH ===== */}
          <div
            className={`mb-8 fade-up ${visible ? "show" : ""}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="contrib-wrapper">
              {/* Graph header */}
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div>
                  <p
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    className="text-red-500 text-[10px] tracking-[0.25em] mb-1"
                  >
                    CONTRIBUTION_MATRIX //
                  </p>
                  <p
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    className="text-gray-300 font-semibold text-lg"
                  >
                    {totalContribs > 0
                      ? `${totalContribs} contributions in the last year`
                      : "Loading contribution data..."}
                  </p>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-2">
                  <span
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    className="text-[10px] text-zinc-600"
                  >
                    Less
                  </span>
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <div
                      key={lvl}
                      className={`legend-cell ${getLevelColor(lvl)}`}
                    />
                  ))}
                  <span
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    className="text-[10px] text-zinc-600"
                  >
                    More
                  </span>
                </div>
              </div>

              {/* Day labels left side */}
              <div className="flex gap-2">
                {/* Day of week labels */}
                <div className="flex flex-col gap-0.75 pt-5 shrink-0">
                  {DAYS.map((day, i) => (
                    <div
                      key={day}
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        height: "12px",
                      }}
                      className={`text-[9px] text-zinc-700 leading-3 ${i % 2 === 0 ? "opacity-100" : "opacity-0"}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Graph scroll area */}
                <div className="contrib-scroll flex-1">
                  <div className="contrib-inner">
                    {/* Month labels */}
                    <div className="flex mb-1" style={{ gap: "3px" }}>
                      {loading ? (
                        <div className="skeleton h-3 w-full" />
                      ) : (
                        weeks.map((_, wi) => {
                          const ml = monthLabels.find(
                            (m) => m.weekIndex === wi,
                          );
                          return (
                            <div
                              key={wi}
                              style={{ width: "16px", flexShrink: 0 }}
                            >
                              {ml && (
                                <span
                                  style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                  }}
                                  className="text-[9px] text-zinc-500 whitespace-nowrap block leading-none w-full"
                                >
                                  {ml.label}
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Cells grid */}
                    {loading ? (
                      <div className="flex gap-0.75">
                        {Array.from({ length: 53 }).map((_, wi) => (
                          <div key={wi} className="flex flex-col gap-0.75">
                            {Array.from({ length: 7 }).map((_, di) => (
                              <div
                                key={di}
                                className="skeleton"
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "2px",
                                }}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex gap-0.75 ">
                        {weeks.map((week, wi) => (
                          <div
                            key={wi}
                            className="flex flex-col gap-0.75  w-full"
                          >
                            {week.contributionDays.map((day, di) => (
                              <div
                                key={di}
                                className={`contrib-cell ${getLevelColor(day.level)} ${getLevelGlow(day.level)} ${graphVisible ? "contrib-cell-animate" : "opacity-0"}`}
                                style={{
                                  animationDelay: graphVisible
                                    ? `${(wi * 7 + di) * 3}ms`
                                    : "0ms",
                                }}
                                onMouseEnter={(e) => {
                                  if (day.date) {
                                    setHoveredDay(day);
                                    setTooltipPos({
                                      x: e.clientX,
                                      y: e.clientY,
                                    });
                                  }
                                }}
                                onMouseLeave={() => setHoveredDay(null)}
                                onMouseMove={(e) =>
                                  setTooltipPos({ x: e.clientX, y: e.clientY })
                                }
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Streak info bar */}
              <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-6">
                {[
                  { label: "// YEARS_ACTIVE", value: `${yearsOnGitHub}+ yrs` },
                  { label: "// ACCOUNT_STATUS", value: "Active 🕷" },
                  { label: "// PROFILE", value: `@${GITHUB_USERNAME}` },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      style={{ fontFamily: "'Share Tech Mono', monospace" }}
                      className="text-[9px] text-zinc-600 tracking-widest mb-1"
                    >
                      {item.label}
                    </p>
                    <p
                      style={{ fontFamily: "'Share Tech Mono', monospace" }}
                      className="text-xs text-red-400"
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== PROFILE + CTA ROW ===== */}
          <div
            className={`flex flex-col md:flex-row gap-6 items-stretch fade-up ${visible ? "show" : ""}`}
            style={{ transitionDelay: "0.45s" }}
          >
            {/* Profile mini-card */}
            <div className="profile-card flex-1">
              <div className="flex items-center gap-4 mb-4">
                {ghData?.avatar_url ? (
                  <div className="relative shrink-0">
                    <img
                      src={ghData.avatar_url}
                      alt="avatar"
                      className="w-14 h-14 rounded-full border-2 border-red-600 object-cover"
                    />
                    <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(190,0,0,0.6)]" />
                  </div>
                ) : (
                  <div className="skeleton w-14 h-14 rounded-full shrink-0" />
                )}
                <div>
                  <p
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: "0.05em",
                    }}
                    className="text-gray-100 text-2xl leading-none"
                  >
                    {ghData?.name ?? GITHUB_USERNAME}
                  </p>
                  <p
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    className="text-red-500 text-[11px] tracking-wider mt-1"
                  >
                    @{GITHUB_USERNAME}
                  </p>
                </div>
              </div>
              {ghData?.bio && (
                <p
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  className="text-zinc-400 text-sm leading-relaxed font-medium"
                >
                  {ghData.bio}
                </p>
              )}
            </div>

            {/* CTA + tagline */}
            <div className="flex flex-col justify-between gap-6 shrink-0 md:min-w-65">
              <div
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="bg-zinc-950/60 border border-white/5 border-l-2 border-l-red-700 p-5"
              >
                <p className="text-[10px] text-zinc-600 tracking-widest mb-2">
                  // WEB_FINGERPRINT
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Every commit is a web strand.
                  <br />
                  Every repo, a city to swing through.
                </p>
              </div>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-btn group"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>View GitHub Profile</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <div
            className="tooltip"
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
          >
            <span className="text-red-400">◈ </span>
            {hoveredDay.count > 0
              ? `${hoveredDay.count} contribution${hoveredDay.count > 1 ? "s" : ""}`
              : "No contributions"}
            {hoveredDay.date && (
              <span className="text-zinc-500 ml-2">
                {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        )}
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&display=swap');

        .gh-section {
          position: relative;
          padding: 100px 0 120px;
          background: #050505;
          overflow: hidden;
          font-family: 'Rajdhani', sans-serif;
        }

        .gh-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.5;
          pointer-events: none;
        }

        .gh-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 40%, rgba(190,0,0,0.08), transparent 70%);
          pointer-events: none;
        }

        .gh-aura-left {
          position: absolute;
          top: 25%;
          left: -80px;
          width: 400px;
          height: 400px;
          background: rgba(220,38,38,0.12);
          border-radius: 50%;
          filter: blur(120px);
          animation: aura-pulse 6s ease-in-out infinite;
          pointer-events: none;
        }

        .gh-aura-right {
          position: absolute;
          bottom: 20%;
          right: -80px;
          width: 350px;
          height: 350px;
          background: rgba(153,27,27,0.1);
          border-radius: 50%;
          filter: blur(120px);
          animation: aura-pulse 8s ease-in-out infinite reverse;
          pointer-events: none;
        }

        @keyframes aura-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        /* Web corner decoration */
        .web-corner {
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 300px;
          opacity: 0.06;
          pointer-events: none;
        }

        /* ===================== STAT CARDS ===================== */
        .stat-card {
          position: relative;
          background: rgba(9,9,9,0.8);
          border: 1px solid rgba(255,255,255,0.06);
          border-left: 3px solid #be0000;
          padding: 20px 24px;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          backdrop-filter: blur(12px);
        }
        .stat-card::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          border-style: solid;
          border-width: 0 12px 12px 0;
          border-color: transparent #be0000 transparent transparent;
          transition: border-color 0.3s;
        }
        .stat-card:hover {
          border-left-color: #ef4444;
          box-shadow: 0 0 30px rgba(190,0,0,0.15), 0 0 60px rgba(190,0,0,0.05);
          transform: translateY(-3px);
        }
        .stat-card:hover::after {
          border-color: transparent #ef4444 transparent transparent;
        }
        .stat-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #555;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          line-height: 1;
          color: #f0f0f0;
          letter-spacing: 0.04em;
        }
        .stat-value span {
          color: #be0000;
        }
        .stat-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: #444;
          margin-top: 4px;
        }

        /* ===================== CONTRIBUTION GRAPH ===================== */
        .contrib-wrapper {
          position: relative;
          background: rgba(9,9,9,0.7);
          border: 1px solid rgba(255,255,255,0.05);
          border-top: 2px solid #be0000;
          padding: 28px 28px 24px;
          backdrop-filter: blur(12px);
          overflow: hidden;
        }
        .contrib-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(190,0,0,0.03) 0%, transparent 60%);
          pointer-events: none;
        }

        .contrib-scroll {
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: #be0000 #111;
          padding-bottom: 8px;
        }
        .contrib-scroll::-webkit-scrollbar { height: 4px; }
        .contrib-scroll::-webkit-scrollbar-track { background: #111; }
        .contrib-scroll::-webkit-scrollbar-thumb { background: #be0000; border-radius: 2px; }

        .contrib-inner {
          min-width: fit-content;
          position: relative;
        }

        .contrib-cell {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          border-width: 1px;
          border-style: solid;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          flex-shrink: 0;
        }
        .contrib-cell:hover {
          transform: scale(1.4);
          z-index: 10;
        }

        /* Staggered reveal animation */
        .contrib-cell-animate {
          opacity: 0;
          animation: cell-appear 0.3s ease forwards;
        }
        @keyframes cell-appear {
          from { opacity: 0; transform: scale(0.3); }
          to { opacity: 1; transform: scale(1); }
        }

        .tooltip {
          position: fixed;
          background: #111;
          border: 1px solid rgba(190,0,0,0.4);
          padding: 6px 10px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          color: #ddd;
          pointer-events: none;
          z-index: 1000;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.6);
          transform: translate(-50%, -110%);
        }

        /* ===================== PROFILE CARD ===================== */
        .profile-card {
          position: relative;
          background: rgba(9,9,9,0.8);
          border: 1px solid rgba(255,255,255,0.06);
          border-bottom: 3px solid #be0000;
          padding: 28px;
          backdrop-filter: blur(12px);
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);
          transition: box-shadow 0.3s;
        }
        .profile-card::before {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          border-style: solid;
          border-width: 16px 16px 0 0;
          border-color: transparent transparent transparent #be0000;
        }
        .profile-card:hover {
          box-shadow: 0 0 40px rgba(190,0,0,0.12);
        }

        /* ===================== GITHUB BTN ===================== */
        .gh-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: transparent;
          border: 1px solid rgba(190,0,0,0.5);
          color: #ef4444;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.3s, border-color 0.3s;
          cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
        }
        .gh-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #be0000;
          transform: translateX(-105%);
          transition: transform 0.35s ease;
          z-index: 0;
        }
        .gh-btn:hover::before { transform: translateX(0); }
        .gh-btn:hover { color: #fff; border-color: #be0000; }
        .gh-btn span, .gh-btn svg { position: relative; z-index: 1; }

        /* ===================== LEGEND ===================== */
        .legend-cell {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          border-width: 1px;
          border-style: solid;
          flex-shrink: 0;
        }

        /* ===================== LOADING SKELETON ===================== */
        .skeleton {
          background: linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 2px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Fade-in from bottom utility */
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
