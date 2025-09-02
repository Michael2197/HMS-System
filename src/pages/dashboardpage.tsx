import React from 'react';

export default function DashboardPage() {
  return (
    <div style={{ padding: '24px', backgroundColor: '#1e1e2f', color: '#fff', minHeight: '100vh' }}>
      {/* Top Metrics */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Revenues', value: '50.8K', change: '+19%', color: '#4caf50' },
          { label: 'Expenses', value: '23.6K', change: '-19%', color: '#f44336' },
          { label: 'Sales', value: '756', change: '', color: '#42a5f5' },
          { label: 'Inventory Levels', value: '2.3K', change: '+3%', color: '#4caf50' },
        ].map((metric) => (
          <div
            key={metric.label}
            style={{
              flex: 1,
              backgroundColor: '#29293d',
              padding: '16px',
              borderRadius: '12px',
              boxShadow: `0 0 6px ${metric.color}55`,
            }}
          >
            <div style={{ fontSize: '14px', color: '#aaa' }}>{metric.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '4px' }}>{metric.value}</div>
            {metric.change && (
              <div style={{ fontSize: '12px', color: metric.color, marginTop: '4px' }}>{metric.change}</div>
            )}
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        {/* Sales Over Time */}
        <div
          style={{
            flex: 2,
            backgroundColor: '#29293d',
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '440px', // Increased height to match Top Products + Expenses Breakdown
          }}
        >
          <div>
            <div style={{ fontSize: '18px', marginBottom: '12px' }}>Sales Over Time</div>
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>Total Sales: $240.8K</div>
            <div
              style={{
                height: '200px',
                backgroundColor: '#1e1e2f',
                borderRadius: '8px',
                color: '#888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              [Line Chart Placeholder]
            </div>
            <div style={{ marginTop: '12px', fontSize: '14px', color: '#aaa' }}>
              Peak: $125.2K in June 2024
            </div>
          </div>
        </div>

        {/* Right Column: Top Products + Expenses Breakdown */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top Products */}
          <div style={{ backgroundColor: '#29293d', padding: '16px', borderRadius: '12px', height: '200px' }}>
            <div style={{ fontSize: '18px', marginBottom: '12px' }}>Top Products</div>
            <div
              style={{
                height: '120px',
                backgroundColor: '#1e1e2f',
                borderRadius: '8px',
                color: '#888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              [Bar Chart Placeholder]
            </div>
            <div style={{ marginTop: '12px', fontSize: '14px', color: '#d81b60', cursor: 'pointer' }}>
              View report
            </div>
          </div>

          {/* Expenses Breakdown  */}
          <div style={{ backgroundColor: '#29293d', padding: '16px', borderRadius: '12px', height: '200px' }}>
            <div style={{ fontSize: '18px', marginBottom: '12px' }}>Expenses Breakdown</div>
            <div
              style={{
                height: '100px',
                backgroundColor: '#1e1e2f',
                borderRadius: '8px',
                color: '#888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              [Gauge Chart Placeholder]
            </div>
           <div style={{
  marginTop: '12px',
  fontSize: '14px',
  color: '#aaa',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '5px',
  columnGap: '24px',
}}>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Total:</span>
    <strong style={{ color: '#fff' }}>23,648</strong>
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span style={{ color: '#7e57c2' }}>Value 1:</span>
    <span style={{ color: '#7e57c2' }}>15,024</span>
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span style={{ color: '#42a5f5' }}>Value 2:</span>
    <span style={{ color: '#42a5f5' }}>5,640</span>
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span style={{ color: '#00acc1' }}>Value 3:</span>
    <span style={{ color: '#00acc1' }}>2,984</span>
  </div>
</div>
          </div>
        </div>
      </div>

      {/* Exec Alerts Section */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        {/* Recent Alerts */}
        <div style={{ flex: 1, backgroundColor: '#29293d', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '18px', marginBottom: '12px' }}>Recent Alerts</div>
          <div style={{ fontSize: '14px', marginBottom: '8px', color: '#aaa' }}>Date: Dec 2024</div>
          {[
            { order: '#1237', status: 'Pending Approval', total: '$1,200', color: '#ff9800' },
            { order: '#1236', status: 'Execute Task', total: '$1,500', color: '#4caf50' },
          ].map((alert) => (
            <div
              key={alert.order}
              style={{
                backgroundColor: '#1e1e2f',
                padding: '8px',
                borderRadius: '6px',
                marginBottom: '6px',
              }}
            >
              <strong>{alert.order}</strong> — {alert.status} —{' '}
              <span style={{ color: alert.color }}>{alert.total}</span>
            </div>
          ))}
        </div>

        {/* Alternate Alerts */}
        <div style={{ flex: 1, backgroundColor: '#29293d', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '18px', marginBottom: '12px' }}>Alternate Alerts</div>
          <div style={{ fontSize: '14px', marginBottom: '8px', color: '#aaa' }}>Date: Jan 2024</div>
          {[
            { order: '#1235', status: 'Pending Approval', total: '$1,000', color: '#ff9800' },
            { order: '#1234', status: 'Execute Task', total: '$2,500', color: '#4caf50' },
          ].map((alert) => (
            <div
              key={alert.order}
              style={{
                backgroundColor: '#1e1e2f',
                padding: '8px',
                borderRadius: '6px',
                marginBottom: '6px',
              }}
            >
              <strong>{alert.order}</strong> — {alert.status} —{' '}
              <span style={{ color: alert.color }}>{alert.total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <select
          style={{
            backgroundColor: '#424242',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
          }}
        >
          <option>Select date</option>
          <option>Dec 2024</option>
          <option>Jan 2024</option>
        </select>
        <button
          style={{
            backgroundColor: '#424242',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
          }}
        >
          Export Data
        </button>
        <button
          style={{
            backgroundColor: '#d81b60',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
          }}
        >
          Create Action List
        </button>
      </div>
    </div>
  );
}