export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  permissions: string[];
  lastLogin?: string;
}
export interface AuthState {
  user: User | null;
}