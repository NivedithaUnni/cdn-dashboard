import { useState, useEffect, useMemo } from "react";
import Card from "../../components/common/Card";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dashboard.css";

import API from "/src/services/api";

// Images
import d1 from "/src/assets/d1.png";
import d2 from "/src/assets/d2.png";
import d3 from "/src/assets/d3.png";
import d4 from "/src/assets/d4.png";

const COLORS = ["#22c55e", "#facc15", "#ef4444", "#3b82f6", "#a855f7"];

export default function Dashboard() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [summary, setSummary] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [geoData, setGeoData] = useState([]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchSummary();
    fetchTrends();
    fetchGeo();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await API.get("/summary");
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrends = async () => {
    try {
      const res = await API.get("/trends");
      setTrendData(res.data);
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

  /* ================= DATE FILTER ================= */
  const filteredData = useMemo(() => {
    return trendData.filter((d) => {
      const dDate = new Date(d.date);
      if (startDate && dDate < startDate) return false;
      if (endDate && dDate > endDate) return false;
      return true;
    });
  }, [trendData, startDate, endDate]);

  return (
    <div className="page">
      <h2>Dashboard Overview</h2>

      {/* DATE FILTER */}
      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
        />
      </div>

      {/* ✅ SUMMARY CARDS (FROM BACKEND) */}
      <div className="cards">
        <Card title="Total Views" value={summary.totalViews || 0} image={d1} />
        <Card title="Bandwidth" value={summary.bandwidth || "0GB"} image={d2} />
        <Card title="Active Streams" value={summary.activeStreams || 0} image={d3} />
        <Card title="Error Rate" value={summary.errorRate || "0%"} image={d4} />
      </div>

      <div className="charts-grid">

        {/* ✅ AREA CHART (TREND API) */}
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

        {/* ✅ PIE CHART (GEO API) */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Geo Distribution</h3>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={geoData}
                dataKey="count"
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

          {/* LEGEND */}
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