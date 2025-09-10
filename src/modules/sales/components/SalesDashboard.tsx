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
import { useSales } from "../hooks/useSales";
import { salesKpiData } from "../data/initialData";

const SalesDashboard: React.FC = () => {
  const { salesData: salesHookData } = useSales();

  // Chart data
  const salesChartData = [
    { name: "Q1", sales: 800, target: 1000 },
    { name: "Q2", sales: 950, target: 1000 },
    { name: "Q3", sales: 1100, target: 1000 },
    { name: "Q4", sales: 1200, target: 1000 },
  ];

  const pipelineData = [
    { name: "Leads", value: 35, color: "#f59e0b" },
    { name: "Qualified", value: 23, color: "#d97706" },
    { name: "Proposals", value: 15, color: "#b45309" },
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
          Manage your sales and revenue targets, from this dashboard.
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
                  💼
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {salesKpiData[0]?.value || "$3,250,000"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Sales
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
                  📋
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {salesKpiData[1]?.value || "45"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Active Quotes
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
                  ⏳
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {salesKpiData[2]?.value || "28"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Pending Orders
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
                  📊
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {salesKpiData[3]?.value || "24.5%"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Conversion Rate
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Middle Row - Charts */}
      <Box display="grid" gridTemplateColumns="2fr 1fr" gap={4} mb={4}>
        {/* Sales Overview Chart */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Sales Overview
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              $3,250,000
            </Typography>
            <Box sx={{ height: 200, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesChartData}>
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
                    dataKey="sales"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#d97706"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#d97706", strokeWidth: 2, r: 4 }}
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
                    backgroundColor: "#f59e0b",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Q1 Sales
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#d97706",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Q2 Sales
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#b45309",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Q3 Sales
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Sales Pipeline */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Sales Pipeline
            </Typography>
            <Box sx={{ height: 200, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pipelineData.map((entry, index) => (
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
                  73
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Active opportunities
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#f59e0b",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Leads: 35
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#d97706",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Qualified: 23
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#b45309",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Proposals: 15
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
                  value={85}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#f59e0b" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Cloud Services
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#d97706" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Consulting Package
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={45}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#b45309" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Support Contract
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#d97706" },
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Deal Deadlines */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Deal Deadlines
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Oct 15, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Oct 30, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Nov 10, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Nov 25, 2023
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Sales Team */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Sales Team
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#f59e0b", width: 32, height: 32 }}
                >
                  S
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Sales Director
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    Right nsguile
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#d97706", width: 32, height: 32 }}
                >
                  A
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Alex Johnson
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    US Sales Rep
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#b45309", width: 32, height: 32 }}
                >
                  M
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Maria Williams
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    GB Sales Rep
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#92400e", width: 32, height: 32 }}
                >
                  D
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    David Brown
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    Account Manager
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#78350f", width: 32, height: 32 }}
                >
                  J
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    John Carter
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    Sales Manager
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Sales Targets */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Sales Targets
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" sx={{ color: "#888" }}>
                18 targets
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                12 targets
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                8 targets
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                15 targets
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                10 targets
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SalesDashboard;
