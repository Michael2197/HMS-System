import { useState, useEffect, useCallback } from 'react';
import payrollService from '../services/payrollservice';
import type { Employee, Payslip, PayrollCalculation, PayrollSummary } from '../services/payrollservice';

export function usePayrollData() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load employees
  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await payrollService.getEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load employees');
      console.error('Error loading employees:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load payslips
  const loadPayslips = useCallback(async () => {
    try {
      setLoading(true);
      const data = await payrollService.getPayslips();
      setPayslips(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load payslips');
      console.error('Error loading payslips:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new employee
  const addEmployee = useCallback(async (employeeData: {
    name: string;
    job_title: string;
    gross_salary: number;
    hire_date?: string;
    status?: string;
  }) => {
    try {
      const newEmployee = await payrollService.createEmployee({
        ...employeeData,
        hire_date: employeeData.hire_date || new Date().toISOString().split('T')[0],
        status: employeeData.status || 'active',
      });
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add employee');
      throw err;
    }
  }, []);

  // Edit an existing employee
  const editEmployee = useCallback(async (id: number, employeeData: Partial<Employee>) => {
    try {
      const updatedEmployee = await payrollService.updateEmployee(id, employeeData);
      setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
      return updatedEmployee;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update employee');
      throw err;
    }
  }, []);

  // Delete an employee
  const deleteEmployee = useCallback(async (id: number) => {
    try {
      await payrollService.deleteEmployee(id);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      // Also remove related payslips
      setPayslips(prev => prev.filter(payslip => payslip.employee_id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete employee');
      throw err;
    }
  }, []);

  // Add a new payslip
  const addPayslip = useCallback(async (payslipData: {
    employee_id: number;
    pay_period: string;
    gross_salary: number;
    net_salary: number;
    taxes: number;
    social_security: number;
    health_insurance: number;
    other_deductions: number;
    deductions: Record<string, any>;
  }) => {
    try {
      const total_deductions = payslipData.taxes + payslipData.social_security + payslipData.health_insurance + payslipData.other_deductions;
      const take_home_pay = payslipData.net_salary;
      
      const newPayslip = await payrollService.createPayslip({
        ...payslipData,
        total_deductions,
        take_home_pay,
      });
      setPayslips(prev => [...prev, newPayslip]);
      return newPayslip;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add payslip');
      throw err;
    }
  }, []);

  // Generate a payslip
  const generatePayslip = useCallback(async (
    employee_id: number,
    pay_period: string,
    additional_deductions?: Record<string, any>
  ) => {
    try {
      const newPayslip = await payrollService.generatePayslip(employee_id, pay_period, additional_deductions);
      setPayslips(prev => [...prev, newPayslip]);
      return newPayslip;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate payslip');
      throw err;
    }
  }, []);

  // Edit an existing payslip
  const editPayslip = useCallback(async (id: number, payslipData: Partial<Payslip>) => {
    try {
      const updatedPayslip = await payrollService.updatePayslip(id, payslipData);
      setPayslips(prev => prev.map(payslip => payslip.id === id ? updatedPayslip : payslip));
      return updatedPayslip;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update payslip');
      throw err;
    }
  }, []);

  // Delete a payslip
  const deletePayslip = useCallback(async (id: number) => {
    try {
      await payrollService.deletePayslip(id);
      setPayslips(prev => prev.filter(payslip => payslip.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete payslip');
      throw err;
    }
  }, []);

  // Calculate payroll
  const calculatePayroll = useCallback(async (
    employee_id: number,
    pay_period: string,
    gross_salary?: number,
    additional_deductions?: Record<string, any>
  ): Promise<PayrollCalculation> => {
    try {
      return await payrollService.calculatePayroll(employee_id, pay_period, gross_salary, additional_deductions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate payroll');
      throw err;
    }
  }, []);

  // Get payroll summary
  const getPayrollSummary = useCallback(async (period?: string): Promise<PayrollSummary> => {
    try {
      return await payrollService.getPayrollSummary(period);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get payroll summary');
      throw err;
    }
  }, []);

  // Load initial data
  useEffect(() => {
    loadEmployees();
    loadPayslips();
  }, [loadEmployees, loadPayslips]);

  return {
    employees,
    payslips,
    loading,
    error,
    addEmployee,
    editEmployee,
    deleteEmployee,
    addPayslip,
    generatePayslip,
    editPayslip,
    deletePayslip,
    calculatePayroll,
    getPayrollSummary,
    refreshEmployees: loadEmployees,
    refreshPayslips: loadPayslips,
  };
}

export function usePayrollFilters() {
  const [filterName, setFilterName] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPayPeriod, setFilterPayPeriod] = useState('');
  
  return { 
    filterName, 
    setFilterName, 
    filterJob, 
    setFilterJob,
    filterStatus,
    setFilterStatus,
    filterPayPeriod,
    setFilterPayPeriod
  };
}
