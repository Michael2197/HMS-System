import { BarChart } from '@mui/x-charts';

interface TopProductsChartProps {
  title: string;
  type: string;
  timeLabels: string[];
  viewReportLink: string;
}

// Sample data for top products with alternating colors
const timeLabels = ['12 AM', '4 AM', '8 AM', '4 PM', '8 PM'];
const values = [45, 32, 78, 65, 89];
const colors = ['#8b5cf6', '#06b6d4', '#8b5cf6', '#06b6d4', '#8b5cf6'];

export default function TopProductsChart({
  title,
  type,
  timeLabels,
  viewReportLink
}: TopProductsChartProps) {

  return (
    <div style={{
      backgroundColor: '#1e293b',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      height: 'fit-content'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: 0,
          color: '#ffffff'
        }}>
          {title}
        </h3>
        <button style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#8b5cf6',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}>
          {viewReportLink}
        </button>
      </div>

      {/* Chart */}
      <div style={{ 
        height: '280px',
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid rgba(139, 92, 246, 0.15)',
        overflow: 'hidden'
      }}>
        <BarChart
          width={500}
          height={250}
          series={[
            {
              data: values,
              label: 'Products',
            },
          ]}
          xAxis={[{
            scaleType: 'band',
            data: timeLabels,
            tickLabelStyle: { 
              fill: '#e2e8f0', 
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif"
            },
          }]}
          yAxis={[{
            tickLabelStyle: { 
              fill: '#e2e8f0', 
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif"
            },
          }]}
          grid={{ 
            vertical: true, 
            horizontal: true,
          }}
          colors={colors}
          sx={{
            '& .MuiChartsGrid-line': {
              stroke: 'rgba(139, 92, 246, 0.1)',
              strokeDasharray: '2 4',
            },
            '& .MuiChartsAxis-root': {
              '& .MuiChartsAxis-tick': {
                fill: '#e2e8f0',
              },
            },
            '& .MuiBarElement-root': {
              rx: 8,
              ry: 8,
              filter: 'drop-shadow(0 4px 12px rgba(139, 92, 246, 0.3))',
              transition: 'all 0.3s ease',
              '&:hover': {
                filter: 'drop-shadow(0 6px 16px rgba(139, 92, 246, 0.5))',
                transform: 'scale(1.05)',
              },
            },
          }}
        />
        
        {/* Floating particles */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '4px',
          height: '4px',
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '15px',
          width: '3px',
          height: '3px',
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse',
        }} />
      </div>
    </div>
  );
}
