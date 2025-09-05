import { LineChart } from '@mui/x-charts';
import { AiOutlineArrowUp } from 'react-icons/ai';

interface SalesOverTimeChartProps {
  title: string;
  totalSales: string;
  increase: string;
  legend: Array<{
    name: string;
    color: string;
  }>;
  timeframeSelector: string;
  type: string;
  axes: {
    y: string;
    x: string;
  };
  tooltip: {
    value: string;
    change: string;
    date: string;
  };
}

// Sample data for the chart
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const revenueData = [120000, 135000, 150000, 165000, 180000, 195000, 210000, 225000, 240000, 235000, 250000, 240800];
const expensesData = [80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000, 125000, 130000, 135000];

export default function SalesOverTimeChart({
  title,
  totalSales,
  increase,
  legend,
  timeframeSelector
}: SalesOverTimeChartProps) {
  const getColor = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'purple': '#8b5cf6',
      'blue': '#06b6d4'
    };
    return colorMap[colorName] || '#8b5cf6';
  };


  return (
    <div style={{
      backgroundColor: '#1e293b',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #334155'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px'
      }}>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 8px 0',
            color: '#ffffff'
          }}>
            {title}
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#ffffff'
            }}>
              {totalSales}
            </span>
            <span style={{
              color: '#10b981',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <AiOutlineArrowUp size={14} />
              {increase}
            </span>
          </div>
        </div>

        {/* Legend and Timeframe */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px'
        }}>
          <div style={{
            display: 'flex',
            gap: '16px',
            fontSize: '12px'
          }}>
            {legend.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#94a3b8'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: getColor(item.color)
                }}></div>
                {item.name}
              </div>
            ))}
          </div>
          <div style={{
            backgroundColor: '#334155',
            border: '1px solid #475569',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12px',
            color: '#94a3b8',
            cursor: 'pointer'
          }}>
            {timeframeSelector}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ 
        height: '650px',
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <LineChart
          width={800}
          height={650}
          series={[
            {
              data: revenueData,
              label: 'Revenue',
              color: '#8b5cf6',
              area: true,
              curve: 'catmullRom',
            },
            {
              data: expensesData,
              label: 'Expenses',
              color: '#06b6d4',
              area: true,
              curve: 'catmullRom',
            },
          ]}
          xAxis={[{
            scaleType: 'point',
            data: months,
            tickLabelStyle: { 
              fill: '#e2e8f0', 
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif"
            },
          }]}
          yAxis={[{
            tickLabelStyle: { 
              fill: '#e2e8f0', 
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif"
            },
            valueFormatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          }]}
          grid={{ 
            vertical: true, 
            horizontal: true,
          }}
          colors={['#8b5cf6', '#06b6d4']}
          sx={{
            '& .MuiChartsGrid-line': {
              stroke: 'rgba(139, 92, 246, 0.15)',
              strokeDasharray: '2 4',
            },
            '& .MuiChartsAxis-root': {
              '& .MuiChartsAxis-tick': {
                fill: '#e2e8f0',
              },
            },
            '& .MuiLineElement-root': {
              strokeWidth: 3,
              filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))',
            },
            '& .MuiAreaElement-root': {
              opacity: 0.8,
            },
            '& .MuiMarkElement-root': {
              fill: '#ffffff',
              stroke: '#8b5cf6',
              strokeWidth: 2,
              r: 6,
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
            },
          }}
        />
        
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 3s ease-in-out infinite',
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite reverse',
        }} />
      </div>
    </div>
  );
}
