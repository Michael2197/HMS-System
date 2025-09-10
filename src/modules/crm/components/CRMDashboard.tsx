import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Avatar,
  Chip,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useCRM } from "../hooks/useCRM";
import { crmKpiData } from "../data/initialData";

const CRMDashboard: React.FC = () => {
  const { contacts, deals, campaigns, activities } = useCRM();

  // Chart data
  const pipelineData = [
    { name: "Jan", value: 60 },
    { name: "Website", value: 70 },
    { name: "Qualified", value: 80 },
    { name: "Proposal", value: 90 },
    { name: "Negotiation", value: 85 },
    { name: "Closed", value: 100 },
  ];

  const activityData = [
    { name: "Calls", value: 60, color: "#6366f1" },
    { name: "Emails", value: 34, color: "#06b6d4" },
    { name: "Meetings", value: 16, color: "#ec4899" },
  ];

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Welcome back, John
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Manage your CRM and customer relationships, from this dashboard.
        </Typography>
      </Box>

      {/* KPI Cards Row */}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3} mb={4}>
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#6366f1",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "white", fontSize: "20px" }}>
                  📋
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {crmKpiData[0]?.value || "1,247"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  All Contacts
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#ef4444",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "white", fontSize: "20px" }}>
                  🚩
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {crmKpiData[1]?.value || "23"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  New Leads
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#f59e0b",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "white", fontSize: "20px" }}>
                  ⚡
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {crmKpiData[2]?.value || "34"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  In Progress
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#10b981",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "white", fontSize: "20px" }}>
                  ✅
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {crmKpiData[3]?.value || "8"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Closed Won
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Middle Row - Charts */}
      <Box display="grid" gridTemplateColumns="2fr 1fr" gap={4} mb={4}>
        {/* CRM Overview Chart */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              CRM Overview
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              $478,000
            </Typography>
            <Box sx={{ height: 200, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pipelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2a2a2a",
                      border: "1px solid #444",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#6366f1", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
            <Box display="flex" gap={2} mt={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#6366f1",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Qualified
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#06b6d4",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Proposal
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#ef4444",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Lost
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Activities Overview */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Activities Overview
            </Typography>
            <Box sx={{ height: 200, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2a2a2a",
                      border: "1px solid #444",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  110
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Open activities
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#6366f1",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Calls: 60
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#06b6d4",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Emails: 34
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#ec4899",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Meetings: 16
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Bottom Row - Lists */}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4}>
        {/* Current Deals */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Current Deals
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Enterprise Software
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={90}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#6366f1" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Mobile App Development
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#06b6d4" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  CRM Implementation
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={40}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#ec4899" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Marketing Campaign
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#06b6d4" },
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Due Dates */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Due date
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Sep 30, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Aug 25, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Aug 20, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Aug 10, 2023
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Team Members
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#6366f1", width: 32, height: 32 }}
                >
                  L
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Lead Developer
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    Right nsguile
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#06b6d4", width: 32, height: 32 }}
                >
                  M
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Michael Johnson
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    US Stugader
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#ec4899", width: 32, height: 32 }}
                >
                  S
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Sarah Williams
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    GB Sgoulden
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#f59e0b", width: 32, height: 32 }}
                >
                  D
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    David Brown
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    Marketdg
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#10b981", width: 32, height: 32 }}
                >
                  J
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    John Carter
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    Project Manager
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Activities */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Activities
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" sx={{ color: "#888" }}>
                12 activities
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                8 activities
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                5 activities
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                12 activities
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                8 activities
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CRMDashboard;
