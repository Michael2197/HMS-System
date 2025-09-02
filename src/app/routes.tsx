import React from 'react';
import DashboardPage from '../pages/DashboardPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/admin/LoginPage';
import UsersPage from '../pages/admin/UsersPage';
import RolesPage from '../pages/admin/RolesPage';
import LedgerPage from '../pages/finance/LedgerPage';
import InvoicesPage from '../pages/finance/InvoicesPage';
import ReportsPage from '../pages/finance/ReportsPage';
import EmployeesPage from '../pages/hr/EmployeesPage';
import PayrollPage from '../pages/hr/PayrollPage';
import AttendancePage from '../pages/hr/AttendancePage';
import WarehousesPage from '../pages/inventory/WarehousesPage';
import ProductsPage from '../pages/inventory/ProductsPage';
import StockMovementsPage from '../pages/inventory/StockMovementsPage';
import QuotesPage from '../pages/sales/QuotesPage';
import OrdersPage from '../pages/sales/OrdersPage';
import LeadsPage from '../pages/crm/LeadsPage';
import OpportunitiesPage from '../pages/crm/OpportunitiesPage';
import CampaignsPage from '../pages/marketing/CampaignsPage';
import AnalyticsPage from '../pages/marketing/AnalyticsPage';
import SuppliersPage from '../pages/procurement/SuppliersPage';
import PurchaseOrdersPage from '../pages/procurement/PurchaseOrdersPage';
import ShipmentsPage from '../pages/scm/ShipmentsPage';
import PlanningPage from '../pages/scm/PlanningPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import TaskBoardPage from '../pages/projects/TaskBoardPage';
import DashboardsPage from '../pages/reporting/DashboardsPage';
import BuilderPage from '../pages/reporting/BuilderPage';
import InspectionsPage from '../pages/quality/InspectionsPage';
import NonConformancePage from '../pages/quality/NonConformancePage';
import PoliciesPage from '../pages/compliance/PoliciesPage';
import AuditsPage from '../pages/compliance/AuditsPage';
import TicketsPage from '../pages/helpdesk/TicketsPage';
import KnowledgeBasePage from '../pages/helpdesk/KnowledgeBasePage';
import LivestockPage from '../pages/husbandry/LivestockPage';
import FeedingPage from '../pages/husbandry/FeedingPage';
import BreedingPage from '../pages/husbandry/BreedingPage';
import WorkOrdersPage from '../pages/manufacturing/WorkOrdersPage';
import BOMPage from '../pages/manufacturing/BOMPage';
import StorefrontPage from '../pages/ecommerce/StorefrontPage';
import EcommerceOrdersPage from '../pages/ecommerce/OrdersPage';

const routes = [
  { path: '/dashboard', element: <DashboardPage />, moduleKey: 'reporting' },
  { path: '/unauthorized', element: <UnauthorizedPage /> },
  { path: '/404', element: <NotFoundPage /> },
  { path: '/admin/login', element: <LoginPage /> },
  { path: '/admin/users', element: <UsersPage />, moduleKey: 'admin' },
  { path: '/admin/roles', element: <RolesPage />, moduleKey: 'admin' },
  { path: '/finance/ledger', element: <LedgerPage />, moduleKey: 'finance' },
  { path: '/finance/invoices', element: <InvoicesPage />, moduleKey: 'finance' },
  { path: '/finance/reports', element: <ReportsPage />, moduleKey: 'finance' },
  { path: '/hr/employees', element: <EmployeesPage />, moduleKey: 'hr' },
  { path: '/hr/payroll', element: <PayrollPage />, moduleKey: 'hr' },
  { path: '/hr/attendance', element: <AttendancePage />, moduleKey: 'hr_self' },
  { path: '/inventory/warehouses', element: <WarehousesPage />, moduleKey: 'inventory' },
  { path: '/inventory/products', element: <ProductsPage />, moduleKey: 'inventory' },
  { path: '/inventory/stock-movements', element: <StockMovementsPage />, moduleKey: 'inventory' },
  { path: '/sales/quotes', element: <QuotesPage />, moduleKey: 'sales' },
  { path: '/sales/orders', element: <OrdersPage />, moduleKey: 'sales' },
  { path: '/crm/leads', element: <LeadsPage />, moduleKey: 'crm' },
  { path: '/crm/opportunities', element: <OpportunitiesPage />, moduleKey: 'crm' },
  { path: '/marketing/campaigns', element: <CampaignsPage />, moduleKey: 'marketing' },
  { path: '/marketing/analytics', element: <AnalyticsPage />, moduleKey: 'marketing' },
  { path: '/procurement/suppliers', element: <SuppliersPage />, moduleKey: 'procurement' },
  { path: '/procurement/purchase-orders', element: <PurchaseOrdersPage />, moduleKey: 'procurement' },
  { path: '/scm/shipments', element: <ShipmentsPage />, moduleKey: 'scm' },
  { path: '/scm/planning', element: <PlanningPage />, moduleKey: 'scm' },
  { path: '/projects', element: <ProjectsPage />, moduleKey: 'projects' },
  { path: '/projects/board', element: <TaskBoardPage />, moduleKey: 'projects' },
  { path: '/reporting/dashboards', element: <DashboardsPage />, moduleKey: 'reporting' },
  { path: '/reporting/builder', element: <BuilderPage />, moduleKey: 'reporting' },
  { path: '/quality/inspections', element: <InspectionsPage />, moduleKey: 'quality' },
  { path: '/quality/ncr', element: <NonConformancePage />, moduleKey: 'quality' },
  { path: '/compliance/policies', element: <PoliciesPage />, moduleKey: 'compliance' },
  { path: '/compliance/audits', element: <AuditsPage />, moduleKey: 'compliance' },
  { path: '/helpdesk/tickets', element: <TicketsPage />, moduleKey: 'helpdesk' },
  { path: '/helpdesk/kb', element: <KnowledgeBasePage />, moduleKey: 'helpdesk' },
  { path: '/husbandry/livestock', element: <LivestockPage />, moduleKey: 'husbandry' },
  { path: '/husbandry/feeding', element: <FeedingPage />, moduleKey: 'husbandry' },
  { path: '/husbandry/breeding', element: <BreedingPage />, moduleKey: 'husbandry' },
  //{ path: '/manufacturing/work-orders', element: <WorkOrdersPage />, moduleKey: 'manufacturing' },
  //{ path: '/manufacturing/bom', element: <BOMPage />, moduleKey: 'manufacturing' },
  // path: '/ecommerce/storefront', element: <StorefrontPage />, moduleKey: 'ecommerce' },
 // { path: '/ecommerce/orders', element: <EcommerceOrdersPage />, moduleKey: 'ecommerce' }
];
export default routes;
//  Temporarily disabling manufacturing and ecommerce modules