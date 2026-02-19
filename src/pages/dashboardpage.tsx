import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const projectsData = [
  { name: 'Mon', value: 72 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 79 },
  { name: 'Thu', value: 91 },
  { name: 'Fri', value: 84 },
  { name: 'Sat', value: 68 },
];

const tasksData = [
  { name: 'Waiting', value: 22, color: '#8b5cf6' },
  { name: 'In Service', value: 14, color: '#06b6d4' },
  { name: 'Completed', value: 9, color: '#ec4899' },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#ec4899'];

export default function DashboardPage() {
  return (
    <div style={{ 
      padding: '24px', 
      backgroundColor: 'var(--hms-bg)', 
      color: '#fff', 
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '600', 
          margin: '0 0 8px 0',
          color: '#ffffff'
        }}>
          Operations Dashboard
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#94a3b8', 
          margin: 0 
        }}>
          Monitor daily hospital operations, queues, and service throughput
        </p>
      </div>

      {/* Top Metrics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '24px', 
        marginBottom: '32px' 
      }}>
        {[
          { 
            icon: '📋', 
            label: 'Departments', 
            value: '8', 
            bgColor: '#1e293b',
            iconColor: '#64748b'
          },
          { 
            icon: '📌', 
            label: 'Waiting', 
            value: '22', 
            bgColor: '#1e293b',
            iconColor: '#8b5cf6'
          },
          { 
            icon: '⚡', 
            label: 'In Service', 
            value: '14', 
            bgColor: '#1e293b',
            iconColor: '#06b6d4'
          },
          { 
            icon: '✅', 
            label: 'Completed Today', 
            value: '9', 
            bgColor: '#1e293b',
            iconColor: '#10b981'
          },
        ].map((metric, index) => (
          <div
            key={index}
            style={{
              backgroundColor: metric.bgColor,
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #334155',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: '#94a3b8',
              fontSize: '14px'
            }}>
              <span style={{ color: metric.iconColor }}>{metric.icon}</span>
              {metric.label}
            </div>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: '#ffffff' 
            }}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '24px', 
        marginBottom: '32px' 
      }}>
        {/* Projects Overview Chart */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
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
              Patient Flow (Weekly)
            </h3>
            <div style={{ 
              display: 'flex', 
              gap: '16px',
              fontSize: '12px'
            }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                color: '#94a3b8'
              }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#8b5cf6' 
                }}></div>
                OPD
              </span>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                color: '#94a3b8'
              }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#06b6d4' 
                }}></div>
                IPD
              </span>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                color: '#94a3b8'
              }}>
                ER
              </span>
            </div>
          </div>
          
          <div style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            marginBottom: '24px',
            color: '#ffffff'
          }}>
            482
          </div>
          
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectsData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  domain={[60, 100]}
                  tickFormatter={(value) => `${value} K`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={false}
                  fill="url(#colorGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Queue Overview */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
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
              Queue Overview
            </h3>
            <span style={{ 
              fontSize: '12px', 
              color: '#94a3b8' 
            }}>
              Today
            </span>
          </div>
          
          <div style={{ 
            position: 'relative',
            height: '160px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tasksData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {tasksData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: '700',
                color: '#ffffff'
              }}>
                45
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#94a3b8' 
              }}>
                Patients in queue
              </div>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginTop: '16px'
          }}>
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  fontSize: '12px',
                  color: '#94a3b8'
                }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#8b5cf6' 
                  }}></div>
                  Waiting
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  22
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  fontSize: '12px',
                  color: '#94a3b8'
                }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#06b6d4' 
                  }}></div>
                  In Service
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  14
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px'
              }}>
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  fontSize: '12px',
                  color: '#94a3b8'
                }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#ec4899' 
                  }}></div>
                  Completed
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  9
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr 1fr', 
        gap: '24px' 
      }}>
        {/* Ward Occupancy */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            margin: '0 0 16px 0',
            color: '#ffffff'
          }}>
            Ward Occupancy
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'ICU', progress: 86, color: '#ec4899' },
              { name: 'General Ward', progress: 72, color: '#8b5cf6' },
              { name: 'Pediatrics', progress: 64, color: '#06b6d4' },
              { name: 'Maternity', progress: 58, color: '#06b6d4' },
            ].map((project, index) => (
              <div key={index}>
                <div style={{ 
                  fontSize: '14px', 
                  marginBottom: '8px',
                  color: '#ffffff'
                }}>
                  {project.name}
                </div>
                <div style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: '#334155',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${project.progress}%`,
                    height: '100%',
                    backgroundColor: project.color,
                    borderRadius: '2px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Shifts */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            margin: '0 0 16px 0',
            color: '#ffffff'
          }}>
            Upcoming Shifts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Today 08:00 - 16:00 (Day Shift)',
              'Today 16:00 - 00:00 (Evening Shift)',
              'Tomorrow 00:00 - 08:00 (Night Shift)',
              'Tomorrow 08:00 - 16:00 (Day Shift)',
            ].map((date, index) => (
              <div key={index} style={{ 
                fontSize: '14px',
                color: '#94a3b8'
              }}>
                {date}
              </div>
            ))}
          </div>
        </div>

        {/* On-Call Staff */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            margin: '0 0 16px 0',
            color: '#ffffff'
          }}>
            On-Call Staff
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Dr. Omar Ali', role: 'Cardiology' },
              { name: 'Dr. Sara Youssef', role: 'Orthopedics' },
              { name: 'Nurse Dina', role: 'ER Triage' },
              { name: 'Lab Tech Karim', role: 'Hematology' },
              { name: 'Pharmacist Salma', role: 'Dispensing' },
            ].map((member, index) => (
              <div key={index} style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#94a3b8'
                }}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div style={{ 
                    fontSize: '14px',
                    color: '#ffffff',
                    fontWeight: '500'
                  }}>
                    {member.name}
                  </div>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#94a3b8'
                  }}>
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Alerts */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            margin: '0 0 16px 0',
            color: '#ffffff'
          }}>
            Critical Alerts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Low stock: Paracetamol 500mg',
              'Pending payment: INV-76002',
              'Lab urgent: LAB-90012 (CRP)',
              'High occupancy: ICU 86%',
              'Queue spike: OPD waiting 22',
            ].map((task, index) => (
              <div key={index} style={{ 
                fontSize: '14px',
                color: '#94a3b8'
              }}>
                {task}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

