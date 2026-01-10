import React from "react";
import "./career.css";
import architecture from "../../../College&Exam/architecture";
import architectureRanking from "../../../College&Exam/architectureRanking";

const formatNumber = (value) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const Architecture = () => {
  const [search, setSearch] = React.useState("");
  const [rankLimit, setRankLimit] = React.useState(25);
  const [stateFilter, setStateFilter] = React.useState("All");

  const rankings = React.useMemo(
    () => architectureRanking.slice().sort((a, b) => a.rank - b.rank),
    []
  );

  const filteredRankings = React.useMemo(() => {
    return rankings
      .filter((item) =>
        stateFilter === "All" ? true : item.state === stateFilter
      )
      .filter((item) => {
        if (!search.trim()) return true;
        const term = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(term) ||
          item.city.toLowerCase().includes(term) ||
          item.state.toLowerCase().includes(term)
        );
      })
      .slice(0, rankLimit);
  }, [rankLimit, rankings, search, stateFilter]);

  const stateOptions = React.useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(architectureRanking.map((c) => c.state))).sort(),
    ];
  }, []);

  const stateHighlights = React.useMemo(() => {
    const counter = new Map();

    architecture.forEach((college) => {
      const entry = counter.get(college.state) || {
        state: college.state,
        count: 0,
        sample: [],
      };
      entry.count += 1;
      if (entry.sample.length < 3) entry.sample.push(college.name);
      counter.set(college.state, entry);
    });

    return Array.from(counter.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, []);

  const heroStats = [
    { label: "Total architecture colleges", value: architecture.length },
    {
      label: "Ranked colleges in this list",
      value: architectureRanking.length,
    },
    { label: "States & UTs covered", value: stateOptions.length - 1 },
  ];

  const class10Tips = [
    "Keep Math and Physics strong; they are the base for entrance exams.",
    "Get comfortable with self-study and doubt clearing from day one.",
    "Build tiny projects (circuits, simple apps) to see what branches feel like.",
    "Explore branches before choosing: CSE, ECE, Mechanical, Civil, Chemical, etc.",
    "Track exam patterns early: JEE Main/Advanced for IIT/NIT; state exams for state colleges.",
  ];

  return (
    <div className="container m-auto pt-5">
      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow">Future Engineer Guide</p>
          <h1>Find great architecture colleges in India</h1>
          <p className="lede">
            Simple, student-first view of top architecture colleges, their
            cities, and what matters before you pick a branch. Built for class
            10 students and parents.
          </p>
          <div className="hero__stats">
            {heroStats.map((stat) => (
              <div className="pill" key={stat.label}>
                <span className="pill__value">{formatNumber(stat.value)}</span>
                <span className="pill__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__card">
          <div className="card__title">What makes a college “top”?</div>
          <ul className="card__list">
            <li>Strong teaching, labs, and updated equipment</li>
            <li>Internships and placements with many recruiters</li>
            <li>Supportive peers, alumni, and active clubs</li>
            <li>Comfortable hostels, safe campus, and good mess</li>
          </ul>
          <div className="card__note">Scroll for rankings and filters ↓</div>
        </div>
      </section>

      <section className="panel">
        <header className="panel__header">
          <div>
            <p className="eyebrow">Top rankings</p>
            <h2>Explore ranked architecture colleges</h2>
            <p className="muted">
              Start with the top {rankLimit} colleges. Filter by state or search
              by name/city.
            </p>
          </div>

          <div className="controls">
            <label className="control">
              <span>State</span>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
              >
                {stateOptions.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>

            <label className="control">
              <span>Show top</span>
              <select
                value={rankLimit}
                onChange={(e) => setRankLimit(Number(e.target.value))}
              >
                {[10, 25, 50, 75, 100, 250].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>

            <label className="control control--search">
              <span>Search</span>
              <input
                type="text"
                placeholder="College, city, or state"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
        </header>

        <div className="ranking-grid">
          {filteredRankings.map((item) => (
            <article className="ranking-card" key={item.rank}>
              <h3>{item.name}</h3>
              <div className="ranking-card__badge">#{item.rank}</div>
              <p className="muted">
                {item.city}, {item.state}
              </p>
              <div className="tag">Public / Recognized</div>
              <div
                className="tag"
                style={{ marginLeft: 5, cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=${item.name}`,
                    "_blank"
                  )
                }
              >
                Google it
              </div>
            </article>
          ))}
          {!filteredRankings.length && (
            <div className="empty">No colleges match that search.</div>
          )}
        </div>
      </section>

      <section className="panel panel--alt">
        <header className="panel__header">
          <div>
            <p className="eyebrow">State snapshot</p>
            <h2>Where are most colleges?</h2>
            <p className="muted">
              Top states by total architecture colleges (sample names included).
            </p>
          </div>
        </header>

        <div className="state-grid">
          {stateHighlights.map((state) => (
            <div className="state-card" key={state.state}>
              <div className="state-card__head">
                <div>
                  <p className="eyebrow small">State</p>
                  <h3>{state.state}</h3>
                </div>
                <div className="pill pill--ghost">
                  {formatNumber(state.count)} colleges
                </div>
              </div>
              <ul className="state-card__list">
                {state.sample.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="panel panel--tips">
        <div className="tips">
          <div>
            <p className="eyebrow">For class 10 students</p>
            <h2>Quick prep roadmap</h2>
            <p className="muted">
              Small, steady steps to keep options open for IITs, NITs, and good
              state colleges.
            </p>
          </div>

          <div className="tips__list">
            {class10Tips.map((tip) => (
              <div className="tip" key={tip}>
                <span className="dot" aria-hidden>
                  •
                </span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Architecture;
