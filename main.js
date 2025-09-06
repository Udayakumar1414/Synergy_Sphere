import React, { useRef } from "react";

// Flowchart color palette (Tailwind classes used via SVG inline styles)
// Primary: #0ea5e9 (sky-500)
// Accent: #22c55e (green-500)
// Warning: #f59e0b (amber-500)
// Danger: #ef4444 (red-500)
// Neutral: #64748b (slate-500)

const Box = ({ x, y, w, h, title, lines = [], color = "#0ea5e9" }) => (
  <g>
    <rect x={x} y={y} rx={16} ry={16} width={w} height={h} fill="#ffffff" stroke={color} strokeWidth={3} />
    <text x={x + 16} y={y + 28} fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto" fontWeight="700" fontSize={14} fill="#0f172a">
      {title}
    </text>
    {lines.map((t, i) => (
      <text key={i} x={x + 16} y={y + 52 + i * 18} fontFamily="Inter, system-ui" fontSize={12} fill="#334155">
        • {t}
      </text>
    ))}
  </g>
);

const Arrow = ({ from, to, label = "", dashed = false }) => {
  // from = {x,y}; to = {x,y}
  const id = arrow-{from,x};{from.y};{to.x};{to.y};{label.replace(/\s+/g, "-")};
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
        </marker>
      </defs>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#475569" strokeWidth={2.5} markerEnd={`url(#${id})`} strokeDasharray={dashed ? "6 6" : undefined} />
      {label && (
        <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 8} textAnchor="middle" fontFamily="Inter, system-ui" fontSize={12} fill="#475569">
          {label}
        </text>
      )}
    </g>
  );
};

