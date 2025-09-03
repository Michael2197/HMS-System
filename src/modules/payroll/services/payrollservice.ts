/**
 * Payroll service for API calls
 */

const API_BASE_URL = 'http://localhost:8001';

export interface Employee {
  id: number;
  name: string;
  job_title: string;
  gross_salary: number;
  hire_date: string;
  status: string;
  annual_salary: number;
  monthly_salary: number;
  created_at?: string;
  updated_at?: string;
}

export interface Payslip {
  id: number;
  employee_id: number;
  employee_name: string;
  employee_job_title: string;
  pay_period: string;
  gross_salary: number;
  net_salary: number;
  taxes: number;
  social_security: number;
  health_insurance: number;
  other_deductions: number;
  total_deductions: number;
  take_home_pay: number;
  deductions: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface PayrollCalculation {
  employee_id: number;
  employee_name: string;
  job_title: string;
  pay_period: string;
  gross_salary: number;
  net_salary: number;
  taxes: number;
  social_security: number;
  health_insurance: number;
  other_deductions: number;
  total_deductions: number;
  take_home_pay: number;
  deductions_breakdown: Record<string, any>;
  annual_salary: number;
  annual_tax: number;
}

export interface PayrollSummary {
  total_employees: number;
  total_payroll: number;
  average_salary: number;
  total_taxes: number;
  total_deductions: number;
  period: string;
}

class PayrollService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Employee endpoints
  async getEmployees(params?: {
    skip?: number;
    limit?: number;
    name?: string;
    job_title?: string;
    status?: string;
  }): Promise<Employee[]> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = `/payroll/employees${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Employee[]>(endpoint);
  }

  async createEmployee(employee: Omit<Employee, 'id' | 'annual_salary' | 'monthly_salary'>): Promise<Employee> {
    return this.request<Employee>('/payroll/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  }

  async getEmployee(id: number): Promise<Employee> {
    return this.request<Employee>(`/payroll/employees/${id}`);
  }

  async updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee> {
    return this.request<Employee>(`/payroll/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    });
  }

  async deleteEmployee(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/payroll/employees/${id}`, {
      method: 'DELETE',
    });
  }

  // Payslip endpoints
  async getPayslips(params?: {
    skip?: number;
    limit?: number;
    employee_id?: number;
    pay_period?: string;
  }): Promise<Payslip[]> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = `/payroll/payslips${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Payslip[]>(endpoint);
  }

  async createPayslip(payslip: Omit<Payslip, 'id' | 'employee_name' | 'employee_job_title'>): Promise<Payslip> {
    return this.request<Payslip>('/payroll/payslips', {
      method: 'POST',
      body: JSON.stringify(payslip),
    });
  }

  async generatePayslip(
    employee_id: number,
    pay_period: string,
    additional_deductions?: Record<string, any>
  ): Promise<Payslip> {
    return this.request<Payslip>('/payroll/payslips/generate', {
      method: 'POST',
      body: JSON.stringify({
        employee_id,
        pay_period,
        additional_deductions,
      }),
    });
  }

  async getPayslip(id: number): Promise<Payslip> {
    return this.request<Payslip>(`/payroll/payslips/${id}`);
  }

  async updatePayslip(id: number, payslip: Partial<Payslip>): Promise<Payslip> {
    return this.request<Payslip>(`/payroll/payslips/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payslip),
    });
  }

  async deletePayslip(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/payroll/payslips/${id}`, {
      method: 'DELETE',
    });
  }

  async getEmployeePayslips(
    employee_id: number,
    params?: { skip?: number; limit?: number }
  ): Promise<{
    employee: { id: number; name: string; job_title: string };
    payslips: Payslip[];
    total_count: number;
  }> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = `/payroll/payslips/employee/${employee_id}${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  // Calculation endpoints
  async calculatePayroll(
    employee_id: number,
    pay_period: string,
    gross_salary?: number,
    additional_deductions?: Record<string, any>
  ): Promise<PayrollCalculation> {
    return this.request<PayrollCalculation>('/payroll/calculate', {
      method: 'POST',
      body: JSON.stringify({
        employee_id,
        pay_period,
        gross_salary,
        additional_deductions,
      }),
    });
  }

  async getPayrollSummary(period?: string): Promise<PayrollSummary> {
    const endpoint = `/payroll/summary${period ? `?period=${period}` : ''}`;
    return this.request<PayrollSummary>(endpoint);
  }

  async getTaxBrackets(): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/payroll/tax-brackets');
  }

  // Health check
  async healthCheck(): Promise<{ status: string; database: string; service: string }> {
    return this.request<{ status: string; database: string; service: string }>('/health');
  }
}

// Export singleton instance
export const payrollService = new PayrollService();
export default payrollService;
