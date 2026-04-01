import { useState, useMemo } from "react";
import Card from "../../components/common/Card";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dashboard.css";

// Import images for cards
import d1 from "../../assets/d1.png";
import d2 from "../../assets/d2.png";
import d3 from "../../assets/d3.png";
import d4 from "../../assets/d4.png";

// Sample video analytics data
const DATA = [
  { date: "2026-01-01", views: 3000, region: "US", video: "Video A" },
  { date: "2026-01-02", views: 4000, region: "UK", video: "Video B" },
  { date: "2026-01-03", views: 6000, region: "IN", video: "Video C" },
  { date: "2026-01-04", views: 2500, region: "US", video: "Video D" },
  { date: "2026-01-05", views: 3200, region: "UK", video: "Video E" },
];

const STATUS_DATA = [
  { name: "Active", value: 70 },
  { name: "Paused", value: 20 },
  { name: "Error", value: 10 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function Dashboard() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Filter data by date range
  const filteredData = useMemo(() => {
    return DATA.filter((d) => {
      const dDate = new Date(d.date);
      if (startDate && dDate < startDate) return false;
      if (endDate && dDate > endDate) return false;
      return true;
    });
  }, [startDate, endDate]);

  const totalViews = filteredData.reduce((a, b) => a + b.views, 0);

  return (
    <div className="page">
      <h2>Dashboard Overview</h2>

      {/* Date Range Filter */}
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

      {/* Summary Cards with Images */}
      <div className="cards">
        <Card title="Total Views" value={totalViews} image={d1} />
        <Card title="Bandwidth" value="120GB" image={d2} />
        <Card title="Active Streams" value="320" image={d3} />
        <Card title="Error Rate" value="2%" image={d4} />
      </div>

      {/* Views Over Time Chart */}
    <div className="charts-grid">

  {/* LEFT - AREA CHART */}
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

  {/* RIGHT - PIE CHART */}
  <div className="chart-card">
    <div className="chart-header">
      <h3>Stream Status</h3>
    </div>

    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={STATUS_DATA}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
        >
          {STATUS_DATA.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

    {/* Legend */}
    <div className="pie-legend">
      {STATUS_DATA.map((item, i) => (
        <span key={i}>
          <span className="dot" style={{ background: COLORS[i] }}></span>
          {item.name}
        </span>
      ))}
    </div>
  </div>

</div>
    </div>
  );
}