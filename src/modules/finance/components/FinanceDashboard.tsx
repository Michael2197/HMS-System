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
import { useFinance } from "../hooks/useFinance";
import { financeKpiData } from "../data/initialData";

const FinanceDashboard: React.FC = () => {
  const { financeData } = useFinance();

  // Chart data
  const financialData = [
    { name: "Jan", revenue: 200, expenses: 150, profit: 50 },
    { name: "Feb", revenue: 220, expenses: 160, profit: 60 },
    { name: "Mar", revenue: 250, expenses: 170, profit: 80 },
    { name: "Apr", revenue: 280, expenses: 180, profit: 100 },
    { name: "May", revenue: 300, expenses: 190, profit: 110 },
    { name: "Jun", revenue: 320, expenses: 200, profit: 120 },
  ];

  const budgetData = [
    { name: "Used", value: 85, color: "#10b981" },
    { name: "Over", value: 5, color: "#ef4444" },
    { name: "Remaining", value: 10, color: "#f59e0b" },
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
          Manage your finances and transactions, from this dashboard.
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
                  💰
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {financeKpiData[0]?.value || "$2,450,000"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Revenue
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
                  📉
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {financeKpiData[1]?.value || "$1,200,000"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Expenses
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
                  📈
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {financeKpiData[2]?.value || "$1,250,000"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Net Profit
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
                  💸
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {financeKpiData[3]?.value || "$850,000"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Cash Flow
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Middle Row - Charts */}
      <Box display="grid" gridTemplateColumns="2fr 1fr" gap={4} mb={4}>
        {/* Financial Overview Chart */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Financial Overview
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              $1,250,000
            </Typography>
            <Box sx={{ height: 200, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={financialData}>
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
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
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
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Revenue
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
                  Expenses
                </Typography>
              </Box>
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
                  Profit
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Budget Overview */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Budget Overview
            </Typography>
            <Box sx={{ height: 200, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
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
                  85%
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Budget utilization
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Used: 85%
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
                  Over: 5%
                </Typography>
              </Box>
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
                  Remaining: 10%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Bottom Row - Lists */}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4}>
        {/* Current Transactions */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Current Transactions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Software Sales
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={90}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#10b981" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Marketing Budget
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#ef4444" },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Operations Cost
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={40}
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
                  Investment Return
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#333",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#10b981" },
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Payment Due */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Payment Due
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Dec 15, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Nov 30, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Nov 20, 2023
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Nov 10, 2023
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Financial Team */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Financial Team
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#6366f1", width: 32, height: 32 }}
                >
                  F
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Finance Director
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    Right nsguile
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#10b981", width: 32, height: 32 }}
                >
                  A
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Anna Johnson
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    US Accountant
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#f59e0b", width: 32, height: 32 }}
                >
                  M
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Mike Williams
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    GB Analyst
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#ef4444", width: 32, height: 32 }}
                >
                  S
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Sarah Brown
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    Auditor
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ backgroundColor: "#8b5cf6", width: 32, height: 32 }}
                >
                  J
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    John Carter
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    CFO
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card sx={{ backgroundColor: "#2a2a2a", borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Transactions
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" sx={{ color: "#888" }}>
                15 transactions
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                8 transactions
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                12 transactions
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                6 transactions
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                9 transactions
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FinanceDashboard;
