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
import "./Geo.css";

// Data
const DATA = [
  { country: "USA", viewers: 48320, coords: [37.09, -95.71] },
  { country: "India", viewers: 31450, coords: [20.59, 78.96] },
  { country: "Brazil", viewers: 18980, coords: [-14.23, -51.92] },
  { country: "Germany", viewers: 15680, coords: [51.16, 10.45] },
  { country: "UK", viewers: 14200, coords: [55.37, -3.43] },
];

export default function Geo() {
  return (
    <div className="geo-page">
      <h2>Geographic Distribution</h2>

      <div className="geo-grid">

        {/* 🌍 LEFT - MAP */}
        <div className="geo-card">
          <h3>Global Viewers Map</h3>

          <MapContainer center={[20, 0]} zoom={2} className="map">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

            {DATA.map((item, i) => (
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

        {/* 📊 RIGHT - BAR CHART */}
        <div className="geo-card">
          <h3>Viewers by Country</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={DATA}>
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