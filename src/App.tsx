import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { DashboardPage } from "./modules/dashboard";
import OriginalDashboardPage from "./pages/dashboardpage";
import PatientsPage from "./pages/hospital/PatientsPage";
import AppointmentsPage from "./pages/hospital/AppointmentsPage";
import DoctorsPage from "./pages/hospital/DoctorsPage";
import BillingPage from "./pages/hospital/BillingPage";
import PharmacyPage from "./pages/hospital/PharmacyPage";
import LabPage from "./pages/hospital/LabPage";
import OperationsManagementPage from "./pages/hospital/OperationsManagementPage";

// Import React Icons
import {
  AiFillHome,
  AiFillFolder,
  AiOutlineTeam,
  AiOutlineCalendar,
  AiOutlineUsergroupAdd,
  AiOutlineBarChart,
  AiOutlineStar,
  AiOutlineSetting,
  AiOutlineFileText,
} from "react-icons/ai";
import { MdDashboard } from "react-icons/md";

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "var(--hms-bg)",
    overflow: "hidden",
  },
  sidebar: {
    width: "280px",
    background: "var(--hms-surface)",
    color: "var(--hms-text)",
    padding: "24px 0",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid var(--hms-border)",
    height: "100vh",
    overflow: "hidden",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "20px",
    fontWeight: 700,
    padding: "0 24px",
    marginBottom: "32px",
    color: "var(--hms-text)",
  },
  logoIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, var(--hms-primary) 0%, var(--hms-primary-2) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
  profile: {
    padding: "0 24px",
    marginBottom: "32px",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  profilePic: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "var(--hms-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "600",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: "16px",
    fontWeight: 600,
    color: "var(--hms-text)",
    margin: 0,
  },
  profileRole: {
    fontSize: "14px",
    color: "var(--hms-muted)",
    margin: 0,
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 16px 20px 16px",
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    scrollbarColor: "#475569 #1e293b",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    color: "var(--hms-muted)",
    transition: "all 0.2s ease",
    userSelect: "none",
  },
  activeLink: {
    backgroundColor: "rgba(0, 184, 217, 0.12)",
    color: "var(--hms-text)",
    fontWeight: 500,
  },
  navIcon: {
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: "var(--hms-bg)",
  },
};

// Page Generator
const Page = (label: string) => () =>
  (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#0f172a",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {label}
    </div>
  );

// Core Pages
const SettingsPage = Page("Settings");

// Hospital (HMS)
const NotFoundPage = Page("❌ Page Not Found");

function App() {
  return (
    <BrowserRouter>
      <style>
        {`
          .sidebar-nav::-webkit-scrollbar {
            width: 6px;
          }
          .sidebar-nav::-webkit-scrollbar-track {
            background: #1e293b;
          }
          .sidebar-nav::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 3px;
          }
          .sidebar-nav::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }
        `}
      </style>
      <div style={styles.container}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>P</div>
            Hospital HMS
          </div>

          <div style={styles.profile}>
            <div style={styles.profileContainer}>
              <div style={styles.profilePic}>JC</div>
              <div style={styles.profileInfo}>
                <div style={styles.profileName}>John Carter</div>
                <div style={styles.profileRole}>Hospital Administrator</div>
              </div>
            </div>
          </div>

          <nav style={styles.nav} className="sidebar-nav">
            <NavLink
              to="/dashboard"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <AiFillHome />
              </div>
              Dashboard
            </NavLink>

            <div
              style={{
                padding: "10px 16px 6px 16px",
                color: "#64748b",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              Hospital
            </div>

            <NavLink
              to="/hospital/patients"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <AiOutlineUsergroupAdd />
              </div>
              Patients
            </NavLink>

            <NavLink
              to="/hospital/appointments"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <AiOutlineCalendar />
              </div>
              Appointments
            </NavLink>

            <NavLink
              to="/hospital/doctors"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <AiOutlineTeam />
              </div>
              Doctors
            </NavLink>

            <NavLink
              to="/hospital/billing"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <AiOutlineFileText />
              </div>
              Billing
            </NavLink>

            <NavLink
              to="/hospital/pharmacy"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <AiOutlineStar />
              </div>
              Pharmacy
            </NavLink>

            <NavLink
              to="/hospital/lab"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <AiOutlineBarChart />
              </div>
              Laboratory
            </NavLink>

            <div
              style={{
                padding: "14px 16px 6px 16px",
                color: "#64748b",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              Operations
            </div>

            <NavLink
              to="/operations/dashboard"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <MdDashboard />
              </div>
              Operations Dashboard
            </NavLink>

            <NavLink
              to="/operations/management"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <AiFillFolder />
              </div>
              Operations Management
            </NavLink>

            <NavLink
              to="/settings"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <AiOutlineSetting />
              </div>
              Settings
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          {/* Content */}
          <div style={styles.content}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/hospital/patients" element={<PatientsPage />} />
              <Route path="/hospital/appointments" element={<AppointmentsPage />} />
              <Route path="/hospital/doctors" element={<DoctorsPage />} />
              <Route path="/hospital/billing" element={<BillingPage />} />
              <Route path="/hospital/pharmacy" element={<PharmacyPage />} />
              <Route path="/hospital/lab" element={<LabPage />} />
              <Route path="/operations/dashboard" element={<OriginalDashboardPage />} />
              <Route path="/operations/management" element={<OperationsManagementPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
