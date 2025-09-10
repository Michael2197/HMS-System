import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { DashboardPage } from "./modules/dashboard";
import OriginalDashboardPage from "./pages/dashboardpage";
import AttendancePage from "./pages/hr/attendancepage";
import PayrollPage from "./pages/hr/payrollpage";
import LearningPage from "./modules/learning/components/Learning";
import LeavePage from "./modules/leave/components/Leave";
import PerformancePage from "./modules/performance/components/Performance";
import RecruitmentPage from "./modules/recruitment/components/Recruitment";
import AnalyticsPage from "./modules/analytics/components/Analytics";
import EmployeePage from "./modules/employee/components/Employee";
import Project from "./modules/project/components/Project";

// Import new module components
import { SalesDashboard } from "./modules/sales";
import { Finance, FinanceDashboard } from "./modules/finance";
import { Husbandry, HusbandryDashboard } from "./modules/husbandry";
import { Marketing, MarketingDashboard } from "./modules/marketing";
import { Procurement, ProcurementDashboard } from "./modules/procurement";

// Import React Icons
import {
  AiFillHome,
  AiFillFolder,
  AiOutlineCheckSquare,
  AiOutlineTeam,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineUsergroupAdd,
  AiOutlineFieldTime,
  AiOutlineDollarCircle,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineFileText,
} from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import Leads from "./modules/sales/components/Leads";
import Opportunities from "./modules/sales/components/Opportunities";
import Orders from "./modules/sales/components/Orders";
import Accounts from "./modules/sales/components/Accounts";
import Time from "./modules/sales/components/Time";
import { Activities, Contacts, CRMDashboard, Deals, Reports } from "./modules/crm";
import Companies from "./modules/crm/components/Companies";

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
  content: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: "#0f172a",
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MarketingAnalyticsPage = Page("📊 Marketing Analytics");
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
  const [openDropdowns, setOpenDropdowns] = React.useState<
    Record<string, boolean>
  >({});

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

            {/* Projects Dropdown */}
            <div>
              <div
                onClick={() => toggleDropdown("projects")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div style={styles.navIcon}>
                    <AiFillFolder />
                  </div>
                  Projects
                </div>
                <span style={{ fontSize: "12px" }}>
                  {openDropdowns.projects ? "▼" : "▶"}
                </span>
              </div>
              {openDropdowns.projects && (
                <div
                  style={{
                    marginLeft: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <NavLink
                    to="/projects/dashboard"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <MdDashboard />
                    </div>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/projects/management"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiFillFolder />
                    </div>
                    Management
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/tasks"
              style={({ isActive }) =>
                isActive
                  ? { ...styles.navLink, ...styles.activeLink }
                  : styles.navLink
              }
            >
              <div style={styles.navIcon}>
                <AiOutlineCheckSquare />
              </div>
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
              <div style={styles.navIcon}>
                <AiOutlineTeam />
              </div>
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
              <div style={styles.navIcon}>
                <AiOutlineCalendar />
              </div>
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
              <div style={styles.navIcon}>
                <AiOutlineClockCircle />
              </div>
              Time
            </NavLink>

            {/* HR Dropdown */}
            <div>
              <div
                onClick={() => toggleDropdown("hr")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div style={styles.navIcon}>
                    <AiOutlineUsergroupAdd />
                  </div>
                  HR
                </div>
                <span style={{ fontSize: "12px" }}>
                  {openDropdowns.hr ? "▼" : "▶"}
                </span>
              </div>
              {openDropdowns.hr && (
                <div
                  style={{
                    marginLeft: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <NavLink
                    to="/hr/employees"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineTeam />
                    </div>
                    Employees
                  </NavLink>
                  <NavLink
                    to="/hr/attendance"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineFieldTime />
                    </div>
                    Attendance
                  </NavLink>
                  <NavLink
                    to="/hr/payroll"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineDollarCircle />
                    </div>
                    Payroll
                  </NavLink>
                  <NavLink
                    to="/hr/recruitment"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineUsergroupAdd />
                    </div>
                    Recruitment
                  </NavLink>
                  <NavLink
                    to="/hr/performance"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineBarChart />
                    </div>
                    Performance
                  </NavLink>
                  <NavLink
                    to="/hr/learning"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineFileText />
                    </div>
                    Learning
                  </NavLink>
                  <NavLink
                    to="/hr/leave"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineCalendar />
                    </div>
                    Leave
                  </NavLink>
                  <NavLink
                    to="/hr/analytics"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineBarChart />
                    </div>
                    Analytics
                  </NavLink>
                </div>
              )}
            </div>

            {/* Finance Dropdown */}
            <div>
              <div
                onClick={() => toggleDropdown("finance")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div style={styles.navIcon}>
                    <AiOutlineDollarCircle />
                  </div>
                  Finance
                </div>
                <span style={{ fontSize: "12px" }}>
                  {openDropdowns.finance ? "▼" : "▶"}
                </span>
              </div>
              {openDropdowns.finance && (
                <div
                  style={{
                    marginLeft: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <NavLink
                    to="/finance/dashboard"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <MdDashboard />
                    </div>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/finance/overview"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineBarChart />
                    </div>
                    Overview
                  </NavLink>
                </div>
              )}
            </div>

            {/* Sales Dropdown */}
            <div>
              <div
                onClick={() => toggleDropdown("sales")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div style={styles.navIcon}>
                    <AiOutlineBarChart />
                  </div>
                  Sales
                </div>
                <span style={{ fontSize: "12px" }}>
                  {openDropdowns.sales ? "▼" : "▶"}
                </span>
              </div>
              {openDropdowns.sales && (
                <div
                  style={{
                    marginLeft: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <NavLink
                    to="/sales/dashboard"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <MdDashboard />
                    </div>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/sales/Leads"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineBarChart />
                    </div>
                    Leads
                  </NavLink>

                  <NavLink
                    to="/sales/Opportunities"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineDollarCircle />
                    </div>
                    Opportunities
                  </NavLink>

                  <NavLink
                    to="/sales/Orders"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineFileText />
                    </div>
                    Orders
                  </NavLink>

                  <NavLink
                    to="/sales/Accounts"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineUsergroupAdd />
                    </div>
                    Accounts
                  </NavLink>

                  <NavLink
                    to="/sales/Time"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineFieldTime />
                    </div>
                    Time
                  </NavLink>
                </div>
              )}
            </div>

            {/* CRM Dropdown */}
            <div>
              <div
                onClick={() => toggleDropdown("crm")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div style={styles.navIcon}>
                    <AiOutlineBarChart />
                  </div>
                  CRM
                </div>
                <span style={{ fontSize: "12px" }}>
                  {openDropdowns.crm ? "▼" : "▶"}
                </span>
              </div>
              {openDropdowns.crm && (
                <div
                  style={{
                    marginLeft: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <NavLink
                    to="/crm/dashboard"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <MdDashboard />
                    </div>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/crm/contacts"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineUsergroupAdd />
                    </div>
                    Contacts
                  </NavLink>

                  <NavLink
                    to="/crm/companies"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineDollarCircle />
                    </div>
                    Companies
                  </NavLink>

                  <NavLink
                    to="/crm/deals"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineFieldTime />
                    </div>
                    Deals
                  </NavLink>

                  <NavLink
                    to="/crm/activities"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineBarChart />
                    </div>
                    Activities
                  </NavLink>

                  <NavLink
                    to="/crm/reports"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineFileText />
                    </div>
                    Reports
                  </NavLink>
                </div>
              )}
            </div>

            {/* Marketing Dropdown */}
            <div>
              <div
                onClick={() => toggleDropdown("marketing")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div style={styles.navIcon}>
                    <AiOutlineBarChart />
                  </div>
                  Marketing
                </div>
                <span style={{ fontSize: "12px" }}>
                  {openDropdowns.marketing ? "▼" : "▶"}
                </span>
              </div>
              {openDropdowns.marketing && (
                <div
                  style={{
                    marginLeft: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <NavLink
                    to="/marketing/dashboard"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <MdDashboard />
                    </div>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/marketing/overview"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineBarChart />
                    </div>
                    Overview
                  </NavLink>
                </div>
              )}
            </div>

            {/* Procurement Dropdown */}
            <div>
              <div
                onClick={() => toggleDropdown("procurement")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div style={styles.navIcon}>
                    <AiOutlineBarChart />
                  </div>
                  Procurement
                </div>
                <span style={{ fontSize: "12px" }}>
                  {openDropdowns.procurement ? "▼" : "▶"}
                </span>
              </div>
              {openDropdowns.procurement && (
                <div
                  style={{
                    marginLeft: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <NavLink
                    to="/procurement/dashboard"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <MdDashboard />
                    </div>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/procurement/overview"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineBarChart />
                    </div>
                    Overview
                  </NavLink>
                </div>
              )}
            </div>

            {/* Husbandry Dropdown */}
            <div>
              <div
                onClick={() => toggleDropdown("husbandry")}
                style={{
                  ...styles.navLink,
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div style={styles.navIcon}>
                    <AiOutlineBarChart />
                  </div>
                  Husbandry
                </div>
                <span style={{ fontSize: "12px" }}>
                  {openDropdowns.husbandry ? "▼" : "▶"}
                </span>
              </div>
              {openDropdowns.husbandry && (
                <div
                  style={{
                    marginLeft: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <NavLink
                    to="/husbandry/dashboard"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <MdDashboard />
                    </div>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/husbandry/overview"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            ...styles.navLink,
                            ...styles.activeLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                        : {
                            ...styles.navLink,
                            padding: "8px 16px",
                            fontSize: "13px",
                          }
                    }
                  >
                    <div style={styles.navIcon}>
                      <AiOutlineBarChart />
                    </div>
                    Overview
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
              <div style={styles.navIcon}>
                <AiOutlineBarChart />
              </div>
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
              <div style={styles.navIcon}>
                <AiOutlineSetting />
              </div>
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
              <div style={styles.navIcon}>
                <AiOutlineFileText />
              </div>
              Template pages
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
              <Route
                path="/projects/dashboard"
                element={<OriginalDashboardPage />}
              />
              <Route path="/projects/management" element={<ProjectsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/time" element={<TimePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/templates" element={<TemplatesPage />} />

              {/* New Module Routes */}
              <Route path="/finance/dashboard" element={<FinanceDashboard />} />
              <Route path="/finance/overview" element={<Finance />} />

              {/* CRM Routes */}
              <Route path="/crm/dashboard" element={<CRMDashboard/>} />
              <Route path="/crm/contacts" element={<Contacts/>} />
              <Route path="/crm/deals" element={<Deals/>} />
              <Route path="/crm/reports" element={<Reports/>} />
              <Route path="/crm/companies" element={<Companies/>} />
              <Route path="/crm/activities" element={<Activities/>} />


              {/* Sales Routes */}
              <Route path="/sales/dashboard" element={<SalesDashboard />} />
              <Route path="/sales/Leads" element={<Leads />} />
              <Route path="/sales/Opportunities" element={<Opportunities />} />
              <Route path="/sales/Orders" element={<Orders />} />
              <Route path="/sales/Accounts" element={<Accounts />} />
              <Route path="/sales/Time" element={<Time />} />


              



              <Route
                path="/marketing/dashboard"
                element={<MarketingDashboard />}
              />
              <Route path="/marketing/overview" element={<Marketing />} />
              <Route
                path="/procurement/dashboard"
                element={<ProcurementDashboard />}
              />
              <Route path="/procurement/overview" element={<Procurement />} />
              <Route
                path="/husbandry/dashboard"
                element={<HusbandryDashboard />}
              />
              <Route path="/husbandry/overview" element={<Husbandry />} />

              {/* Legacy routes */}
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/roles" element={<RolesPage />} />
              <Route path="/finance/reports" element={<ReportsPage />} />
              <Route path="/finance/invoices" element={<OrdersPage />} />
              <Route path="/hr/employees" element={<EmployeePage />} />
              <Route path="/hr/attendance" element={<AttendancePage />} />
              <Route path="/hr/payroll" element={<PayrollPage />} />
              <Route path="/hr/recruitment" element={<RecruitmentPage />} />
              <Route path="/hr/performance" element={<PerformancePage />} />
              <Route path="/hr/learning" element={<LearningPage />} />
              <Route path="/hr/leave" element={<LeavePage />} />
              <Route path="/hr/analytics" element={<AnalyticsPage />} />
              <Route path="/crm/leads" element={<LeadsPage />} />
              <Route
                path="/crm/opportunities"
                element={<OpportunitiesPage />}
              />
              <Route path="/compliance/audits" element={<AuditsPage />} />
              <Route path="/compliance/policies" element={<PoliciesPage />} />
              <Route
                path="/helpdesk/knowledge"
                element={<KnowledgeBasePage />}
              />
              <Route path="/helpdesk/tickets" element={<TicketsPage />} />
              <Route path="/husbandry/breeding" element={<BreedingPage />} />
              <Route path="/husbandry/feeding" element={<FeedingPage />} />
              <Route path="/husbandry/livestock" element={<LivestockPage />} />
              <Route path="/inventory/products" element={<ProductsPage />} />
              <Route path="/inventory/stock" element={<StockPage />} />
              <Route
                path="/inventory/warehouses"
                element={<WarehousesPage />}
              />
              <Route path="/marketing/analytics" element={<AnalyticsPage />} />
              <Route path="/marketing/campaigns" element={<CampaignsPage />} />
              <Route
                path="/procurement/orders"
                element={<PurchaseOrdersPage />}
              />
              <Route
                path="/procurement/suppliers"
                element={<SuppliersPage />}
              />
              <Route
                path="/quality/inspections"
                element={<InspectionsPage />}
              />
              <Route
                path="/quality/nonconformance"
                element={<NonConformancePage />}
              />
              <Route path="/reporting/builder" element={<BuilderPage />} />
              <Route
                path="/reporting/dashboard"
                element={<ReportingDashboardPage />}
              />
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
