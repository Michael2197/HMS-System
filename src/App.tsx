import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import DashboardPage from "./pages/dashboardpage";
import AttendancePage from "./pages/hr/attendancepage";
import PayrollPage from "./pages/hr/payrollpage";
import Project from "./modules/project/components/Project";

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#0f172a",
    overflow: "hidden",
  },
  sidebar: {
    width: "280px",
    background: "#1e293b",
    color: "#fff",
    padding: "24px 0",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #334155",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "20px",
    fontWeight: 700,
    padding: "0 24px",
    marginBottom: "32px",
    color: "#ffffff",
  },
  logoIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
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
    backgroundColor: "#8b5cf6",
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
    color: "#ffffff",
    margin: 0,
  },
  profileRole: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: 0,
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 16px",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    color: "#94a3b8",
    transition: "all 0.2s ease",
    userSelect: "none",
  },
  activeLink: {
    backgroundColor: "#334155",
    color: "#ffffff",
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
  header: {
    backgroundColor: "#1e293b",
    padding: "16px 24px",
    borderBottom: "1px solid #334155",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flex: 1,
    maxWidth: "600px",
  },
  searchIcon: {
    color: "#94a3b8",
    fontSize: "20px",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#334155",
    border: "1px solid #475569",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
  },
  newProjectBtn: {
    backgroundColor: "#8b5cf6",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.2s ease",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: "#0f172a",
  },
};

// Page Generator
const Page = (label: string) => () => (
  <div style={{ 
    padding: '24px', 
    backgroundColor: '#0f172a', 
    color: '#fff', 
    minHeight: '100vh' 
  }}>
    {label}
  </div>
);

// Core Pages
const UsersPage = Page("👥 Users Management");
const ReportsPage = Page("📄 Financial Reports");
const ProjectsPage = Project;
const OrdersPage = Page("🧾 Sales Orders");
const TasksPage = Page("Tasks");
const TeamPage = Page("Team");
const CalendarPage = Page("Calendar");
const TimePage = Page("Time");
const SettingsPage = Page("Settings");
const TemplatesPage = Page("Template pages");

// Additional Modules
const RolesPage = Page("🛡️ Roles");
const AuditsPage = Page("📋 Compliance Audits");
const PoliciesPage = Page("📜 Compliance Policies");
const LeadsPage = Page("📞 CRM Leads");
const OpportunitiesPage = Page("💼 CRM Opportunities");
const KnowledgeBasePage = Page("📖 Helpdesk Knowledge Base");
const TicketsPage = Page("🎫 Helpdesk Tickets");
const BreedingPage = Page("🐄 Husbandry Breeding");
const FeedingPage = Page("🥕 Husbandry Feeding");
const LivestockPage = Page("🐑 Husbandry Livestock");
const ProductsPage = Page("📦 Inventory Products");
const StockPage = Page("🚚 Inventory Stock");
const WarehousesPage = Page("🏭 Inventory Warehouses");
const AnalyticsPage = Page("📊 Marketing Analytics");
const CampaignsPage = Page("📣 Marketing Campaigns");
const PurchaseOrdersPage = Page("🛒 Procurement Orders");
const SuppliersPage = Page("🏷️ Procurement Suppliers");
const InspectionsPage = Page("🔍 Quality Inspections");
const NonConformancePage = Page("⚠️ Quality Non-Conformance");
const BuilderPage = Page("🧱 Report Builder");
const ReportingDashboardPage = Page("📊 Reporting Dashboard");
const QuotesPage = Page("💬 Sales Quotes");
const PlanningPage = Page("📅 SCM Planning");
const ShipmentsPage = Page("🚢 SCM Shipments");
const NotFoundPage = Page("❌ Page Not Found");

