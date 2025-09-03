import React from 'react';
import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TablePagination,
  Button,
  Box,
} from '@mui/material';

interface PayrollTableProps {
  filteredData: any[];
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  setSortBy: (col: string) => void;
  setSortDirection: (dir: 'asc' | 'desc') => void;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  totalCount: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export const PayrollTable: React.FC<PayrollTableProps> = ({
  filteredData,
  sortBy,
  sortDirection,
  setSortBy,
  setSortDirection,
  page,
  setPage,
  rowsPerPage,
  totalCount,
  onEdit,
  onDelete,
}) => {
  const handleSort = (col: string) => {
    if (sortBy === col) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDirection('asc');
    }
  };

  const getTierColor = (tier: string): string => {
    switch (tier) {
      case 'شريحة معفاه':
        return '#4caf50'; // Green - Exempt
      case 'شريحة ثانية':
        return '#2196f3'; // Blue - Second
      case 'شريحة ثالثة':
        return '#ff9800'; // Orange - Third
      case 'شريحة رابعة':
        return '#f44336'; // Red - Fourth
      case 'شريحة خامسة':
        return '#9c27b0'; // Purple - Fifth
      case 'شريحة سادسة':
        return '#607d8b'; // Blue Grey - Sixth
      case 'شريحة سادسة أ':
        return '#795548'; // Brown - Sixth A
      case 'شريحة سادسة ب':
        return '#e91e63'; // Pink - Sixth B
      case 'شريحة سادسة ج':
        return '#3f51b5'; // Indigo - Sixth C
      case 'شريحة سادسة د':
        return '#009688'; // Teal - Sixth D
      case 'شريحة سابعة':
        return '#ff5722'; // Deep Orange - Seventh
      default:
        return '#757575'; // Grey
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 1200 }}>
            <TableHead sx={{ backgroundColor: '#eee' }}>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'employeeName'}
                    direction={sortBy === 'employeeName' ? sortDirection : 'asc'}
                    onClick={() => handleSort('employeeName')}
                  >Employee</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'jobTitle'}
                    direction={sortBy === 'jobTitle' ? sortDirection : 'asc'}
                    onClick={() => handleSort('jobTitle')}
                  >Job</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'grossSalary'}
                    direction={sortBy === 'grossSalary' ? sortDirection : 'asc'}
                    onClick={() => handleSort('grossSalary')}
                  >Gross</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'insuranceSalary'}
                    direction={sortBy === 'insuranceSalary' ? sortDirection : 'asc'}
                    onClick={() => handleSort('insuranceSalary')}
                  >Insurance</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'companyInsuranceShare'}
                    direction={sortBy === 'companyInsuranceShare' ? sortDirection : 'asc'}
                    onClick={() => handleSort('companyInsuranceShare')}
                  >Company Share</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'employeeInsuranceShare'}
                    direction={sortBy === 'employeeInsuranceShare' ? sortDirection : 'asc'}
                    onClick={() => handleSort('employeeInsuranceShare')}
                  >Employee Share</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'solidarityContribution'}
                    direction={sortBy === 'solidarityContribution' ? sortDirection : 'asc'}
                    onClick={() => handleSort('solidarityContribution')}
                  >Solidarity</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'netSalaryAfterInsurance'}
                    direction={sortBy === 'netSalaryAfterInsurance' ? sortDirection : 'asc'}
                    onClick={() => handleSort('netSalaryAfterInsurance')}
                  >Net After Insurance</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'personalExemptionForPeriod'}
                    direction={sortBy === 'personalExemptionForPeriod' ? sortDirection : 'asc'}
                    onClick={() => handleSort('personalExemptionForPeriod')}
                  >Personal Exemption for Period</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'taxableBaseForPeriod'}
                    direction={sortBy === 'taxableBaseForPeriod' ? sortDirection : 'asc'}
                    onClick={() => handleSort('taxableBaseForPeriod')}
                  >Taxable Base</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'annualBase'}
                    direction={sortBy === 'annualBase' ? sortDirection : 'asc'}
                    onClick={() => handleSort('annualBase')}
                  >Annual Base</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'annualTax'}
                    direction={sortBy === 'annualTax' ? sortDirection : 'asc'}
                    onClick={() => handleSort('annualTax')}
                  >Annual Tax</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'monthlyTaxWithheld'}
                    direction={sortBy === 'monthlyTaxWithheld' ? sortDirection : 'asc'}
                    onClick={() => handleSort('monthlyTaxWithheld')}
                  >Monthly Tax</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'withheldPayrollTax'}
                    direction={sortBy === 'withheldPayrollTax' ? sortDirection : 'asc'}
                    onClick={() => handleSort('withheldPayrollTax')}
                  >Withheld Payroll Tax</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'finalNetSalary'}
                    direction={sortBy === 'finalNetSalary' ? sortDirection : 'asc'}
                    onClick={() => handleSort('finalNetSalary')}
                  >Final Net</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'tier'}
                    direction={sortBy === 'tier' ? sortDirection : 'asc'}
                    onClick={() => handleSort('tier')}
                  >Tier</TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: 120, width: 120 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((d, i) => (
                <TableRow key={i}>
                  <TableCell>{d.employeeName}</TableCell>
                  <TableCell>{d.jobTitle}</TableCell>
                  <TableCell>${d.grossSalary.toFixed(2)}</TableCell>
                  <TableCell>${d.insuranceSalary.toFixed(2)}</TableCell>
                  <TableCell>${d.companyInsuranceShare.toFixed(2)}</TableCell>
                  <TableCell>${d.employeeInsuranceShare.toFixed(2)}</TableCell>
                  <TableCell>${d.solidarityContribution.toFixed(2)}</TableCell>
                  <TableCell>${d.netSalaryAfterInsurance.toFixed(2)}</TableCell>
                  <TableCell>${d.personalExemptionForPeriod.toFixed(2)}</TableCell>
                  <TableCell>${d.taxableBaseForPeriod.toFixed(2)}</TableCell>
                  <TableCell>${d.annualBase?.toFixed(2)}</TableCell>
                  <TableCell>${d.annualTax.toFixed(2)}</TableCell>
                  <TableCell>${d.monthlyTaxWithheld.toFixed(2)}</TableCell>
                  <TableCell>${d.withheldPayrollTax.toFixed(2)}</TableCell>
                  <TableCell>${d.finalNetSalary.toFixed(2)}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        backgroundColor: getTierColor(d.tier),
                        color: 'white',
                      }}
                    >
                      {d.tier}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ minWidth: 120, width: 120 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => onEdit(i)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => onDelete(i)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={() => {}}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </CardContent>
    </Card>
  );
};


