/**
 * Data Export Utilities
 * Handles CSV, Excel, and PDF export functionality
 */

import type { AttendanceRecord, AttendanceReport, AttendanceStatistics } from '../types';

// CSV Export Functions
export class CSVExporter {
  /**
   * Convert attendance data to CSV format
   */
  public static exportAttendanceRecords(
    records: AttendanceRecord[],
    filename = 'attendance-records.csv'
  ): void {
    const headers = [
      'Employee ID',
      'Employee Name',
      'Date',
      'Check In',
      'Check Out',
      'Working Hours',
      'Overtime Hours',
      'Break Time (min)',
      'Late Minutes',
      'Early Departure (min)',
      'Status',
      'Location',
      'Shift Type',
      'Check-in Method',
      'Notes'
    ];

    const csvData = records.map(record => [
      record.employeeId,
      record.employeeName,
      record.date,
      record.checkIn || '-',
      record.checkOut || '-',
      record.workingHours.toFixed(2),
      record.overtimeHours.toFixed(2),
      record.breakTime.toString(),
      record.lateMinutes.toString(),
      record.earlyDepartureMinutes.toString(),
      record.status,
      record.location,
      record.shiftType,
      record.checkInMethod,
      record.notes || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => this.escapeCsvField(field)).join(','))
      .join('\n');

    this.downloadFile(csvContent, filename, 'text/csv');
  }

  /**
   * Export attendance summary as CSV
   */
  public static exportAttendanceSummary(
    statistics: AttendanceStatistics,
    filename = 'attendance-summary.csv'
  ): void {
    const summaryData = [
      ['Metric', 'Value'],
      ['Total Working Days', statistics.totalWorkingDays.toString()],
      ['Present Days', statistics.presentDays.toString()],
      ['Absent Days', statistics.absentDays.toString()],
      ['Late Days', statistics.lateDays.toString()],
      ['Attendance Percentage', `${statistics.attendancePercentage.toFixed(2)}%`],
      ['Average Working Hours', `${statistics.averageWorkingHours.toFixed(2)} hours`],
      ['Total Overtime Hours', `${statistics.totalOvertimeHours.toFixed(2)} hours`],
      ['Average Check-in Time', statistics.averageCheckInTime],
      ['Average Check-out Time', statistics.averageCheckOutTime],
      ['Perfect Attendance Streak', `${statistics.perfectAttendanceStreak} days`],
      ['Late Arrival Streak', `${statistics.lateArrivalStreak} days`]
    ];

    const csvContent = summaryData
      .map(row => row.map(field => this.escapeCsvField(field)).join(','))
      .join('\n');

    this.downloadFile(csvContent, filename, 'text/csv');
  }

  /**
   * Escape CSV field to handle commas, quotes, and newlines
   */
  private static escapeCsvField(field: string): string {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  }