function App() {
  const [openDropdowns, setOpenDropdowns] = React.useState<Record<string, boolean>>({});

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <BrowserRouter>
      <div style={styles.container}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>P</div>
            Projects Company
          </div>
          
          <div style={styles.profile}>
            <div style={styles.profileContainer}>
              <div style={styles.profilePic}>JC</div>
              <div style={styles.profileInfo}>
                <div style={styles.profileName}>John Carter</div>
                <div style={styles.profileRole}>Project Manager</div>
              </div>
            </div>
          </div>
          
          <nav style={styles.nav}>
            <NavLink
              to="/dashboard"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>🏠</div>
              Dashboard
            </NavLink>
            
            <NavLink
              to="/projects"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>📁</div>
              Projects
            </NavLink>
            
            <NavLink
              to="/tasks"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>✓</div>
              Tasks
            </NavLink>
            
            <NavLink
              to="/team"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>👥</div>
              Team
            </NavLink>
            
            <NavLink
              to="/calendar"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>📅</div>
              Calendar
            </NavLink>
            
            <NavLink
              to="/time"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>⏰</div>
              Time
            </NavLink>
            
            {/* HR Dropdown */}
            <div>
              <div
                onClick={() => toggleDropdown("hr")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={styles.navIcon}>👥</div>
                  HR
                </div>
                <span style={{ fontSize: "12px" }}>
                  {openDropdowns.hr ? "▼" : "▶"}
                </span>
              </div>
              {openDropdowns.hr && (
                <div style={{
                  marginLeft: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  marginTop: "4px",
                  marginBottom: "8px"
                }}>
                  <NavLink
                    to="/hr/attendance"
                    style={({ isActive }) =>
                      isActive
                        ? { ...styles.navLink, ...styles.activeLink, padding: "8px 16px", fontSize: "13px" }
                        : { ...styles.navLink, padding: "8px 16px", fontSize: "13px" }
                    }
                  >
                    <div style={styles.navIcon}>🕒</div>
                    Attendance
                  </NavLink>
                  <NavLink
                    to="/hr/payroll"
                    style={({ isActive }) =>
                      isActive
                        ? { ...styles.navLink, ...styles.activeLink, padding: "8px 16px", fontSize: "13px" }
                        : { ...styles.navLink, padding: "8px 16px", fontSize: "13px" }
                    }
                  >
                    <div style={styles.navIcon}>💰</div>
                    Payroll
                  </NavLink>
                </div>
              )}
            </div>
            
            <NavLink
              to="/reports"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>📊</div>
              Reports
            </NavLink>
            
            <NavLink
              to="/settings"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>⚙️</div>
              Settings
            </NavLink>
            
            <NavLink
              to="/templates"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>📄</div>
              Template pages
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          {/* Header */}
          <header style={styles.header}>
            <div style={styles.searchContainer}>
              <div style={styles.searchIcon}>🔍</div>
              <input
                type="text"
                placeholder="Search..."
                style={styles.searchInput}
              />
            </div>
            <button style={styles.newProjectBtn}>
              + New Project
            </button>
          </header>

          {/* Content */}
          <div style={styles.content}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/time" element={<TimePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              
              {/* Legacy routes */}
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/roles" element={<RolesPage />} />
              <Route path="/finance/reports" element={<ReportsPage />} />
              <Route path="/finance/invoices" element={<OrdersPage />} />
              <Route path="/hr/attendance" element={<AttendancePage />} />
              <Route path="/hr/payroll" element={<PayrollPage />} />
              <Route path="/crm/leads" element={<LeadsPage />} />
              <Route path="/crm/opportunities" element={<OpportunitiesPage />} />
              <Route path="/compliance/audits" element={<AuditsPage />} />
              <Route path="/compliance/policies" element={<PoliciesPage />} />
              <Route path="/helpdesk/knowledge" element={<KnowledgeBasePage />} />
              <Route path="/helpdesk/tickets" element={<TicketsPage />} />
              <Route path="/husbandry/breeding" element={<BreedingPage />} />
              <Route path="/husbandry/feeding" element={<FeedingPage />} />
              <Route path="/husbandry/livestock" element={<LivestockPage />} />
              <Route path="/inventory/products" element={<ProductsPage />} />
              <Route path="/inventory/stock" element={<StockPage />} />
              <Route path="/inventory/warehouses" element={<WarehousesPage />} />
              <Route path="/marketing/analytics" element={<AnalyticsPage />} />
              <Route path="/marketing/campaigns" element={<CampaignsPage />} />
              <Route path="/procurement/orders" element={<PurchaseOrdersPage />} />
              <Route path="/procurement/suppliers" element={<SuppliersPage />} />
              <Route path="/quality/inspections" element={<InspectionsPage />} />
              <Route path="/quality/nonconformance" element={<NonConformancePage />} />
              <Route path="/reporting/builder" element={<BuilderPage />} />
              <Route path="/reporting/dashboard" element={<ReportingDashboardPage />} />
              <Route path="/sales/orders" element={<OrdersPage />} />
              <Route path="/sales/quotes" element={<QuotesPage />} />
              <Route path="/scm/planning" element={<PlanningPage />} />
              <Route path="/scm/shipments" element={<ShipmentsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

