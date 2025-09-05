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
        title: "Revenues",
        value: "50.8K",
        change: "28.4%",
        changeType: "increase" as const,
        icon: "dollar",
        options: "three dots"
      },
      {
        title: "Expenses",
        value: "23.6K",
        change: "12.6%",
        changeType: "decrease" as const,
        icon: "person",
        options: "three dots"
      },
      {
        title: "Sales",
        value: "756",
        change: "3.9%",
        changeType: "increase" as const,
        icon: "sales tag",
        options: "three dots"
      },
      {
        title: "Inventory Levels",
        value: "2.3K",
        change: "11.3%",
        changeType: "increase" as const,
        icon: "star",
        options: "three dots"
      }
    ],
    charts: {
      salesOverTime: {
        title: "Sales over time",
        totalSales: "$240.8K",
        increase: "24.6%",
        legend: [
          {
            name: "Revenue",
            color: "purple"
          },
          {
            name: "Expenses",
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
          value: "$125.2K",
          change: "12.5%",
          date: "June 21, 2024"
        }
      },
      topProducts: {
        title: "Top Products",
        type: "bar chart",
        timeLabels: ["12 AM", "4 AM", "8 AM", "4 PM", "8 PM"],
        viewReportLink: "View report"
      },
      expensesBreakdown: {
        mainValue: "23,648",
        description: "Expenses Breakdown",
        type: "donut chart",
        segments: [
          {
            value: "15,624",
            label: "Value 1",
            color: "purple"
          },
          {
            value: "5,546",
            label: "Value 2",
            color: "blue"
          },
          {
            value: "2,478",
            label: "Value 3",
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
          title: "Recent Alerts",
          columns: [
            "Order",
            "Date",
            "Status",
            "Total"
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
          title: "Alternate Alerts",
          columns: [
            "Order",
            "Date",
            "Status",
            "Total"
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
      backgroundColor: '#0f172a',
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
