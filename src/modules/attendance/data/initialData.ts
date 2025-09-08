interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  location: string;
  status: 'Present' | 'Late' | 'Absent';
}

export const initialAttendanceRecords: AttendanceRecord[] = [
  {
    date: '2025-07-20',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    location: 'Office',
    status: 'Present',
  },
  {
    date: '2025-07-19',
    checkIn: '09:12 AM',
    checkOut: '06:01 PM',
    location: 'Remote',
    status: 'Late',
  },
  {
    date: '2025-07-18',
    checkIn: '-',
    checkOut: '-',
    location: '-',
    status: 'Absent',
  },
  {
    date: '2025-07-17',
    checkIn: '09:02 AM',
    checkOut: '06:10 PM',
    location: 'Office',
    status: 'Present',
  },
  {
    date: '2025-07-16',
    checkIn: '09:20 AM',
    checkOut: '06:05 PM',
    location: 'Remote',
    status: 'Late',
  },
]; 