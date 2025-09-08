
interface KeyMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: string;
  options: string;
}

interface KeyMetricsCardsProps {
  metrics: KeyMetric[];
}

import { 
  AiOutlineDollar, 
  AiOutlineUser, 
  AiOutlineTag, 
  AiOutlineStar,
  AiOutlineBarChart,
  AiOutlineArrowUp,
  AiOutlineArrowDown
} from 'react-icons/ai';

export default function KeyMetricsCards({ metrics }: KeyMetricsCardsProps) {
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'dollar': <AiOutlineDollar size={18} />,
      'person': <AiOutlineUser size={18} />,
      'sales tag': <AiOutlineTag size={18} />,
      'star': <AiOutlineStar size={18} />
    };
    return iconMap[iconName] || <AiOutlineBarChart size={18} />;
  };

  const getChangeColor = (changeType: 'increase' | 'decrease') => {
    return changeType === 'increase' ? '#10b981' : '#ef4444';
  };

  const getChangeIcon = (changeType: 'increase' | 'decrease') => {
    return changeType === 'increase' ? <AiOutlineArrowUp size={12} /> : <AiOutlineArrowDown size={12} />;
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '24px',
      marginBottom: '32px'
    }}>
      {metrics.map((metric, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#1e293b',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
          }}
        >
          {/* Header with icon and options */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#94a3b8',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <span style={{ 
                display: 'flex',
                alignItems: 'center',
                color: '#94a3b8'
              }}>
                {getIcon(metric.icon)}
              </span>
              {metric.title}
            </div>
            {metric.options === 'three dots' && (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '4px'
                }}
              >
                ⋯
              </button>
            )}
          </div>

          {/* Value */}
          <div style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#ffffff',
            lineHeight: '1.2'
          }}>
            {metric.value}
          </div>

          {/* Change indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <span style={{
              color: getChangeColor(metric.changeType),
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {getChangeIcon(metric.changeType)}
              {metric.change}
            </span>
            <span style={{ color: '#64748b' }}>
              vs last month
            </span>
          </div>
          
          {/* Floating particle */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '4px',
            height: '4px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite',
          }} />
        </div>
      ))}
    </div>
  );
}
