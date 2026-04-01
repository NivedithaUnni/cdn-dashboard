import React, { useState, useMemo } from "react";
import "./Videos.css";

const DATA = [
  { id: 1, name: "Product Launch", region: "NA", date: "2026-03-10", views: 45000, bandwidth: 12.5, errors: 20, status: "Active" },
  { id: 2, name: "Live Concert", region: "EU", date: "2026-03-12", views: 38000, bandwidth: 10.2, errors: 50, status: "Paused" },
  { id: 3, name: "Tech Talk", region: "APAC", date: "2026-03-08", views: 52000, bandwidth: 15.1, errors: 10, status: "Active" },
  { id: 4, name: "Gaming Stream", region: "NA", date: "2026-03-01", views: 29000, bandwidth: 8.4, errors: 80, status: "Error" },
  { id: 5, name: "Movie Trailer", region: "EU", date: "2026-02-25", views: 61000, bandwidth: 18.3, errors: 5, status: "Active" },
  { id: 6, name: "Podcast", region: "APAC", date: "2026-02-20", views: 18000, bandwidth: 6.2, errors: 30, status: "Paused" },
  { id: 7, name: "Fitness Live", region: "NA", date: "2026-02-15", views: 22000, bandwidth: 7.8, errors: 60, status: "Error" },
  { id: 8, name: "Cooking Show", region: "EU", date: "2026-02-10", views: 26000, bandwidth: 9.5, errors: 15, status: "Active" },

  { id: 9, name: "Travel Vlog", region: "APAC", date: "2026-02-08", views: 34000, bandwidth: 11.2, errors: 22, status: "Active" },
  { id: 10, name: "Startup Pitch", region: "NA", date: "2026-02-05", views: 41000, bandwidth: 13.7, errors: 12, status: "Active" },
  { id: 11, name: "Science Doc", region: "EU", date: "2026-02-03", views: 29000, bandwidth: 9.9, errors: 35, status: "Paused" },
  { id: 12, name: "Kids Show", region: "APAC", date: "2026-02-01", views: 37000, bandwidth: 10.5, errors: 18, status: "Active" },
  { id: 13, name: "Comedy Special", region: "NA", date: "2026-01-28", views: 48000, bandwidth: 14.3, errors: 55, status: "Error" },
  { id: 14, name: "E-Sports Finals", region: "EU", date: "2026-01-25", views: 65000, bandwidth: 19.1, errors: 8, status: "Active" },
  { id: 15, name: "Music Premiere", region: "APAC", date: "2026-01-22", views: 53000, bandwidth: 16.0, errors: 20, status: "Active" },
  { id: 16, name: "Documentary", region: "NA", date: "2026-01-20", views: 30000, bandwidth: 9.2, errors: 42, status: "Paused" },
  { id: 17, name: "News Live", region: "EU", date: "2026-01-18", views: 44000, bandwidth: 12.8, errors: 25, status: "Active" },
  { id: 18, name: "Gaming Highlights", region: "APAC", date: "2026-01-15", views: 39000, bandwidth: 11.4, errors: 60, status: "Error" },
  { id: 19, name: "Fitness Tutorial", region: "NA", date: "2026-01-12", views: 21000, bandwidth: 7.6, errors: 15, status: "Active" },
  { id: 20, name: "Cooking Masterclass", region: "EU", date: "2026-01-10", views: 33000, bandwidth: 10.1, errors: 28, status: "Paused" },
  { id: 21, name: "Tech Review", region: "APAC", date: "2026-01-08", views: 47000, bandwidth: 13.9, errors: 9, status: "Active" },
  { id: 22, name: "Movie Review", region: "NA", date: "2026-01-05", views: 36000, bandwidth: 11.7, errors: 33, status: "Paused" },
  { id: 23, name: "Podcast Live", region: "EU", date: "2026-01-03", views: 28000, bandwidth: 8.9, errors: 21, status: "Active" },
  { id: 24, name: "Travel Guide", region: "APAC", date: "2026-01-01", views: 42000, bandwidth: 12.6, errors: 17, status: "Active" },
  { id: 25, name: "Startup Talk", region: "NA", date: "2025-12-30", views: 39000, bandwidth: 11.3, errors: 40, status: "Error" },
];

export default function Videos() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");
  const [sort, setSort] = useState({ key: "", dir: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  // FILTER
  const filtered = useMemo(() => {
    return DATA.filter(v =>
      v.name.toLowerCase().includes(search.toLowerCase()) &&
      (!region || v.region === region) &&
      (!date || v.date === date)
    );
  }, [search, region, date]);

  // SORT
  const sorted = useMemo(() => {
    let arr = [...filtered];
    if (sort.key) {
      arr.sort((a, b) => {
        if (a[sort.key] < b[sort.key]) return sort.dir === "asc" ? -1 : 1;
        if (a[sort.key] > b[sort.key]) return sort.dir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return arr;
  }, [filtered, sort]);


  // PAGINATION
  const getPages = () => {
  let pages = [];

  let start = Math.max(1, page - 1);
  let end = Math.min(totalPages, page + 1);

  // Always ensure 3 numbers
  if (page === 1) {
    end = Math.min(3, totalPages);
  } else if (page === totalPages) {
    start = Math.max(totalPages - 2, 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

  const totalPages = Math.ceil(sorted.length / limit);
  const data = sorted.slice((page - 1) * limit, page * limit);

  const handleSort = (key) => {
    let dir = "asc";
    if (sort.key === key && sort.dir === "asc") dir = "desc";
    setSort({ key, dir });
  };

  return (
    <div className="videos">
      <h2>Video Analytics</h2>

      {/* Filters */}
      <div className="toolbar">
        <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />

        <select value={region} onChange={e => setRegion(e.target.value)}>
          <option value="">All Regions</option>
          <option>NA</option>
          <option>EU</option>
          <option>APAC</option>
        </select>

        <input type="date" value={date} onChange={e => setDate(e.target.value)} />

       <input
  type="number"
  min="1"
  max="10"
  value={limit}
  onChange={(e) => {
    let value = Number(e.target.value);

    if (value > 8) value = 8;   // max limit
    if (value < 1) value = 1;     // min limit

    setLimit(value);
    setPage(1);
  }}
  placeholder="Rows"
/>
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Video</th>
              <th onClick={() => handleSort("region")}>Region</th>
              <th onClick={() => handleSort("date")}>Date</th>
              <th onClick={() => handleSort("views")}>Views</th>
              <th onClick={() => handleSort("bandwidth")}>BW (TB)</th>
              <th onClick={() => handleSort("errors")}>Errors</th>
              <th onClick={() => handleSort("status")}>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map(v => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td><span className="tag">{v.region}</span></td>
                <td>{v.date}</td>
                <td>{v.views.toLocaleString()}</td>
                <td>{v.bandwidth}</td>
                <td className={v.errors > 50 ? "error" : "normal"}>{v.errors}</td>
                <td><span className={`status ${v.status.toLowerCase()}`}>{v.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
  {/* Left Arrow */}
  <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
    ‹
  </button>

  {/* Page Numbers */}
  {getPages().map((p) => (
    <button
      key={p}
      className={page === p ? "active" : ""}
      onClick={() => setPage(p)}
    >
      {p}
    </button>
  ))}

  {/* Right Arrow */}
  <button
    onClick={() => setPage(p => p + 1)}
    disabled={page === totalPages}
  >
    ›
  </button>
</div>
      </div>
    </div>
  );
}