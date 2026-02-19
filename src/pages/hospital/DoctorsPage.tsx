import React from "react";

type DoctorStatus = "Available" | "On Duty" | "Off Duty";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  status: DoctorStatus;
  room: string;
  nextSlot: string;
};

const badgeStyles: Record<DoctorStatus, React.CSSProperties> = {
  Available: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.35)",
  },
  "On Duty": {
    backgroundColor: "rgba(6, 182, 212, 0.15)",
    color: "#67e8f9",
    border: "1px solid rgba(6, 182, 212, 0.35)",
  },
  "Off Duty": {
    backgroundColor: "rgba(148, 163, 184, 0.15)",
    color: "#cbd5e1",
    border: "1px solid rgba(148, 163, 184, 0.35)",
  },
};

const doctors: Doctor[] = [
  {
    id: "DR-0007",
    name: "Dr. Omar Ali",
    specialty: "Cardiology",
    phone: "+20 100 888 1010",
    status: "On Duty",
    room: "C-201",
    nextSlot: "11:15",
  },
  {
    id: "DR-0012",
    name: "Dr. Sara Youssef",
    specialty: "Orthopedics",
    phone: "+20 101 445 2200",
    status: "Available",
    room: "O-105",
    nextSlot: "10:45",
  },
  {
    id: "DR-0020",
    name: "Dr. Karim Nabil",
    specialty: "Dermatology",
    phone: "+20 102 330 7788",
    status: "Off Duty",
    room: "D-014",
    nextSlot: "Tomorrow 09:00",
  },
  {
    id: "DR-0031",
    name: "Dr. Nada Ibrahim",
    specialty: "General Surgery",
    phone: "+20 111 900 1212",
    status: "On Duty",
    room: "S-310",
    nextSlot: "13:30",
  },
  {
    id: "DR-0044",
    name: "Dr. Hany Fathy",
    specialty: "Pediatrics",
    phone: "+20 120 200 3333",
    status: "Available",
    room: "P-022",
    nextSlot: "12:15",
  },
];

export default function DoctorsPage() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"All" | DoctorStatus>("All");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return doctors.filter((d) => {
      const matchesQuery =
        q.length === 0 ||
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q);
      const matchesStatus = status === "All" ? true : d.status === status;
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
            Doctors
          </div>
          <div style={{ color: "#94a3b8", fontSize: "14px" }}>
            Staff directory and availability overview
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
          onClick={() => alert("Demo: Add Doctor (not connected to backend)")}
        >
          Add Doctor
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
            placeholder="Search by doctor name, ID, specialty"
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
            <option value="Available">Available</option>
            <option value="On Duty">On Duty</option>
            <option value="Off Duty">Off Duty</option>
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
          <div style={{ fontWeight: 700 }}>Doctor Directory</div>
          <div style={{ color: "#94a3b8", fontSize: "12px" }}>{filtered.length} records</div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#0b1220" }}>
                {[
                  "Doctor ID",
                  "Name",
                  "Specialty",
                  "Room",
                  "Status",
                  "Next Slot",
                  "Phone",
                  "Actions",
                ].map((h) => (
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
              {filtered.map((d) => (
                <tr key={d.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "#cbd5e1" }}>{d.id}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 600 }}>{d.name}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{d.specialty}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1", whiteSpace: "nowrap" }}>{d.room}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        ...badgeStyles[d.status],
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1", whiteSpace: "nowrap" }}>{d.nextSlot}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1", whiteSpace: "nowrap" }}>{d.phone}</td>
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
                      onClick={() => alert(`Demo: View profile for ${d.name}`)}
                    >
                      Profile
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
                      onClick={() => alert(`Demo: Call ${d.phone}`)}
                    >
                      Call
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
