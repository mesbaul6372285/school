export enum View {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  GALLERY = 'GALLERY',
  MEMBERS = 'MEMBERS',
  REGISTER = 'REGISTER',
  LOGIN_MEMBER = 'LOGIN_MEMBER',
  LOGIN_ADMIN = 'LOGIN_ADMIN',
  DASHBOARD_ADMIN = 'DASHBOARD_ADMIN',
  DASHBOARD_MEMBER = 'DASHBOARD_MEMBER'
}

export type Role = 'GUEST' | 'MEMBER' | 'ADMIN';
export type MemberStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Member {
  // System Fields
  id: string; // Assigned by Admin upon approval
  role: Role;
  status: MemberStatus;
  joinedDate: string;

  // Personal Info
  name: string;
  fatherName: string;
  motherName: string;
  presentAddress: string;
  permanentAddress: string;
  birthCertNo: string;
  dob: string;
  bloodGroup: string;
  
  // Academic & Contact
  class: string;
  roll: string;
  mobile: string;
  password: string; // In a real app, this would be hashed
}

export interface Project {
  id: number;
  title: string;
  status: 'COMPLETED' | 'ONGOING' | 'UPCOMING';
  image: string;
  researchers: string[];
  description?: string;
}

export interface Announcement {
  id: number;
  date: string;
  title: string;
  description: string;
  type: 'PUBLIC' | 'INTERNAL';
  priority?: 'HIGH' | 'NORMAL';
}

export interface GalleryItem {
  id: number;
  title: string;
  category: 'Event' | 'Experiment' | 'Competition';
  image: string;
}

export interface WeeklyFact {
  title: string;
  content: string;
}