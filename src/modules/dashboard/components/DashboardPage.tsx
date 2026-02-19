import KeyMetricsCards from './KeyMetricsCards';
import SalesOverTimeChart from './SalesOverTimeChart';
import TopProductsChart from './TopProductsChart';
import ExpensesBreakdownChart from './ExpensesBreakdownChart';
import ExecutiveAlerts from './ExecutiveAlerts';
import './ChartAnimations.css';

export default function DashboardPage() {
  // Dashboard configuration based on the provided JSON
  const dashboardConfig = {
    keyMetrics: [
      {
        title: "Patients Today",
        value: "128",
        change: "8.2%",
        changeType: "increase" as const,
        icon: "person",
        options: "three dots"
      },
      {
        title: "Appointments",
        value: "76",
        change: "3.1%",
        changeType: "increase" as const,
        icon: "sales tag",
        options: "three dots"
      },
      {
        title: "Admissions",
        value: "14",
        change: "6.5%",
        changeType: "increase" as const,
        icon: "star",
        options: "three dots"
      },
      {
        title: "Bed Occupancy",
        value: "82%",
        change: "2.4%",
        changeType: "decrease" as const,
        icon: "star",
        options: "three dots"
      }
    ],
    charts: {
      salesOverTime: {
        title: "Hospital activity over time",
        totalSales: "1,248 Visits",
        increase: "12.3%",
        legend: [
          {
            name: "Visits",
            color: "purple"
          },
          {
            name: "Admissions",
            color: "blue"
          }
        ],
        timeframeSelector: "Jan 2024 - Dec 2024",
        type: "area chart",
        axes: {
          y: "0K to 250K",
          x: "months"
        },
        tooltip: {
          value: "142",
          change: "5.4%",
          date: "June 21, 2024"
        }
      },
      topProducts: {
        title: "Top Departments",
        type: "bar chart",
        timeLabels: ["12 AM", "4 AM", "8 AM", "4 PM", "8 PM"],
        viewReportLink: "View report"
      },
      expensesBreakdown: {
        mainValue: "128",
        description: "Patient Mix",
        type: "donut chart",
        segments: [
          {
            value: "74",
            label: "Outpatient",
            color: "purple"
          },
          {
            value: "38",
            label: "Inpatient",
            color: "blue"
          },
          {
            value: "16",
            label: "Emergency",
            color: "light blue"
          }
        ]
      }
    },
    execAlerts: {
      commonElements: {
        selectDate: "dropdown",
        exportData: "button",
        createActionList: "button (purple)"
      },
      tables: [
        {
          title: "Clinical & Ops Alerts",
          columns: [
            "Case",
            "Date",
            "Status",
            "Notes"
          ],
          statusTagColors: {
            "Low Stock": "red",
            "Pending Approval": "orange/yellow",
            "Overdue Task": "red",
            "Done": "green",
            "Paid": "green"
          }
        },
        {
          title: "Finance & Inventory Alerts",
          columns: [
            "Case",
            "Date",
            "Status",
            "Notes"
          ],
          statusTagColors: {
            "Low Stock": "red",
            "Pending Approval": "orange/yellow",
            "Overdue Task": "red",
            "Done": "green",
            "Paid": "green"
          }
        }
      ]
    }
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: 'var(--hms-bg)',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
        `,
        animation: 'pulse 8s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Key Metrics Cards */}
      <KeyMetricsCards metrics={dashboardConfig.keyMetrics} />

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Left Column - Sales Over Time Chart */}
        <div>
          <SalesOverTimeChart {...dashboardConfig.charts.salesOverTime} />
        </div>

        {/* Right Column - Top Products and Expenses Breakdown */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {/* Top Products Chart */}
          <TopProductsChart {...dashboardConfig.charts.topProducts} />

          {/* Expenses Breakdown Chart */}
          <ExpensesBreakdownChart {...dashboardConfig.charts.expensesBreakdown} />
        </div>
      </div>

      {/* Executive Alerts Section */}
      <ExecutiveAlerts
        commonElements={dashboardConfig.execAlerts.commonElements}
        tables={dashboardConfig.execAlerts.tables}
      />
      </div>
    </div>
  );
}
