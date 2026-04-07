import React, { useState, useEffect } from "react";
import "./Videos.css";
import { getVideos } from "../../services/videoService";

export default function Videos() {
  /* ================= STATE ================= */
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");
  const [sort, setSort] = useState({ key: "", dir: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= FETCH API ================= */
  useEffect(() => {
    fetchVideos();
  }, [page, limit, search, region, date, sort]);

  const fetchVideos = async () => {
    try {
      const res = await getVideos({
        page,
        limit,
        search,
        region,
        date,
        sortBy: sort.key,
        order: sort.dir,
      });

      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  /* ================= SORT ================= */
  const handleSort = (key) => {
    let dir = "asc";
    if (sort.key === key && sort.dir === "asc") dir = "desc";
    setSort({ key, dir });
  };

  /* ================= PAGINATION ================= */
  const getPages = () => {
    let pages = [];

    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, page + 1);

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

  /* ================= UI ================= */
  return (
    <div className="videos">
      <h2>Video Analytics</h2>

      {/* ================= FILTERS ================= */}
      <div className="toolbar">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Regions</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Asia">Asia</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setPage(1);
          }}
        />

        <input
          type="number"
          min="1"
          max="8"
          value={limit}
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value > 8) value = 8;
            if (value < 1) value = 1;
            setLimit(value);
            setPage(1);
          }}
        />
      </div>

      {/* ================= TABLE ================= */}
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
              
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((v) => (
                <tr key={v._id}>
                  <td>{v.name}</td>

                  <td>
                    <span className="tag">{v.region}</span>
                  </td>

                  <td>{new Date(v.date).toLocaleDateString("en-GB")}</td>

                  <td>{v.views?.toLocaleString()}</td>

                  <td>{v.bandwidth}</td>

                  <td className={v.errors > 50 ? "error" : "normal"}>
                    {v.errors}
                  </td>

                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ================= PAGINATION ================= */}
        <div className="pagination">
          {/* LEFT */}
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            ‹
          </button>

          {/* NUMBERS */}
          {getPages().map((p) => (
            <button
              key={p}
              className={page === p ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}

          {/* RIGHT */}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}