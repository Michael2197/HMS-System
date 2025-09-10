import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Avatar,
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
import { useMarketing } from "../hooks/useMarketing";
import { marketingKpiData } from "../data/initialData";

const MarketingDashboard: React.FC = () => {
  useMarketing();

  // Chart data
  const campaignData = [
    { name: "Jan", digital: 120, social: 80, content: 60 },
    { name: "Feb", digital: 140, social: 90, content: 70 },
    { name: "Mar", digital: 160, social: 100, content: 80 },
    { name: "Apr", digital: 180, social: 110, content: 90 },
    { name: "May", digital: 200, social: 120, content: 100 },
    { name: "Jun", digital: 220, social: 130, content: 110 },
  ];

  const performanceData = [
    { name: "Active", value: 18, color: "#8b5cf6" },
    { name: "Completed", value: 12, color: "#a855f7" },
    { name: "Paused", value: 3, color: "#c084fc" },
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
          Manage your marketing campaigns and brand awareness, from this
          dashboard.
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
                  📢
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {marketingKpiData[0]?.value || "18"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Active Campaigns
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
                  🎯
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {marketingKpiData[1]?.value || "2,450"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Lead Generation
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
                  📊
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {marketingKpiData[2]?.value || "18.5%"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Conversion Rate
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
                  💰
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {marketingKpiData[3]?.value || "285%"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  ROI
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Middle Row - Charts */}
      <Box display="grid" gridTemplateColumns="2fr 1fr" gap={4} mb={4}>
        {/* Marketing Overview Chart */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Marketing Overview
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              $485,000
            </Typography>
            <Box sx={{ height: 200, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
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
                    dataKey="digital"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="social"
                    stroke="#a855f7"
                    strokeWidth={3}
                    dot={{ fill: "#a855f7", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="content"
                    stroke="#c084fc"
                    strokeWidth={3}
                    dot={{ fill: "#c084fc", strokeWidth: 2, r: 4 }}
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
                    backgroundColor: "#8b5cf6",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Digital
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#a855f7",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Social
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#c084fc",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Content
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Campaign Performance
            </Typography>
            <Box sx={{ height: 200, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
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
                  92
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Campaign success rate
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#8b5cf6",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Active: 18
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#a855f7",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Completed: 12
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#c084fc",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Paused: 3
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Bottom Row - Lists */}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4}>
        {/* Current Campaigns */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Current Campaigns
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Q4 Product Launch
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#8b5cf6" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Social Media Blitz
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#a855f7" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Content Series
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={45}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#c084fc" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Email Campaign
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#a855f7" },
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Campaign Deadlines */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Campaign Deadlines
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Dec 20, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Dec 15, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Dec 10, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Dec 5, 2023
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Marketing Team */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Marketing Team
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#8b5cf6", width: 32, height: 32 }}
                >
                  M
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Marketing Director
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    Right nsguile
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#a855f7", width: 32, height: 32 }}
                >
                  C
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Creative Manager
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    US Designer
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#c084fc", width: 32, height: 32 }}
                >
                  S
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Social Media
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    GB Specialist
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#d8b4fe", width: 32, height: 32 }}
                >
                  A
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Analytics Expert
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    Data Analyst
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#e9d5ff", width: 32, height: 32 }}
                >
                  J
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    John Carter
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    CMO
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Marketing Metrics */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Marketing Metrics
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" sx={{ color: "#888" }}>
                15 metrics
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                8 metrics
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                12 metrics
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                6 metrics
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                9 metrics
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MarketingDashboard;
