import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip as LeafletTooltip
} from "react-leaflet";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getGeo } from "../../services/videoService";
import "./Geo.css";

export default function Geo() {

  const [data, setData] = useState([]);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchGeo();
  }, []);

  const fetchGeo = async () => {
    try {
      const res = await getGeo();
      setData(res.data);
    } catch (err) {
      console.error("Geo fetch error:", err);
    }
  };

  return (
    <div className="geo-page">
      <h2>Geographic Distribution</h2>

      <div className="geo-grid">

        {/* 🌍 MAP */}
        <div className="geo-card">
          <h3>Global Viewers Map</h3>

          <MapContainer center={[20, 0]} zoom={2} className="map">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

            {data.map((item, i) => (
              <CircleMarker
                key={i}
                center={item.coords}
                radius={Math.sqrt(item.viewers) / 30}
                pathOptions={{
                  color: "#22c55e",
                  fillColor: "#22c55e",
                  fillOpacity: 0.5
                }}
              >
                <LeafletTooltip>
                  {item.country} <br />
                  {item.viewers.toLocaleString()} viewers
                </LeafletTooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* 📊 BAR CHART */}
        <div className="geo-card">
          <h3>Viewers by Country</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={data}>
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis
                dataKey="country"
                type="category"
                stroke="#94a3b8"
                width={100}
              />
              <Tooltip />
              <Bar dataKey="viewers" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}