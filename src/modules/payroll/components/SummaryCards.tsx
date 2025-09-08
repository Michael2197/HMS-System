import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  AttachMoney,
  Receipt,
  AccountBalance,
  Info,
} from '@mui/icons-material';

interface SummaryCardsProps {
  totalGross: number;
  totalDeductions: number;
  totalTax: number;
  totalFinalNet: number;
  employeeCount?: number;
  onCardClick?: (type: string) => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalGross,
  totalDeductions,
  totalTax,
  totalFinalNet,
  employeeCount = 0,
  onCardClick,
}) => {
  const cards = [
    {
      title: 'Total Gross Salary',
      value: totalGross,
      icon: <AttachMoney sx={{ fontSize: 40, color: '#2196f3' }} />,
      color: '#2196f3',
      trend: '+5.2%',
      trendUp: true,
      type: 'gross',
    },
    {
      title: 'Total Deductions',
      value: totalDeductions,
      icon: <Receipt sx={{ fontSize: 40, color: '#f44336' }} />,
      color: '#f44336',
      trend: '+2.1%',
      trendUp: false,
      type: 'deductions',
    },
    {
      title: 'Total Tax',
      value: totalTax,
      icon: <AccountBalance sx={{ fontSize: 40, color: '#ff9800' }} />,
      color: '#ff9800',
      trend: '+3.8%',
      trendUp: false,
      type: 'tax',
    },
    {
      title: 'Final Net Salary',
      value: totalFinalNet,
      icon: <People sx={{ fontSize: 40, color: '#4caf50' }} />,
      color: '#4caf50',
      trend: '+4.5%',
      trendUp: true,
      type: 'net',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={3} sx={{ mb: 4 }}>
      {cards.map((card, index) => (
        <Box key={index}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              },
              position: 'relative',
              overflow: 'visible',
            }}
            onClick={() => onCardClick?.(card.type)}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ color: 'text.secondary', fontSize: '0.875rem', mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: card.color }}>
                    {formatCurrency(card.value)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: `${card.color}15`,
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {card.icon}
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Chip
                  icon={card.trendUp ? <TrendingUp /> : <TrendingDown />}
                  label={card.trend}
                  size="small"
                  sx={{
                    backgroundColor: card.trendUp ? '#e8f5e8' : '#ffebee',
                    color: card.trendUp ? '#2e7d32' : '#c62828',
                    '& .MuiChip-icon': {
                      color: card.trendUp ? '#2e7d32' : '#c62828',
                    },
                  }}
                />
                <Tooltip title="Click to view details">
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <Info fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};


