import { useState, useEffect, useMemo } from "react";
import Card from "../../components/common/Card";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dashboard.css";
import API from "../../services/api";

// Images
import d1 from "/src/assets/d1.png";
import d2 from "/src/assets/d2.png";
import d3 from "/src/assets/d3.png";
import d4 from "/src/assets/d4.png";

const COLORS = ["#22c55e", "#facc15", "#ef4444", "#3b82f6", "#a855f7"];

export default function Dashboard() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [range, setRange] = useState("7d"); // 7d or 30d
  const [summary, setSummary] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [geoData, setGeoData] = useState([]);

  /* ================== FETCH DATA ================== */
  useEffect(() => {
    fetchSummary();
    fetchTrends(range);
    fetchGeo();
  }, [range]);

  const fetchSummary = async () => {
    try {
      const res = await API.get("/summary");
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrends = async (selectedRange) => {
  try {
    const res = await API.get(`/trends?range=${selectedRange}`);

    const mapped = res.data.map(d => ({
      date: d.date,              //  FIX HERE
      views: d.views || 0,
      bandwidth: d.bandwidth || 0,
      errors: d.errors || 0
    }));

    console.log("Mapped Trends:", mapped);

    setTrendData(mapped);
  } catch (err) {
    console.error(err);
  }
};

  const fetchGeo = async () => {
    try {
      const res = await API.get("/geo");
      setGeoData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================== FILL MISSING DATES ================== */
  const fillMissingDates = (data, days) => {
    const today = new Date();
    let result = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const existing = data.find(d => d.date === dateStr);
      result.push(existing || { date: dateStr, views: 0, bandwidth: 0, errors: 0 });
    }
    return result;
  };

  /* ================== DATE FILTER ================== */
  const filteredData = useMemo(() => {
    const displayedData = fillMissingDates(trendData, range === "30d" ? 30 : 7);
    return displayedData.filter((d) => {
      const dDate = new Date(d.date);
      if (startDate && dDate < startDate) return false;
      if (endDate && dDate > endDate) return false;
      return true;
    });
  }, [trendData, startDate, endDate, range]);

  return (
    <div className="page">
      <h2>Dashboard Overview</h2>

      {/* ===== DATE PICKERS ===== */}
      <div className="date-filters">
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          placeholderText="End Date"
        />
      </div>

      {/* ===== RANGE TOGGLE ===== */}
      <div className="range-toggle">
        <button
          className={range === "7d" ? "active-btn" : ""}
          onClick={() => setRange("7d")}
        >
          7 Days
        </button>
        <button
          className={range === "30d" ? "active-btn" : ""}
          onClick={() => setRange("30d")}
        >
          30 Days
        </button>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="cards">
        <Card title="Total Views" value={summary.totalViews || 0} image={d1} />
        <Card title="Bandwidth" value={summary.bandwidth || "0GB"} image={d2} />
        <Card title="Active Streams" value={summary.activeStreams || 0} image={d3} />
        <Card title="Error Rate" value={summary.errorRate || "0%"} image={d4} />
      </div>

      {/* ===== CHARTS ===== */}
      <div className="charts-grid">

        {/* AREA CHART */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Views Analytics</h3>
            <span className="live-badge">● Live</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#22c55e"
                fill="url(#colorViews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="chart-card">
          <div className="chart-header"><h3>Geo Distribution</h3></div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={geoData}
                dataKey="viewers"
                nameKey="country"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
              >
                {geoData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="pie-legend">
            {geoData.map((item, i) => (
              <span key={i}>
                <span
                  className="dot"
                  style={{ background: COLORS[i % COLORS.length] }}
                ></span>
                {item.country}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}