export default function Diagram() {
  const svgRef = useRef(null);

  const downloadPNG = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    // Create an image to draw on canvas
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svg.viewBox.baseVal.width;
      canvas.height = svg.viewBox.baseVal.height;
      const ctx = canvas.getContext("2d");
      // White background for print-friendly export
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = "Intelligent_Pesticide_System_Block_Diagram.png";
        a.click();
        URL.revokeObjectURL(pngUrl);
      }, "image/png");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-center">Intelligent Pesticide Sprinkling System – Flowchart & Block Diagram</h1>
      <p className="text-slate-600 max-w-5xl text-center">
        End-to-end architecture showing sensing → AI inference → decision-making → targeted actuation → feedback & logging, with connectivity to a farmer dashboard.
      </p>
      <div className="flex gap-2">
        <button onClick={downloadPNG} className="px-4 py-2 rounded-2xl shadow bg-slate-900 text-white text-sm">Download as PNG</button>
      </div>

      <div className="w-full overflow-auto bg-white rounded-2xl shadow p-2">
        <svg ref={svgRef} viewBox="0 0 1200 900" width="100%" height="100%">
          {/* Lanes background */}
          <g>
            <rect x={20} y={70} width={1160} height={150} fill="#f0f9ff" rx={12} />
            <text x={30} y={90} fontSize={12} fill="#0369a1" fontWeight={700}>Sensing</text>
            <rect x={20} y={240} width={1160} height={150} fill="#f0fdf4" rx={12} />
            <text x={30} y={260} fontSize={12} fill="#166534" fontWeight={700}>Edge AI & Decision</text>
            <rect x={20} y={410} width={1160} height={200} fill="#fff7ed" rx={12} />
            <text x={30} y={430} fontSize={12} fill="#9a3412" fontWeight={700}>Actuation & Motion</text>
            <rect x={20} y={630} width={1160} height={180} fill="#eef2ff" rx={12} />
            <text x={30} y={650} fontSize={12} fill="#3730a3" fontWeight={700}>Connectivity, Cloud & UX</text>
          </g>

          {/* Sensing layer */}
          <Box x={40} y={100} w={260} h={110} title="Vision Module (Camera/Drone)" color="#0ea5e9" lines={["RGB camera, optional NIR","Leaf spot/lesion detection","Edge deployable (TFLite)"]} />
          <Box x={330} y={100} w={240} h={110} title="Env/Plant Sensors" color="#0ea5e9" lines={["Leaf-wetness, temp, RH","Soil moisture, EC","NDVI/Color index"]} />
          <Box x={590} y={100} w={240} h={110} title="Positioning" color="#0ea5e9" lines={["GPS/RTK or wheel encoder","Row/plant localization","Spray geo-tagging"]} />
          <Box x={850} y={100} w={300} h={110} title="Safety & Compliance" color="#0ea5e9" lines={["Tank level, pressure sensor","Wind speed (drift control)","Nozzle temp/current sensing"]} />

          {/* Edge & Decision layer */}
          <Box x={60} y={270} w={320} h={110} title="Edge Compute" color="#22c55e" lines={["MCU/SoC: ESP32/RPi/Jetson Nano","On-device AI: TFLite/OpenCV","Pre-processing & denoise"]} />
          <Box x={410} y={270} w={350} h={110} title="Disease & Severity Model" color="#22c55e" lines={["Binary: Healthy/Unhealthy","Multi-class: Mild/Mod/Severe","Confidence & uncertainty"]} />
          <Box x={790} y={270} w={360} h={110} title="Dosing & Coverage Engine" color="#22c55e" lines={["Dose map per plant/leaf","PWM pump control profile","Skip healthy → save chemical"]} />

          {/* Actuation & Motion */}
          <Box x={60} y={450} w={330} h={130} title="Spray Subsystem" color="#f59e0b" lines={["Pump + solenoid valves","Nozzles (swirl/flat-fan)","Flow sensor for closed-loop"]} />
          <Box x={420} y={450} w={330} h={130} title="Aiming & Distribution" color="#f59e0b" lines={["2–4 servo pan/tilt arm","Height control","Row/plant indexing"]} />
          <Box x={780} y={450} w={330} h={130} title="Mobility Platform" color="#f59e0b" lines={["Tractor boom / UGV / Drone","Obstacle detection (ultrasonic)","Emergency stop & manual override"]} />

          {/* Connectivity & UX */}
          <Box x={60} y={670} w={360} h={120} title="Comms" color="#6366f1" lines={["LoRa/Wi‑Fi/4G","MQTT/HTTPS","Over‑the‑air updates (OTA)"]} />
          <Box x={440} y={670} w={330} h={120} title="Farmer Dashboard (App/Web)" color="#6366f1" lines={["Live infection map","Chemical used & ₹ saved","Alerts & audit logs"]} />
          <Box x={790} y={670} w={320} h={120} title="Data Lake & Analytics" color="#6366f1" lines={["Per‑plant history","Model retraining","Compliance reports"]} />

          {/* Arrows forward */}
          <Arrow from={{ x: 300, y: 155 }} to={{ x: 330, y: 155 }} label="sensor fusion" />
          <Arrow from={{ x: 570, y: 155 }} to={{ x: 590, y: 155 }} />
          <Arrow from={{ x: 830, y: 155 }} to={{ x: 850, y: 155 }} />

          <Arrow from={{ x: 200, y: 210 }} to={{ x: 220, y: 270 }} label="frames + features" />
          <Arrow from={{ x: 450, y: 210 }} to={{ x: 510, y: 270 }} label="telemetry" />
          <Arrow from={{ x: 700, y: 210 }} to={{ x: 840, y: 270 }} label="pose/geo" />

          <Arrow from={{ x: 380, y: 325 }} to={{ x: 410, y: 325 }} />
          <Arrow from={{ x: 760, y: 325 }} to={{ x: 790, y: 325 }} label="severity → dose" />

          <Arrow from={{ x: 420, y: 515 }} to={{ x: 390, y: 515 }} dashed label="closed loop" />
          <Arrow from={{ x: 750, y: 515 }} to={{ x: 750, y: 380 }} dashed label="motion state" />
          <Arrow from={{ x: 960, y: 580 }} to={{ x: 960, y: 670 }} label="util & logs" />

          <Arrow from={{ x: 970, y: 325 }} to={{ x: 900, y: 450 }} label="spray plan" />
          <Arrow from={{ x: 735, y: 325 }} to={{ x: 585, y: 450 }} label="aim setpoints" />
          <Arrow from={{ x: 540, y: 325 }} to={{ x: 230, y: 450 }} label="pump profile" />

          <Arrow from={{ x: 220, y: 580 }} to={{ x: 220, y: 670 }} label="counts, ml used" />
          <Arrow from={{ x: 620, y: 580 }} to={{ x: 620, y: 670 }} label="KPIs" />

          <Arrow from={{ x: 770, y: 730 }} to={{ x: 770, y: 380 }} dashed label="model updates" />

          {/* Feedback loop after spray */}
          <g>
            <circle cx={1040} cy={365} r={16} fill="#22c55e" />
            <text x={1040} y={370} textAnchor="middle" fontSize={12} fontFamily="Inter" fill="#fff">QA</text>
          </g>
          <Arrow from={{ x: 1040, y: 365 }} to={{ x: 1040, y: 210 }} dashed label="post-spray verify" />

          {/* Legend */}
          <g>
            <rect x={880} y={825} width={300} height={60} fill="#ffffff" stroke="#cbd5e1" rx={10} />
            <circle cx={900} cy={845} r={6} fill="#0ea5e9" />
            <text x={915} y={849} fontSize={12} fontFamily="Inter">Sensing blocks</text>
            <circle cx={900} cy={865} r={6} fill="#22c55e" />
            <text x={915} y={869} fontSize={12} fontFamily="Inter">Edge AI & decision</text>
            <circle cx={1040} cy={845} r={6} fill="#f59e0b" />
            <text x={1055} y={849} fontSize={12} fontFamily="Inter">Actuation & motion</text>
            <circle cx={1040} cy={865} r={6} fill="#6366f1" />
            <text x={1055} y={869} fontSize={12} fontFamily="Inter">Cloud, comms & UX</text>
          </g>
        </svg>
      </div>

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="font-semibold text-slate-800 mb-2">Flow (Step-by-step)</h2>
          <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
            <li>Capture frames + read sensors.</li>
            <li>Edge AI classifies disease & severity per plant/leaf.</li>
            <li>Dose engine converts severity → ml/m² + nozzle on-time (PWM).</li>
            <li>Servos aim; pump/valves actuate; mobility moves row-wise.</li>
            <li>Flow & position feedback closes the loop for accuracy.</li>
            <li>Counts, chemical usage, and savings sync to dashboard.</li>
            <li>Post-spray verification updates per-plant health map; retrain periodically.</li>
          </ol>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="font-semibold text-slate-800 mb-2">Interfaces & Notes</h2>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            <li><span className="font-medium">Electrical:</span> 12–24V battery → buck to 5V/3.3V; fused; E‑stop in series.</li>
            <li><span className="font-medium">Control:</span> PWM for pump, GPIO for valves/servos; I²C/SPI/UART for sensors.</li>
            <li><span className="font-medium">Protocol:</span> MQTT to broker; local caching if offline.</li>
            <li><span className="font-medium">Safety:</span> Wind &gt threshold → pause spray; low tank/overpressure → stop.</li>
            <li><span className="font-medium">Compliance:</span> Log lot ID, chemical, dose, operator for audits.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}