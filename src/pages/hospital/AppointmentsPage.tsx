import React from "react";

type AppointmentStatus = "Scheduled" | "Checked-in" | "Completed" | "Cancelled";

type Appointment = {
  id: string;
  patient: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  payment: "Unpaid" | "Paid";
};

const badgeStyles: Record<AppointmentStatus, React.CSSProperties> = {
  Scheduled: {
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    color: "#c4b5fd",
    border: "1px solid rgba(139, 92, 246, 0.35)",
  },
  "Checked-in": {
    backgroundColor: "rgba(6, 182, 212, 0.15)",
    color: "#67e8f9",
    border: "1px solid rgba(6, 182, 212, 0.35)",
  },
  Completed: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.35)",
  },
  Cancelled: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    color: "#fca5a5",
    border: "1px solid rgba(239, 68, 68, 0.35)",
  },
};

const appointments: Appointment[] = [
  {
    id: "AP-22001",
    patient: "Mona Hassan",
    doctor: "Dr. Omar Ali",
    department: "Cardiology",
    date: "2026-01-16",
    time: "10:30",
    status: "Checked-in",
    payment: "Paid",
  },
  {
    id: "AP-22002",
    patient: "Ahmed Saeed",
    doctor: "Dr. Sara Youssef",
    department: "Orthopedics",
    date: "2026-01-16",
    time: "12:00",
    status: "Scheduled",
    payment: "Unpaid",
  },
  {
    id: "AP-22003",
    patient: "Salma Mostafa",
    doctor: "Dr. Hany Fathy",
    department: "Pediatrics",
    date: "2026-01-17",
    time: "09:15",
    status: "Scheduled",
    payment: "Paid",
  },
  {
    id: "AP-22004",
    patient: "Lina Mahmoud",
    doctor: "Dr. Karim Nabil",
    department: "Dermatology",
    date: "2026-01-17",
    time: "14:45",
    status: "Cancelled",
    payment: "Unpaid",
  },
  {
    id: "AP-22005",
    patient: "Youssef Adel",
    doctor: "Dr. Nada Ibrahim",
    department: "General Surgery",
    date: "2026-01-18",
    time: "11:00",
    status: "Completed",
    payment: "Paid",
  },
];

export default function AppointmentsPage() {
  const [date, setDate] = React.useState("2026-01-16");
  const [status, setStatus] = React.useState<"All" | AppointmentStatus>("All");

  const filtered = React.useMemo(() => {
    return appointments.filter((a) => {
      const matchesDate = date ? a.date === date : true;
      const matchesStatus = status === "All" ? true : a.status === status;
      return matchesDate && matchesStatus;
    });
  }, [date, status]);

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
            Appointments
          </div>
          <div style={{ color: "#94a3b8", fontSize: "14px" }}>
            Scheduling board with check-in and payment overview
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
            onClick={() => {
              alert("Demo: New appointment (not connected to backend)");
            }}
          >
            New Appointment
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
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
            Date
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            <option value="Scheduled">Scheduled</option>
            <option value="Checked-in">Checked-in</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
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
          <div style={{ fontWeight: 700 }}>Schedule</div>
          <div style={{ color: "#94a3b8", fontSize: "12px" }}>{filtered.length} appointments</div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#0b1220" }}>
                {[
                  "Appointment ID",
                  "Time",
                  "Patient",
                  "Doctor",
                  "Department",
                  "Status",
                  "Payment",
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
              {filtered.map((a) => (
                <tr key={a.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "#cbd5e1" }}>{a.id}</td>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "#cbd5e1" }}>{a.time}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 600 }}>{a.patient}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{a.doctor}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{a.department}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        ...badgeStyles[a.status],
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {a.status}
                    </span>
                  </td>
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
                        backgroundColor: a.payment === "Paid" ? "rgba(16, 185, 129, 0.15)" : "rgba(251, 191, 36, 0.15)",
                        color: a.payment === "Paid" ? "#6ee7b7" : "#fde68a",
                        border: a.payment === "Paid" ? "1px solid rgba(16, 185, 129, 0.35)" : "1px solid rgba(251, 191, 36, 0.35)",
                      }}
                    >
                      {a.payment}
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
                      onClick={() => alert(`Demo: Check-in ${a.patient}`)}
                    >
                      Check-in
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
                      onClick={() => alert(`Demo: Open invoice for ${a.id}`)}
                    >
                      Invoice
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
