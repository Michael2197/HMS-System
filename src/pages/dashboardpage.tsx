import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const projectsData = [
  { name: 'Jan', value: 70 },
  { name: 'Website', value: 85 },
  { name: 'Qualified', value: 75 },
  { name: 'Proposal', value: 90 },
  { name: 'Negotiation', value: 65 },
  { name: 'Dot', value: 80 },
];

const tasksData = [
  { name: 'To Do', value: 60, color: '#8b5cf6' },
  { name: 'In Progress', value: 34, color: '#06b6d4' },
  { name: 'Done', value: 7, color: '#ec4899' },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#ec4899'];

export default function DashboardPage() {
  return (
    <div style={{ 
      padding: '24px', 
      backgroundColor: '#0f172a', 
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
          Welcome back, John
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#94a3b8', 
          margin: 0 
        }}>
          Manage your projects and tasks, from this dashboard
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
            label: 'All Projects', 
            value: '12', 
            bgColor: '#1e293b',
            iconColor: '#64748b'
          },
          { 
            icon: '📌', 
            label: 'To Do', 
            value: '76', 
            bgColor: '#1e293b',
            iconColor: '#8b5cf6'
          },
          { 
            icon: '⚡', 
            label: 'In Progress', 
            value: '34', 
            bgColor: '#1e293b',
            iconColor: '#06b6d4'
          },
          { 
            icon: '✅', 
            label: 'Completed', 
            value: '8', 
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
              Projects Overview
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
                Funded
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
                Pending
              </span>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                color: '#94a3b8'
              }}>
                Overdue
              </span>
            </div>
          </div>
          
          <div style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            marginBottom: '24px',
            color: '#ffffff'
          }}>
            $27,500
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

        {/* Tasks Overview */}
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
              Tasks Overview
            </h3>
            <span style={{ 
              fontSize: '12px', 
              color: '#94a3b8' 
            }}>
              Part 1 tasks
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
                  {tasksData.map((entry, index) => (
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
                110
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#94a3b8' 
              }}>
                Open tasks
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
                  To Do
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  60
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
                  In Progress
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  34
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
                  Done
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  7
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
        {/* Current Projects */}
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
            Current Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'Website Redesign', progress: 75, color: '#8b5cf6' },
              { name: 'Mobile App Development', progress: 45, color: '#06b6d4' },
              { name: 'CRM Implementation', progress: 20, color: '#ec4899' },
              { name: 'Marketing Campaign', progress: 60, color: '#06b6d4' },
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

        {/* Due Date */}
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
            Due date
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Sep 30, 2023',
              'Aug 25, 2023',
              'Aug 20, 2023',
              'Aug 10, 2023',
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

        {/* Team Members */}
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
            Team Members
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Lead Developer', role: 'Right nsguile' },
              { name: 'Michael Johnson', role: 'US Stugader' },
              { name: 'Sarah Williams', role: 'GB Sgoulden' },
              { name: 'David Brown', role: 'Marketdg' },
              { name: 'John Carter', role: 'Project Manager' },
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

        {/* Tasks */}
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
            Tasks
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              '12 tasks',
              '8 tasks',
              '5 tasks',
              '12 tasks',
              '8 tasks',
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

