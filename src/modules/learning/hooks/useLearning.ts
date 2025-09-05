import { useState, useEffect } from 'react';
import { mockCourses, mockCertifications } from '../data/initialData';

interface Course {
  id: number;
  title: string;
  status: 'In Progress' | 'Completed' | 'Not Started';
  description?: string;
  progress?: number;
}

interface Certification {
  id: number;
  name: string;
  issuedDate: string;
  expiryDate?: string;
  status: 'Active' | 'Expired' | 'Pending';
}

export const useLearning = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [certifications, setCertifications] = useState<Certification[]>(mockCertifications);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    setLoading(false);
  }, []);

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = {
      ...course,
      id: Math.max(...courses.map(c => c.id)) + 1
    };
    setCourses([...courses, newCourse]);
  };

  const updateCourseProgress = (courseId: number, progress: number) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, progress, status: progress === 100 ? 'Completed' : 'In Progress' }
        : course
    ));
  };

  const addCertification = (certification: Omit<Certification, 'id'>) => {
    const newCertification = {
      ...certification,
      id: Math.max(...certifications.map(c => c.id)) + 1
    };
    setCertifications([...certifications, newCertification]);
  };

  return {
    courses,
    certifications,
    loading,
    addCourse,
    updateCourseProgress,
    addCertification,
  };
};
