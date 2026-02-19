import React from "react";

type InvoiceStatus = "Paid" | "Unpaid" | "Partial";

type Invoice = {
  id: string;
  patient: string;
  date: string;
  service: string;
  total: number;
  status: InvoiceStatus;
  method: "Cash" | "Card" | "Insurance";
};

const badgeStyles: Record<InvoiceStatus, React.CSSProperties> = {
  Paid: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.35)",
  },
  Unpaid: {
    backgroundColor: "rgba(251, 191, 36, 0.15)",
    color: "#fde68a",
    border: "1px solid rgba(251, 191, 36, 0.35)",
  },
  Partial: {
    backgroundColor: "rgba(6, 182, 212, 0.15)",
    color: "#67e8f9",
    border: "1px solid rgba(6, 182, 212, 0.35)",
  },
};

const invoices: Invoice[] = [
  {
    id: "INV-76001",
    patient: "Mona Hassan",
    date: "2026-01-16",
    service: "Cardiology Consultation",
    total: 650,
    status: "Paid",
    method: "Card",
  },
  {
    id: "INV-76002",
    patient: "Ahmed Saeed",
    date: "2026-01-16",
    service: "X-Ray + Orthopedics",
    total: 1250,
    status: "Unpaid",
    method: "Cash",
  },
  {
    id: "INV-76003",
    patient: "Salma Mostafa",
    date: "2026-01-17",
    service: "Pediatrics Follow-up",
    total: 400,
    status: "Paid",
    method: "Cash",
  },
  {
    id: "INV-76004",
    patient: "Youssef Adel",
    date: "2026-01-18",
    service: "Surgery Deposit",
    total: 5200,
    status: "Partial",
    method: "Insurance",
  },
];

const formatCurrency = (n: number) => `${n.toLocaleString()} EGP`;

export default function BillingPage() {
  const [status, setStatus] = React.useState<"All" | InvoiceStatus>("All");

  const filtered = React.useMemo(() => {
    return invoices.filter((i) => (status === "All" ? true : i.status === status));
  }, [status]);

  const totals = React.useMemo(() => {
    const totalAmount = invoices.reduce((sum, i) => sum + i.total, 0);
    const paidAmount = invoices
      .filter((i) => i.status === "Paid")
      .reduce((sum, i) => sum + i.total, 0);
    const unpaidAmount = invoices
      .filter((i) => i.status === "Unpaid")
      .reduce((sum, i) => sum + i.total, 0);
    return { totalAmount, paidAmount, unpaidAmount };
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
            Billing
          </div>
          <div style={{ color: "#94a3b8", fontSize: "14px" }}>
            Invoices, payments, and insurance methods
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
          onClick={() => alert("Demo: Create invoice (not connected to backend)")}
        >
          New Invoice
        </button>
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
          label: "Total Revenue",
          value: formatCurrency(totals.totalAmount),
          accent: "#8b5cf6",
        }, {
          label: "Collected",
          value: formatCurrency(totals.paidAmount),
          accent: "#10b981",
        }, {
          label: "Outstanding",
          value: formatCurrency(totals.unpaidAmount),
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
          gridTemplateColumns: "1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "14px",
          }}
        >
          <div style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "6px" }}>
            Invoice Status
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
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Unpaid">Unpaid</option>
          </select>
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
          <div style={{ fontWeight: 700 }}>Invoices</div>
          <div style={{ color: "#94a3b8", fontSize: "12px" }}>{filtered.length} records</div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#0b1220" }}>
                {["Invoice ID", "Date", "Patient", "Service", "Method", "Total", "Status", "Actions"].map((h) => (
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
              {filtered.map((i) => (
                <tr key={i.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "#cbd5e1" }}>{i.id}</td>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "#cbd5e1" }}>{i.date}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 600 }}>{i.patient}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{i.service}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1", whiteSpace: "nowrap" }}>{i.method}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1", whiteSpace: "nowrap" }}>{formatCurrency(i.total)}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        ...badgeStyles[i.status],
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {i.status}
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
                      onClick={() => alert(`Demo: Print ${i.id}`)}
                    >
                      Print
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
                      onClick={() => alert(`Demo: Record payment for ${i.id}`)}
                    >
                      Pay
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
