import React from "react";

type LabStatus = "Ordered" | "Collected" | "Processing" | "Reported";

type LabOrder = {
  id: string;
  patient: string;
  test: string;
  department: string;
  date: string;
  status: LabStatus;
  priority: "Routine" | "Urgent";
};

const badgeStyles: Record<LabStatus, React.CSSProperties> = {
  Ordered: {
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    color: "#c4b5fd",
    border: "1px solid rgba(139, 92, 246, 0.35)",
  },
  Collected: {
    backgroundColor: "rgba(6, 182, 212, 0.15)",
    color: "#67e8f9",
    border: "1px solid rgba(6, 182, 212, 0.35)",
  },
  Processing: {
    backgroundColor: "rgba(251, 191, 36, 0.15)",
    color: "#fde68a",
    border: "1px solid rgba(251, 191, 36, 0.35)",
  },
  Reported: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.35)",
  },
};

const orders: LabOrder[] = [
  {
    id: "LAB-90011",
    patient: "Mona Hassan",
    test: "CBC",
    department: "Hematology",
    date: "2026-01-16",
    status: "Processing",
    priority: "Routine",
  },
  {
    id: "LAB-90012",
    patient: "Ahmed Saeed",
    test: "CRP",
    department: "Biochemistry",
    date: "2026-01-16",
    status: "Collected",
    priority: "Urgent",
  },
  {
    id: "LAB-90013",
    patient: "Salma Mostafa",
    test: "Urinalysis",
    department: "Microbiology",
    date: "2026-01-17",
    status: "Ordered",
    priority: "Routine",
  },
  {
    id: "LAB-90014",
    patient: "Youssef Adel",
    test: "PT/INR",
    department: "Hematology",
    date: "2026-01-18",
    status: "Reported",
    priority: "Routine",
  },
];

export default function LabPage() {
  const [status, setStatus] = React.useState<"All" | LabStatus>("All");

  const filtered = React.useMemo(() => {
    return orders.filter((o) => (status === "All" ? true : o.status === status));
  }, [status]);

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
            Laboratory
          </div>
          <div style={{ color: "#94a3b8", fontSize: "14px" }}>
            Lab test orders and status tracking
          </div>
        </div>

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
          onClick={() => alert("Demo: New lab order (not connected to backend)")}
        >
          New Lab Order
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "12px",
          padding: "14px",
          marginBottom: "16px",
        }}
      >
        <div style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "6px" }}>
          Status
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          style={{
            width: "100%",
            backgroundColor: "#0b1220",
            border: "1px solid #334155",
            borderRadius: "10px",
            padding: "10px 12px",
            color: "#fff",
            outline: "none",
          }}
        >
          <option value="All">All</option>
          <option value="Ordered">Ordered</option>
          <option value="Collected">Collected</option>
          <option value="Processing">Processing</option>
          <option value="Reported">Reported</option>
        </select>
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
          <div style={{ fontWeight: 700 }}>Lab Orders</div>
          <div style={{ color: "#94a3b8", fontSize: "12px" }}>{filtered.length} records</div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#0b1220" }}>
                {["Order ID", "Date", "Patient", "Test", "Department", "Priority", "Status", "Actions"].map((h) => (
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
              {filtered.map((o) => (
                <tr key={o.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "#cbd5e1" }}>{o.id}</td>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "#cbd5e1" }}>{o.date}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 600 }}>{o.patient}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{o.test}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{o.department}</td>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: o.priority === "Urgent" ? "rgba(239, 68, 68, 0.15)" : "rgba(148, 163, 184, 0.15)",
                        color: o.priority === "Urgent" ? "#fca5a5" : "#cbd5e1",
                        border: o.priority === "Urgent" ? "1px solid rgba(239, 68, 68, 0.35)" : "1px solid rgba(148, 163, 184, 0.35)",
                      }}
                    >
                      {o.priority}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        ...badgeStyles[o.status],
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {o.status}
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
                      onClick={() => alert(`Demo: Open report for ${o.id}`)}
                    >
                      Report
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
                      onClick={() => alert(`Demo: Update status for ${o.id}`)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
