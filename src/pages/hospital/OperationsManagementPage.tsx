import React from "react";

type WardStatus = "Normal" | "High" | "Critical";

type Ward = {
  id: string;
  name: string;
  floor: string;
  totalBeds: number;
  occupiedBeds: number;
  headNurse: string;
  status: WardStatus;
};

type Resource = {
  id: string;
  name: string;
  department: string;
  availability: "Available" | "In Use" | "Maintenance";
  location: string;
};

const statusStyles: Record<WardStatus, React.CSSProperties> = {
  Normal: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.35)",
  },
  High: {
    backgroundColor: "rgba(251, 191, 36, 0.15)",
    color: "#fde68a",
    border: "1px solid rgba(251, 191, 36, 0.35)",
  },
  Critical: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    color: "#fca5a5",
    border: "1px solid rgba(239, 68, 68, 0.35)",
  },
};

const resourceStyles: Record<Resource["availability"], React.CSSProperties> = {
  Available: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.35)",
  },
  "In Use": {
    backgroundColor: "rgba(6, 182, 212, 0.15)",
    color: "#67e8f9",
    border: "1px solid rgba(6, 182, 212, 0.35)",
  },
  Maintenance: {
    backgroundColor: "rgba(251, 191, 36, 0.15)",
    color: "#fde68a",
    border: "1px solid rgba(251, 191, 36, 0.35)",
  },
};

const wards: Ward[] = [
  {
    id: "WARD-ICU",
    name: "ICU",
    floor: "3rd",
    totalBeds: 14,
    occupiedBeds: 12,
    headNurse: "Nurse Dina",
    status: "Critical",
  },
  {
    id: "WARD-GEN",
    name: "General Ward",
    floor: "2nd",
    totalBeds: 40,
    occupiedBeds: 29,
    headNurse: "Nurse Salwa",
    status: "High",
  },
  {
    id: "WARD-PED",
    name: "Pediatrics",
    floor: "1st",
    totalBeds: 22,
    occupiedBeds: 14,
    headNurse: "Nurse Mariam",
    status: "Normal",
  },
  {
    id: "WARD-MAT",
    name: "Maternity",
    floor: "1st",
    totalBeds: 18,
    occupiedBeds: 10,
    headNurse: "Nurse Aya",
    status: "Normal",
  },
];

const resources: Resource[] = [
  {
    id: "RES-CT-01",
    name: "CT Scanner",
    department: "Radiology",
    availability: "In Use",
    location: "Radiology - Room R12",
  },
  {
    id: "RES-VENT-03",
    name: "Ventilator #03",
    department: "ICU",
    availability: "Available",
    location: "ICU - Bed 06",
  },
  {
    id: "RES-US-02",
    name: "Ultrasound Machine",
    department: "Radiology",
    availability: "Maintenance",
    location: "Radiology - Workshop",
  },
  {
    id: "RES-INF-11",
    name: "Infusion Pump #11",
    department: "General Ward",
    availability: "Available",
    location: "General Ward - Storage",
  },
];

const pct = (n: number) => `${Math.round(n)}%`;

