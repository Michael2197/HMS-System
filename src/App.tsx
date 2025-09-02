import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    backgroundColor: "#f5f7fa",
    overflow: "hidden",
  },
  sidebar: {
    width: "260px",
    background: "linear-gradient(180deg, #1e1e2f 0%, #2a2a3f 100%)",
    color: "#fff",
    padding: "24px 20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "24px",
    color: "#ffffff",
    letterSpacing: "0.6px",
  },
  profile: {
    textAlign: "center",
    marginBottom: "32px",
  },
  profilePic: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
    border: "2px solid #555",
  },
  profileName: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#ddd",
  },
  switchBtn: {
    fontSize: "0.8rem",
    color: "#aaa",
    cursor: "pointer",
    marginTop: "4px",
    transition: "color 0.2s",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1rem",
    color: "#c7c7d9",
    transition: "background 0.3s ease, color 0.3s ease",
    userSelect: "none",
  },
  activeLink: {
    backgroundColor: "#3a3a5c",
    color: "#fff",
    fontWeight: 600,
    boxShadow: "inset 0 0 0 1px #555",
  },
  dropdownTrigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 18px",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "#c7c7d9",
    cursor: "pointer",
    transition: "background 0.3s ease, color 0.3s ease",
    userSelect: "none",
  },
  dropdownContainer: {
    marginLeft: "12px",
    paddingLeft: "10px",
    borderLeft: "2px solid #5c5cff",
    boxShadow: "0 0 6px rgba(92, 92, 255, 0.4)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    transition: "all 0.3s ease",
    borderRadius: "4px",
  },
  dropdownItem: {
    padding: "10px 18px",
    fontSize: "0.95rem",
    color: "#b0b0c0",
    textDecoration: "none",
    borderRadius: "6px",
    transition: "background 0.3s ease, color 0.3s ease",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#fff",
    padding: "18px 28px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.3rem",
    color: "#333",
    fontWeight: 600,
  },
  headerActions: {
    display: "flex",
    gap: "12px",
  },
  button: {
    padding: "8px 14px",
    backgroundColor: "#1e1e2f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background 0.2s ease",
  },
  content: {
    flex: 1,
    overflowY: "auto",
  },
  page: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 0 12px rgba(0,0,0,0.05)",
  },
};
// Page Generator
const Page = (label: string) => () => <div style={styles.page}>{label}</div>;

// Core Pages
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const DashboardPage = Page("🏠 Main Dashboard");
const UsersPage = Page("👥 Users Management");
const ReportsPage = Page("📄 Financial Reports");
const ProjectsPage = Page("📁 Projects");
const OrdersPage = Page("🧾 Sales Orders");

// Additional Modules
const RolesPage = Page("🛡️ Roles");
const AuditsPage = Page("📋 Compliance Audits");
const PoliciesPage = Page("📜 Compliance Policies");
const LeadsPage = Page("📞 CRM Leads");
const OpportunitiesPage = Page("💼 CRM Opportunities");
const KnowledgeBasePage = Page("📖 Helpdesk Knowledge Base");
const TicketsPage = Page("🎫 Helpdesk Tickets");
const AttendancePage = Page("🕒 HR Attendance");
const PayrollPage = Page("💰 HR Payroll");
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
const TaskBoardPage = Page("🗂️ Project Task Board");
const InspectionsPage = Page("🔍 Quality Inspections");
const NonConformancePage = Page("⚠️ Quality Non-Conformance");
const BuilderPage = Page("🧱 Report Builder");
const ReportingDashboardPage = Page("📊 Reporting Dashboard");
const QuotesPage = Page("💬 Sales Quotes");
const PlanningPage = Page("📅 SCM Planning");
const ShipmentsPage = Page("🚢 SCM Shipments");
const NotFoundPage = Page("❌ Page Not Found");

