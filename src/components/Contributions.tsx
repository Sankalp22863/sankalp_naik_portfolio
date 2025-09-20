"use client";

import GitHubCalendar from "react-github-calendar";

const glossyGreenTheme = {
  dark: [
    "#2f2f2f",  // gray for empty cells
    "#14532d",  // low green
    "#166534",  // medium green
    "#22c55e",  // bright green
    "#4ade80",  // highlight green
  ],
  light: [
    "#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"
  ],
};

export default function Contributions() {
  return (
    <section id="contributions" className="max-w-6xl mx-auto px-4 py-16">
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl shadow-lg p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">GitHub Contributions</h2>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 overflow-x-auto">
        <GitHubCalendar
          username="sankalp22863"          // ← your GitHub handle
          year={new Date().getFullYear()}  // current year
          theme={glossyGreenTheme}
          hideColorLegend
          hideTotalCount={false}
          labels={{
            totalCount: '{{count}} contributions in {{year}}',
          }}
          blockSize={12}       // square size (px)
          blockMargin={4}      // gap between squares
          fontSize={12}
        />
      </div>
      </div>
    </section>

  );
}
