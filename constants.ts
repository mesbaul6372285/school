import { Project, Announcement, Member, GalleryItem } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Solar Powered Water Purification",
    status: "COMPLETED",
    image: "https://picsum.photos/id/1/600/400",
    researchers: ["Rahim Ahmed", "Karim Ullah"]
  },
  {
    id: 2,
    title: "AI Traffic Control System",
    status: "ONGOING",
    image: "https://picsum.photos/id/2/600/400",
    researchers: ["Sadiq Rahman"]
  },
  {
    id: 3,
    title: "Vertical Farming Prototype",
    status: "ONGOING",
    image: "https://picsum.photos/id/3/600/400",
    researchers: ["Nusrat Jahan", "Adnan Sami"]
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    date: "2023-10-25",
    title: "National Science Carnival",
    description: "Prepare your projects for the upcoming national science carnival.",
    type: "PUBLIC",
    priority: "HIGH"
  },
  {
    id: 2,
    date: "2023-10-04",
    title: "Workshop on Arduino",
    description: "A hands-on workshop on Arduino basics for new members.",
    type: "INTERNAL",
    priority: "NORMAL"
  }
];

export const MOCK_MEMBERS: Member[] = [
  {
    id: "74326372285",
    name: "Chief Admin",
    role: "ADMIN",
    class: "Staff",
    roll: "00",
    mobile: "01900000000",
    status: "APPROVED",
    joinedDate: "2023-01-01",
    fatherName: "N/A",
    motherName: "N/A",
    bloodGroup: "O+",
    dob: "1993-01-01",
    presentAddress: "School Office",
    permanentAddress: "School Office",
    birthCertNo: "N/A",
    password: "admin"
  }
];

export const MOCK_GALLERY: GalleryItem[] = [
  { id: 1, title: "Rocket Launch", category: "Event", image: "https://picsum.photos/id/20/400/300" },
  { id: 2, title: "Biology Lab", category: "Experiment", image: "https://picsum.photos/id/24/400/500" }, // Tall image
  { id: 3, title: "Tesla Coil", category: "Experiment", image: "https://picsum.photos/id/28/400/300" },
  { id: 4, title: "Prize Giving", category: "Competition", image: "https://picsum.photos/id/40/400/300" },
];