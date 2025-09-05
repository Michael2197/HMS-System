
import { AiOutlineDownload, AiOutlinePlus, AiOutlineCalendar } from 'react-icons/ai';

interface AlertTable {
  title: string;
  columns: string[];
  statusTagColors: {
    [key: string]: string;
  };
}

interface ExecutiveAlertsProps {
  commonElements: {
    selectDate: string;
    exportData: string;
    createActionList: string;
  };
  tables: AlertTable[];
}

export default function ExecutiveAlerts({
  commonElements,
  tables
}: ExecutiveAlertsProps) {
  const getStatusColor = (status: string, colorMap: { [key: string]: string }) => {
    const colorName = colorMap[status];
    const colorMap2: { [key: string]: string } = {
      'red': '#ef4444',
      'orange/yellow': '#f59e0b',
      'green': '#10b981'
    };
    return colorMap2[colorName] || '#64748b';
  };

  // Sample data for the tables
  const recentAlertsData = [
    { order: '#001', date: '2024-01-15', status: 'Low Stock', total: '$1,250' },
    { order: '#002', date: '2024-01-14', status: 'Pending Approval', total: '$2,100' },
    { order: '#003', date: '2024-01-13', status: 'Overdue Task', total: '$850' },
    { order: '#004', date: '2024-01-12', status: 'Done', total: '$3,200' },
    { order: '#005', date: '2024-01-11', status: 'Paid', total: '$1,800' }
  ];

  const alternateAlertsData = [
    { order: '#006', date: '2024-01-10', status: 'Low Stock', total: '$950' },
    { order: '#007', date: '2024-01-09', status: 'Pending Approval', total: '$1,750' },
    { order: '#008', date: '2024-01-08', status: 'Overdue Task', total: '$1,100' },
    { order: '#009', date: '2024-01-07', status: 'Done', total: '$2,800' },
    { order: '#010', date: '2024-01-06', status: 'Paid', total: '$1,500' }
  ];

  const tableData = [recentAlertsData, alternateAlertsData];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Common Elements */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <select style={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '6px',
            padding: '8px 12px',
            color: '#ffffff',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            <option value="">Select Date Range</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <button style={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '6px',
            padding: '8px 16px',
            color: '#ffffff',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <AiOutlineDownload size={14} />
            Export Data
          </button>
        </div>

        <button style={{
          backgroundColor: '#8b5cf6',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <AiOutlinePlus size={14} />
          Create Action List
        </button>
      </div>

      {/* Tables */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        {tables.map((table, tableIndex) => (
          <div key={tableIndex} style={{
            backgroundColor: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 20px 0',
              color: '#ffffff'
            }}>
              {table.title}
            </h3>

            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              padding: '12px 0',
              borderBottom: '1px solid #334155',
              marginBottom: '12px'
            }}>
              {table.columns.map((column, index) => (
                <div key={index} style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {column}
                </div>
              ))}
            </div>

            {/* Table Rows */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {tableData[tableIndex].map((row, rowIndex) => (
                <div key={rowIndex} style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px',
                  padding: '12px 0',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#ffffff',
                    fontWeight: '500'
                  }}>
                    {row.order}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#94a3b8'
                  }}>
                    {row.date}
                  </div>
                  <div>
                    <span style={{
                      backgroundColor: getStatusColor(row.status, table.statusTagColors),
                      color: '#ffffff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {row.status}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>
                    {row.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
