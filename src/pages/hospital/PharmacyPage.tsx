import React from "react";

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

type Medicine = {
  sku: string;
  name: string;
  category: string;
  stock: number;
  reorderLevel: number;
  unitPrice: number;
  status: StockStatus;
};

const badgeStyles: Record<StockStatus, React.CSSProperties> = {
  "In Stock": {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.35)",
  },
  "Low Stock": {
    backgroundColor: "rgba(251, 191, 36, 0.15)",
    color: "#fde68a",
    border: "1px solid rgba(251, 191, 36, 0.35)",
  },
  "Out of Stock": {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    color: "#fca5a5",
    border: "1px solid rgba(239, 68, 68, 0.35)",
  },
};

const meds: Medicine[] = [
  {
    sku: "MED-0011",
    name: "Amoxicillin 500mg",
    category: "Antibiotic",
    stock: 120,
    reorderLevel: 30,
    unitPrice: 22,
    status: "In Stock",
  },
  {
    sku: "MED-0042",
    name: "Paracetamol 500mg",
    category: "Analgesic",
    stock: 18,
    reorderLevel: 40,
    unitPrice: 3,
    status: "Low Stock",
  },
  {
    sku: "MED-0099",
    name: "Insulin (10ml)",
    category: "Endocrine",
    stock: 0,
    reorderLevel: 10,
    unitPrice: 180,
    status: "Out of Stock",
  },
  {
    sku: "MED-0058",
    name: "Omeprazole 20mg",
    category: "Gastro",
    stock: 64,
    reorderLevel: 20,
    unitPrice: 12,
    status: "In Stock",
  },
];

const formatCurrency = (n: number) => `${n.toLocaleString()} EGP`;

export default function PharmacyPage() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"All" | StockStatus>("All");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return meds.filter((m) => {
      const matchesQuery =
        q.length === 0 ||
        m.name.toLowerCase().includes(q) ||
        m.sku.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q);
      const matchesStatus = status === "All" ? true : m.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

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
            Pharmacy
          </div>
          <div style={{ color: "#94a3b8", fontSize: "14px" }}>
            Inventory, stock status, and reorder tracking
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
          onClick={() => alert("Demo: Add Medicine (not connected to backend)")}
        >
          Add Medicine
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
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
            Search
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by medicine name, SKU, category"
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

        <div
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "14px",
          }}
        >
          <div style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "6px" }}>
            Stock Status
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
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
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
          <div style={{ fontWeight: 700 }}>Stock</div>
          <div style={{ color: "#94a3b8", fontSize: "12px" }}>{filtered.length} items</div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#0b1220" }}>
                {["SKU", "Name", "Category", "Stock", "Reorder", "Unit Price", "Status", "Actions"].map((h) => (
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
              {filtered.map((m) => (
                <tr key={m.sku} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "#cbd5e1" }}>{m.sku}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 600 }}>{m.name}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{m.category}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{m.stock}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{m.reorderLevel}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1", whiteSpace: "nowrap" }}>{formatCurrency(m.unitPrice)}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        ...badgeStyles[m.status],
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {m.status}
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
                      onClick={() => alert(`Demo: Dispense ${m.name}`)}
                    >
                      Dispense
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
                      onClick={() => alert(`Demo: Reorder ${m.sku}`)}
                    >
                      Reorder
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