  /**
   * Download file helper
   */
  private static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Excel Export Functions (using a simple approach for demo)
export class ExcelExporter {
  /**
   * Export attendance records to Excel format
   */
  public static exportAttendanceRecords(
    records: AttendanceRecord[],
    filename = 'attendance-records.xlsx'
  ): void {
    // For a real implementation, you would use a library like SheetJS (xlsx)
    // For now, we'll export as CSV with Excel-compatible format
    const headers = [
      'Employee ID',
      'Employee Name',
      'Date',
      'Check In',
      'Check Out',
      'Working Hours',
      'Overtime Hours',
      'Break Time (min)',
      'Late Minutes',
      'Early Departure (min)',
      'Status',
      'Location',
      'Shift Type',
      'Check-in Method',
      'Notes'
    ];

    let excelContent = headers.join('\t') + '\n';
    
    records.forEach(record => {
      const row = [
        record.employeeId,
        record.employeeName,
        record.date,
        record.checkIn || '-',
        record.checkOut || '-',
        record.workingHours.toFixed(2),
        record.overtimeHours.toFixed(2),
        record.breakTime.toString(),
        record.lateMinutes.toString(),
        record.earlyDepartureMinutes.toString(),
        record.status,
        record.location,
        record.shiftType,
        record.checkInMethod,
        record.notes || ''
      ];
      excelContent += row.join('\t') + '\n';
    });

    const blob = new Blob([excelContent], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Export detailed report with multiple sheets
   */
  public static exportDetailedReport(
    records: AttendanceRecord[],
    statistics: AttendanceStatistics,
    filename = 'attendance-detailed-report.xlsx'
  ): void {
    // This would typically create multiple sheets:
    // 1. Summary sheet with statistics
    // 2. Detailed records sheet
    // 3. Charts and graphs sheet
    
    // For now, combine everything in one tab-separated format
    let content = 'ATTENDANCE REPORT\n\n';
    
    content += 'SUMMARY STATISTICS\n';
    content += 'Metric\tValue\n';
    content += `Total Working Days\t${statistics.totalWorkingDays}\n`;
    content += `Present Days\t${statistics.presentDays}\n`;
    content += `Absent Days\t${statistics.absentDays}\n`;
    content += `Late Days\t${statistics.lateDays}\n`;
    content += `Attendance Percentage\t${statistics.attendancePercentage.toFixed(2)}%\n`;
    content += `Average Working Hours\t${statistics.averageWorkingHours.toFixed(2)}\n`;
    content += `Total Overtime Hours\t${statistics.totalOvertimeHours.toFixed(2)}\n\n`;
    
    content += 'DETAILED RECORDS\n';
    content += 'Employee ID\tEmployee Name\tDate\tCheck In\tCheck Out\tWorking Hours\tOvertime Hours\tStatus\tLocation\n';
    
    records.forEach(record => {
      content += `${record.employeeId}\t${record.employeeName}\t${record.date}\t${record.checkIn || '-'}\t${record.checkOut || '-'}\t${record.workingHours.toFixed(2)}\t${record.overtimeHours.toFixed(2)}\t${record.status}\t${record.location}\n`;
    });

    const blob = new Blob([content], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// PDF Export Functions
export class PDFExporter {
  /**
   * Export attendance report as PDF
   */
  public static async exportAttendanceReport(
    report: AttendanceReport,
    _filename = 'attendance-report.pdf'
  ): Promise<void> {
    // For a real implementation, you would use a library like jsPDF
    // For now, we'll create an HTML representation and use browser print
    
    const htmlContent = this.generateReportHTML(report);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for content to load, then print
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  }

  /**
   * Generate HTML content for PDF report
   */
  private static generateReportHTML(report: AttendanceReport): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${report.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          color: #333;
        }
        h1, h2, h3 {
          color: #1976d2;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #1976d2;
        }
        .section {
          margin: 20px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        .stat-card {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 5px;
          background: #f9f9f9;
        }
        .stat-label {
          font-weight: bold;
          color: #666;
          font-size: 0.9em;
        }
        .stat-value {
          font-size: 1.5em;
          font-weight: bold;
          color: #1976d2;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f5f5f5;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .status-present { color: #4caf50; font-weight: bold; }
        .status-late { color: #ff9800; font-weight: bold; }
        .status-absent { color: #f44336; font-weight: bold; }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          text-align: center;
          color: #666;
          font-size: 0.9em;
        }
        @media print {
          body { margin: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${report.title}</h1>
        <p>${report.subtitle}</p>
        <p>Period: ${report.dateRange.startDate} to ${report.dateRange.endDate}</p>
        <p>Generated on: ${new Date(report.generatedAt).toLocaleDateString()}</p>
      </div>

      <div class="section">
        <h2>Summary Statistics</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-label">Total Working Days</div>
            <div class="stat-value">${report.statistics.totalWorkingDays}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Present Days</div>
            <div class="stat-value">${report.statistics.presentDays}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Attendance Rate</div>
            <div class="stat-value">${report.statistics.attendancePercentage.toFixed(1)}%</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Average Hours</div>
            <div class="stat-value">${report.statistics.averageWorkingHours.toFixed(1)}h</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Overtime Hours</div>
            <div class="stat-value">${report.statistics.totalOvertimeHours.toFixed(1)}h</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Late Days</div>
            <div class="stat-value">${report.statistics.lateDays}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Attendance Records</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            ${report.data.map(record => `
              <tr>
                <td>${record.date}</td>
                <td>${record.employeeName}</td>
                <td>${record.checkIn || '-'}</td>
                <td>${record.checkOut || '-'}</td>
                <td>${record.workingHours.toFixed(1)}h</td>
                <td class="status-${record.status.toLowerCase()}">${record.status}</td>
                <td>${record.location}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>This report was generated automatically by the HR Attendance System</p>
        <p>Generated by: ${report.generatedBy} | Report ID: ${report.id}</p>
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Export simple attendance list as PDF
   */
  public static exportSimpleList(
    records: AttendanceRecord[],
    title = 'Attendance Records',
    _filename = 'attendance-list.pdf'
  ): void {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #1976d2; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f5f5f5; }
        tr:nth-child(even) { background-color: #f9f9f9; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${records.map(record => `
            <tr>
              <td>${record.date}</td>
              <td>${record.employeeName}</td>
              <td>${record.checkIn || '-'}</td>
              <td>${record.checkOut || '-'}</td>
              <td>${record.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  }
}

// Main Export Manager
export class ExportManager {
  /**
   * Export data in the specified format
   */
  public static async export(
    format: 'csv' | 'excel' | 'pdf',
    data: AttendanceRecord[],
    options: {
      filename?: string;
      statistics?: AttendanceStatistics;
      title?: string;
      includeCharts?: boolean;
    } = {}
  ): Promise<void> {
    const { filename, statistics, title = 'Attendance Report' } = options;
    
    switch (format) {
      case 'csv':
        CSVExporter.exportAttendanceRecords(
          data,
          filename || 'attendance-records.csv'
        );
        break;
        
      case 'excel':
        if (statistics) {
          ExcelExporter.exportDetailedReport(
            data,
            statistics,
            filename || 'attendance-report.xlsx'
          );
        } else {
          ExcelExporter.exportAttendanceRecords(
            data,
            filename || 'attendance-records.xlsx'
          );
        }
        break;
        
      case 'pdf':
        if (statistics) {
          const report: AttendanceReport = {
            id: `report-${Date.now()}`,
            configId: 'default',
            title,
            subtitle: 'Comprehensive Attendance Analysis',
            dateRange: {
              startDate: data[data.length - 1]?.date || new Date().toISOString().split('T')[0],
              endDate: data[0]?.date || new Date().toISOString().split('T')[0]
            },
            data,
            statistics,
            departmentStats: [],
            trends: [],
            kpis: [],
            generatedAt: new Date().toISOString(),
            generatedBy: 'System'
          };
          
          await PDFExporter.exportAttendanceReport(
            report,
            filename || 'attendance-report.pdf'
          );
        } else {
          PDFExporter.exportSimpleList(
            data,
            title,
            filename || 'attendance-list.pdf'
          );
        }
        break;
        
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Export summary statistics only
   */
  public static exportSummary(
    statistics: AttendanceStatistics,
    format: 'csv' | 'excel' = 'csv',
    filename?: string
  ): void {
    switch (format) {
      case 'csv':
        CSVExporter.exportAttendanceSummary(
          statistics,
          filename || 'attendance-summary.csv'
        );
        break;
        
      case 'excel':
        // Could implement Excel-specific summary export here
        CSVExporter.exportAttendanceSummary(
          statistics,
          filename || 'attendance-summary.xlsx'
        );
        break;
        
      default:
        throw new Error(`Unsupported summary export format: ${format}`);
    }
  }
}

export default ExportManager;