export default function OperationsManagementPage() {
  const [wardQuery, setWardQuery] = React.useState("");
  const [resourceQuery, setResourceQuery] = React.useState("");

  const filteredWards = React.useMemo(() => {
    const q = wardQuery.trim().toLowerCase();
    return wards.filter((w) =>
      q.length === 0 ||
      w.name.toLowerCase().includes(q) ||
      w.id.toLowerCase().includes(q) ||
      w.floor.toLowerCase().includes(q) ||
      w.headNurse.toLowerCase().includes(q)
    );
  }, [wardQuery]);

  const filteredResources = React.useMemo(() => {
    const q = resourceQuery.trim().toLowerCase();
    return resources.filter((r) =>
      q.length === 0 ||
      r.name.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q)
    );
  }, [resourceQuery]);

  const totals = React.useMemo(() => {
    const totalBeds = wards.reduce((sum, w) => sum + w.totalBeds, 0);
    const occupiedBeds = wards.reduce((sum, w) => sum + w.occupiedBeds, 0);
    const occupancy = totalBeds === 0 ? 0 : (occupiedBeds / totalBeds) * 100;
    return { totalBeds, occupiedBeds, occupancy };
  }, []);

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#0f172a",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div>
          <div style={{ fontSize: "24px", fontWeight: 700, marginBottom: "6px" }}>
            Operations Management
          </div>
          <div style={{ color: "#94a3b8", fontSize: "14px" }}>
            Manage wards, beds, and critical equipment allocation
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
              border: "none",
              color: "#0b1220",
              fontWeight: 700,
              padding: "10px 14px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            type="button"
            onClick={() => alert("Demo: Add ward / bed block (not connected to backend)")}
          >
            Add Ward
          </button>
          <button
            style={{
              background: "none",
              border: "1px solid #334155",
              color: "#e2e8f0",
              fontWeight: 700,
              padding: "10px 14px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            type="button"
            onClick={() => alert("Demo: Export operations report")}
          >
            Export
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        {[{
          label: "Total Beds",
          value: `${totals.totalBeds}`,
          accent: "#8b5cf6",
        }, {
          label: "Occupied Beds",
          value: `${totals.occupiedBeds}`,
          accent: "#06b6d4",
        }, {
          label: "Occupancy",
          value: pct(totals.occupancy),
          accent: "#f59e0b",
        }].map((c) => (
          <div
            key={c.label}
            style={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <div style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "8px" }}>{c.label}</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff" }}>{c.value}</div>
            <div style={{ height: "4px", backgroundColor: "#0b1220", borderRadius: "999px", marginTop: "10px" }}>
              <div style={{ height: "100%", width: "40%", backgroundColor: c.accent, borderRadius: "999px" }} />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #334155",
            }}
          >
            <div style={{ fontWeight: 700 }}>Wards</div>
            <div style={{ color: "#94a3b8", fontSize: "12px" }}>{filteredWards.length} wards</div>
          </div>

          <div style={{ padding: "14px", borderBottom: "1px solid #334155" }}>
            <div style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "6px" }}>Search</div>
            <input
              value={wardQuery}
              onChange={(e) => setWardQuery(e.target.value)}
              placeholder="Search wards by name, floor, head nurse"
              style={{
                width: "100%",
                backgroundColor: "#0b1220",
                border: "1px solid #334155",
                borderRadius: "10px",
                padding: "10px 12px",
                color: "#fff",
                outline: "none",
              }}
            />
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ backgroundColor: "#0b1220" }}>
                  {["Ward", "Floor", "Beds", "Head Nurse", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "12px 14px",
                        color: "#94a3b8",
                        fontWeight: 600,
                        borderBottom: "1px solid #334155",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredWards.map((w) => {
                  const occ = w.totalBeds === 0 ? 0 : (w.occupiedBeds / w.totalBeds) * 100;
                  return (
                    <tr key={w.id} style={{ borderBottom: "1px solid #334155" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 700 }}>{w.name}</td>
                      <td style={{ padding: "12px 14px", color: "#cbd5e1", whiteSpace: "nowrap" }}>{w.floor}</td>
                      <td style={{ padding: "12px 14px", color: "#cbd5e1", whiteSpace: "nowrap" }}>
                        {w.occupiedBeds}/{w.totalBeds} ({pct(occ)})
                      </td>
                      <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{w.headNurse}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span
                          style={{
                            ...statusStyles[w.status],
                            padding: "4px 10px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          {w.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                        <button
                          type="button"
                          style={{
                            background: "none",
                            border: "1px solid #334155",
                            color: "#e2e8f0",
                            padding: "6px 10px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            marginRight: "8px",
                          }}
                          onClick={() => alert(`Demo: Open ${w.name} board`)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          style={{
                            background: "none",
                            border: "1px solid #334155",
                            color: "#e2e8f0",
                            padding: "6px 10px",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => alert(`Demo: Transfer patient to ${w.name}`)}
                        >
                          Transfer
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #334155",
            }}
          >
            <div style={{ fontWeight: 700 }}>Critical Equipment</div>
            <div style={{ color: "#94a3b8", fontSize: "12px" }}>{filteredResources.length} assets</div>
          </div>

          <div style={{ padding: "14px", borderBottom: "1px solid #334155" }}>
            <div style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "6px" }}>Search</div>
            <input
              value={resourceQuery}
              onChange={(e) => setResourceQuery(e.target.value)}
              placeholder="Search by equipment, department, location"
              style={{
                width: "100%",
                backgroundColor: "#0b1220",
                border: "1px solid #334155",
                borderRadius: "10px",
                padding: "10px 12px",
                color: "#fff",
                outline: "none",
              }}
            />
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ backgroundColor: "#0b1220" }}>
                  {["Asset", "Department", "Status", "Location", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "12px 14px",
                        color: "#94a3b8",
                        fontWeight: 600,
                        borderBottom: "1px solid #334155",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #334155" }}>
                    <td style={{ padding: "12px 14px", fontWeight: 700 }}>{r.name}</td>
                    <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{r.department}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          ...resourceStyles[r.availability],
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        {r.availability}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{r.location}</td>
                    <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                      <button
                        type="button"
                        style={{
                          background: "none",
                          border: "1px solid #334155",
                          color: "#e2e8f0",
                          padding: "6px 10px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          marginRight: "8px",
                        }}
                        onClick={() => alert(`Demo: Open ${r.id}`)}
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        style={{
                          background: "none",
                          border: "1px solid #334155",
                          color: "#e2e8f0",
                          padding: "6px 10px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => alert(`Demo: Assign ${r.name}`)}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
