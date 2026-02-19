import React from "react";

type PatientStatus = "Inpatient" | "Outpatient" | "Discharged";

type Patient = {
  id: string;
  name: string;
  gender: "Male" | "Female";
  age: number;
  phone: string;
  department: string;
  doctor: string;
  status: PatientStatus;
  lastVisit: string;
};

const badgeStyles: Record<PatientStatus, React.CSSProperties> = {
  Inpatient: {
    backgroundColor: "rgba(6, 182, 212, 0.15)",
    color: "#67e8f9",
    border: "1px solid rgba(6, 182, 212, 0.35)",
  },
  Outpatient: {
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    color: "#c4b5fd",
    border: "1px solid rgba(139, 92, 246, 0.35)",
  },
  Discharged: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.35)",
  },
};

const patients: Patient[] = [
  {
    id: "PT-10021",
    name: "Mona Hassan",
    gender: "Female",
    age: 34,
    phone: "+20 100 555 1212",
    department: "Cardiology",
    doctor: "Dr. Omar Ali",
    status: "Outpatient",
    lastVisit: "2026-01-14",
  },
  {
    id: "PT-10022",
    name: "Ahmed Saeed",
    gender: "Male",
    age: 52,
    phone: "+20 101 222 0909",
    department: "Orthopedics",
    doctor: "Dr. Sara Youssef",
    status: "Inpatient",
    lastVisit: "2026-01-16",
  },
  {
    id: "PT-10023",
    name: "Lina Mahmoud",
    gender: "Female",
    age: 27,
    phone: "+20 102 777 4040",
    department: "Dermatology",
    doctor: "Dr. Karim Nabil",
    status: "Outpatient",
    lastVisit: "2026-01-11",
  },
  {
    id: "PT-10024",
    name: "Youssef Adel",
    gender: "Male",
    age: 41,
    phone: "+20 120 333 8383",
    department: "General Surgery",
    doctor: "Dr. Nada Ibrahim",
    status: "Discharged",
    lastVisit: "2026-01-08",
  },
  {
    id: "PT-10025",
    name: "Salma Mostafa",
    gender: "Female",
    age: 19,
    phone: "+20 111 010 2121",
    department: "Pediatrics",
    doctor: "Dr. Hany Fathy",
    status: "Outpatient",
    lastVisit: "2026-01-15",
  },
];

export default function PatientsPage() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"All" | PatientStatus>("All");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return patients.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.doctor.toLowerCase().includes(q);
      const matchesStatus = status === "All" ? true : p.status === status;
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
            Patients
          </div>
          <div style={{ color: "#94a3b8", fontSize: "14px" }}>
            Registration, status tracking, and quick access to patient profiles
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
              alert("Demo: Add Patient (not connected to backend)");
            }}
          >
            Add Patient
          </button>
        </div>
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
            placeholder="Search by patient name, ID, doctor, department"
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
            <option value="Outpatient">Outpatient</option>
            <option value="Inpatient">Inpatient</option>
            <option value="Discharged">Discharged</option>
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
          <div style={{ fontWeight: 700 }}>Patient List</div>
          <div style={{ color: "#94a3b8", fontSize: "12px" }}>{filtered.length} records</div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#0b1220" }}>
                {[
                  "Patient ID",
                  "Name",
                  "Gender",
                  "Age",
                  "Department",
                  "Doctor",
                  "Status",
                  "Last Visit",
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
              {filtered.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "#cbd5e1" }}>{p.id}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{p.gender}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{p.age}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{p.department}</td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>{p.doctor}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        ...badgeStyles[p.status],
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", color: "#cbd5e1", whiteSpace: "nowrap" }}>{p.lastVisit}</td>
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
                      onClick={() => alert(`Demo: Open profile for ${p.name}`)}
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
                      onClick={() => alert(`Demo: Call ${p.phone}`)}
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