function App() {
  const [openDropdowns, setOpenDropdowns] = React.useState<
    Record<string, boolean>
  >({});

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <BrowserRouter>
      <div style={styles.container}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.logo}>ERP Company</div>
          <div style={styles.profile}>
            <img
              src="/src/assets/images.jpg"
              alt="Profile"
              style={styles.profilePic}
            />
            <div style={styles.profileName}>John Carter</div>
            <div style={styles.switchBtn}>Switch Profile</div>
          </div>
          <nav style={styles.nav}>
            {/* Dashboard */}
            <div
              style={{
                borderBottom: "1px solid #444",
                paddingBottom: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                onClick={() => toggleDropdown("dashboard")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor: "#29293d",
                }}
              >
                🏠 Dashboard ▾
              </div>
              {openDropdowns.dashboard && (
                <div
                  style={{
                    marginLeft: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <NavLink
                    to="/dashboard"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(66, 165, 245, 0.4)",
                            borderLeft: "3px solid #42a5f5",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    🏠 Main Dashboard
                  </NavLink>
                  {/* Add more dashboard-related links here if needed */}
                </div>
              )}
            </div>

            {/* Admin */}
            <div
              style={{
                borderBottom: "1px solid #444",
                paddingBottom: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                onClick={() => toggleDropdown("admin")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor: "#29293d",
                }}
              >
                🛠️ Admin ▾
              </div>
              {openDropdowns.admin && (
                <div
                  style={{
                    marginLeft: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <NavLink
                    to="/admin/users"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(255, 107, 107, 0.4)",
                            borderLeft: "3px solid #ff6b6b",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    👥 Users
                  </NavLink>
                  <NavLink
                    to="/admin/roles"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(255, 107, 107, 0.4)",
                            borderLeft: "3px solid #ff6b6b",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    🛡️ Roles
                  </NavLink>
                </div>
              )}
            </div>

            {/* Finance */}
            <div
              style={{
                borderBottom: "1px solid #444",
                paddingBottom: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                onClick={() => toggleDropdown("finance")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor: "#29293d",
                }}
              >
                📄 Finance ▾
              </div>
              {openDropdowns.finance && (
                <div
                  style={{
                    marginLeft: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <NavLink
                    to="/finance/reports"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(92, 92, 255, 0.4)",
                            borderLeft: "3px solid #5c5cff",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    📄 Reports
                  </NavLink>
                  <NavLink
                    to="/finance/invoices"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(92, 92, 255, 0.4)",
                            borderLeft: "3px solid #5c5cff",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    🧾 Invoices
                  </NavLink>
                </div>
              )}
            </div>

            {/* HR */}
            <div
              style={{
                borderBottom: "1px solid #444",
                paddingBottom: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                onClick={() => toggleDropdown("hr")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor: "#29293d",
                }}
              >
                🕒 HR ▾
              </div>
              {openDropdowns.hr && (
                <div
                  style={{
                    marginLeft: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <NavLink
                    to="/hr/attendance"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(156, 39, 176, 0.4)",
                            borderLeft: "3px solid #9c27b0",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    🕒 Attendance
                  </NavLink>
                  <NavLink
                    to="/hr/payroll"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(156, 39, 176, 0.4)",
                            borderLeft: "3px solid #9c27b0",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    💰 Payroll
                  </NavLink>
                </div>
              )}
            </div>

            {/* CRM */}
            <div
              style={{
                borderBottom: "1px solid #444",
                paddingBottom: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                onClick={() => toggleDropdown("crm")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor: "#29293d",
                }}
              >
                💼 CRM ▾
              </div>
              {openDropdowns.crm && (
                <div
                  style={{
                    marginLeft: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <NavLink
                    to="/crm/leads"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(249, 168, 37, 0.4)",
                            borderLeft: "3px solid #f9a825",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    📞 Leads
                  </NavLink>
                  <NavLink
                    to="/crm/opportunities"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(249, 168, 37, 0.4)",
                            borderLeft: "3px solid #f9a825",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    💼 Opportunities
                  </NavLink>
                </div>
              )}
            </div>

            {/* Compliance */}
            <div
              style={{
                borderBottom: "1px solid #444",
                paddingBottom: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                onClick={() => toggleDropdown("compliance")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor: "#29293d",
                }}
              >
                📋 Compliance ▾
              </div>
              {openDropdowns.compliance && (
                <div
                  style={{
                    marginLeft: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <NavLink
                    to="/compliance/audits"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(0, 201, 167, 0.4)",
                            borderLeft: "3px solid #00c9a7",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    📋 Audits
                  </NavLink>
                  <NavLink
                    to="/compliance/policies"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(0, 201, 167, 0.4)",
                            borderLeft: "3px solid #00c9a7",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    📜 Policies
                  </NavLink>
                </div>
              )}
            </div>
            {/* Helpdesk */}
            <div
              style={{
                borderBottom: "1px solid #444",
                paddingBottom: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                onClick={() => toggleDropdown("helpdesk")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor: "#29293d",
                }}
              >
                📖 Helpdesk ▾
              </div>
              {openDropdowns.helpdesk && (
                <div
                  style={{
                    marginLeft: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <NavLink
                    to="/helpdesk/knowledgebase"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(0, 188, 212, 0.4)",
                            borderLeft: "3px solid #00bcd4",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    📖 Knowledge Base
                  </NavLink>
                  <NavLink
                    to="/helpdesk/tickets"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            boxShadow: "0 0 6px rgba(0, 188, 212, 0.4)",
                            borderLeft: "3px solid #00bcd4",
                          }
                        : { ...styles.navLink, color: "#aaa" }
                    }
                  >
                    🎫 Tickets
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          <header style={styles.header}>
            <h1 style={styles.headerTitle}>Welcome, John Carter</h1>
            <div style={styles.headerActions}>
              <button style={styles.button}>Invoice</button>
              <button style={styles.button}>Employee</button>
            </div>
          </header>

          <div style={styles.content}>
            <Routes>
              {/* Dashboard */}
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Admin */}
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/roles" element={<RolesPage />} />

              {/* Compliance */}
              <Route path="/compliance/audits" element={<AuditsPage />} />
              <Route path="/compliance/policies" element={<PoliciesPage />} />

              {/* CRM */}
              <Route path="/crm/leads" element={<LeadsPage />} />
              <Route
                path="/crm/opportunities"
                element={<OpportunitiesPage />}
              />

              {/* Finance */}
              <Route path="/finance/reports" element={<ReportsPage />} />
              <Route path="/finance/invoices" element={<OrdersPage />} />

              {/* Helpdesk */}
              <Route
                path="/helpdesk/knowledgebase"
                element={<KnowledgeBasePage />}
              />
              <Route path="/helpdesk/tickets" element={<TicketsPage />} />

              {/* HR */}
              <Route path="/hr/attendance" element={<AttendancePage />} />
              <Route path="/hr/payroll" element={<PayrollPage />} />

              {/* Husbandry */}
              <Route path="/husbandry/breeding" element={<BreedingPage />} />
              <Route path="/husbandry/feeding" element={<FeedingPage />} />
              <Route path="/husbandry/livestock" element={<LivestockPage />} />

              {/* Inventory */}
              <Route path="/inventory/products" element={<ProductsPage />} />
              <Route path="/inventory/stock" element={<StockPage />} />
              <Route
                path="/inventory/warehouses"
                element={<WarehousesPage />}
              />

              {/* Marketing */}
              <Route path="/marketing/analytics" element={<AnalyticsPage />} />
              <Route path="/marketing/campaigns" element={<CampaignsPage />} />

              {/* Procurement */}
              <Route
                path="/procure/purchaseorders"
                element={<PurchaseOrdersPage />}
              />
              <Route path="/procure/suppliers" element={<SuppliersPage />} />

              {/* Projects */}
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/taskboard" element={<TaskBoardPage />} />

              {/* Quality */}
              <Route
                path="/quality/inspections"
                element={<InspectionsPage />}
              />
              <Route
                path="/quality/nonconformance"
                element={<NonConformancePage />}
              />

              {/* Reporting */}
              <Route path="/reporting/builder" element={<BuilderPage />} />
              <Route
                path="/reporting/dashboard"
                element={<ReportingDashboardPage />}
              />

              {/* Sales */}
              <Route path="/sales/quotes" element={<QuotesPage />} />
              <Route path="/sales/orders" element={<OrdersPage />} />

              {/* SCM */}
              <Route path="/scm/planning" element={<PlanningPage />} />
              <Route path="/scm/shipments" element={<ShipmentsPage />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
