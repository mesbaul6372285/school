import { Member, Project, Announcement, GalleryItem, WeeklyFact } from './types';
import { MOCK_PROJECTS, MOCK_ANNOUNCEMENTS, MOCK_GALLERY } from './constants';

const KEYS = {
  MEMBERS: 'sbhss_members',
  PROJECTS: 'sbhss_projects',
  ANNOUNCEMENTS: 'sbhss_announcements',
  GALLERY: 'sbhss_gallery',
  WEEKLY_FACT: 'sbhss_weekly_fact',
  INIT: 'sbhss_initialized_v2' // Changed key to force re-init with new credentials
};

// Seed Data
const DEFAULT_ADMIN: Member = {
  id: "1234567890", // Updated Admin ID
  role: "ADMIN",
  status: "APPROVED",
  joinedDate: new Date().toISOString(),
  name: "Chief Admin",
  fatherName: "N/A",
  motherName: "N/A",
  presentAddress: "School Administration",
  permanentAddress: "School Administration",
  birthCertNo: "N/A",
  dob: "1933-01-01",
  bloodGroup: "O+",
  class: "Staff",
  roll: "00",
  mobile: "01700000000",
  password: "qwertyuiop" // Default password
};

export const DB = {
  init: () => {
    if (!localStorage.getItem(KEYS.INIT)) {
      localStorage.setItem(KEYS.MEMBERS, JSON.stringify([DEFAULT_ADMIN]));
      localStorage.setItem(KEYS.PROJECTS, JSON.stringify(MOCK_PROJECTS));
      localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(MOCK_ANNOUNCEMENTS));
      localStorage.setItem(KEYS.GALLERY, JSON.stringify(MOCK_GALLERY));
      localStorage.setItem(KEYS.INIT, 'true');
    }
  },

  // Members
  getMembers: (): Member[] => {
    return JSON.parse(localStorage.getItem(KEYS.MEMBERS) || '[]');
  },
  
  saveMember: (member: Member) => {
    const members = DB.getMembers();
    // Check for duplicates based on mobile or birth cert for registration
    // Allow saving if it's an update to existing ID
    const exists = members.find(m => m.id === member.id);
    if (!exists && members.some(m => m.mobile === member.mobile)) {
      throw new Error("Mobile number already registered");
    }
    
    if (exists) {
        DB.updateMember(member);
    } else {
        members.push(member);
        localStorage.setItem(KEYS.MEMBERS, JSON.stringify(members));
    }
  },

  updateMember: (updatedMember: Member) => {
    const members = DB.getMembers();
    const index = members.findIndex(m => m.id === updatedMember.id);
    if (index !== -1) {
       members[index] = updatedMember;
       localStorage.setItem(KEYS.MEMBERS, JSON.stringify(members));
    } else {
       // If ID not found, use replaceMember or saveMember instead.
       // This function expects ID to remain constant.
       console.error("Member ID not found for update. Use replaceMember if ID changed.");
    }
  },

  // Handles cases where ID changes (e.g. Approval or Admin ID change)
  replaceMember: (oldId: string, newMember: Member) => {
     let members = DB.getMembers();
     
     // Check if new ID is already taken by SOMEONE ELSE
     if (newMember.id !== oldId && members.some(m => m.id === newMember.id)) {
         throw new Error(`Member ID ${newMember.id} is already taken.`);
     }

     members = members.filter(m => m.id !== oldId);
     members.push(newMember);
     localStorage.setItem(KEYS.MEMBERS, JSON.stringify(members));
  },

  deleteMember: (id: string) => {
    const members = DB.getMembers().filter(m => m.id !== id);
    localStorage.setItem(KEYS.MEMBERS, JSON.stringify(members));
  },

  findMember: (id: string): Member | undefined => {
    return DB.getMembers().find(m => m.id === id);
  },

  // CMS Content
  getProjects: (): Project[] => JSON.parse(localStorage.getItem(KEYS.PROJECTS) || '[]'),
  saveProjects: (data: Project[]) => localStorage.setItem(KEYS.PROJECTS, JSON.stringify(data)),

  getAnnouncements: (): Announcement[] => JSON.parse(localStorage.getItem(KEYS.ANNOUNCEMENTS) || '[]'),
  saveAnnouncements: (data: Announcement[]) => localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(data)),

  getGallery: (): GalleryItem[] => JSON.parse(localStorage.getItem(KEYS.GALLERY) || '[]'),
  saveGallery: (data: GalleryItem[]) => localStorage.setItem(KEYS.GALLERY, JSON.stringify(data)),

  getWeeklyFact: (): WeeklyFact => {
    const data = localStorage.getItem(KEYS.WEEKLY_FACT);
    return data ? JSON.parse(data) : { title: "Weekly Fact: Quantum Entanglement", content: "Did you know? When two particles become entangled..." };
  },
  saveWeeklyFact: (data: WeeklyFact) => localStorage.setItem(KEYS.WEEKLY_FACT, JSON.stringify(data)),
};