import { PieChart } from '@mui/x-charts';

interface ExpenseSegment {
  value: string;
  label: string;
  color: string;
}

interface ExpensesBreakdownChartProps {
  mainValue: string;
  description: string;
  type: string;
  segments: ExpenseSegment[];
}

export default function ExpensesBreakdownChart({
  mainValue,
  description,
  type,
  segments
}: ExpensesBreakdownChartProps) {
  const getColor = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'purple': '#8b5cf6',
      'blue': '#06b6d4',
      'light blue': '#38bdf8'
    };
    return colorMap[colorName] || '#8b5cf6';
  };

  // Convert segments to chart data
  const chartData = segments.map((segment, index) => ({
    id: index,
    value: parseInt(segment.value.replace(/,/g, '')),
    label: segment.label,
    color: getColor(segment.color)
  }));

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
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 8px 0',
          color: '#ffffff'
        }}>
          {description}
        </h3>
        <div style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#ffffff'
        }}>
          ${mainValue}
        </div>
      </div>

      {/* Chart */}
      <div style={{
        position: 'relative',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid rgba(139, 92, 246, 0.15)',
        overflow: 'hidden'
      }}>
        <PieChart
          series={[
            {
              data: chartData,
              innerRadius: 50,
              outerRadius: 80,
              paddingAngle: 3,
              cornerRadius: 8,
            },
          ]}
          width={200}
          height={200}
          sx={{
            '& .MuiPieArc-root': {
              stroke: '#1e293b',
              strokeWidth: 3,
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
              transition: 'all 0.3s ease',
              '&:hover': {
                filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))',
                transform: 'scale(1.05)',
              },
            },
            '& .MuiPieArcLabel-root': {
              fill: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))',
            },
          }}
        />
        
        {/* Central glow effect */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 3s ease-in-out infinite',
        }} />
        
        {/* Floating elements */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '6px',
          height: '6px',
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 5s ease-in-out infinite',
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '4px',
          height: '4px',
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 7s ease-in-out infinite reverse',
        }} />
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '16px'
      }}>
        {segments.map((segment, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getColor(segment.color)
              }}></div>
              <span style={{
                color: '#94a3b8',
                fontSize: '14px'
              }}>
                {segment.label}
              </span>
            </div>
            <span style={{
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              ${segment.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
