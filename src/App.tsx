import React, { useState, useEffect } from 'react';
import { View, Project, Member, Announcement, GalleryItem, Role, WeeklyFact } from './types';
import { DB } from './db';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { 
  FlaskConical, Cpu, Trophy, FileText, User, MapPin, Phone, 
  LogOut, Users, Settings, LayoutGrid, CheckCircle, UserCircle,
  AlertTriangle, Eye, EyeOff, Search, Calendar, Shield, Save, XCircle, Plus, Trash2, Edit
} from 'lucide-react';

// --- COMPONENTS ---

// 1. HERO SECTION (Public)
const HeroSection: React.FC<{ setView: (v: View) => void; announcements: Announcement[] }> = ({ setView, announcements }) => (
  <div className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
    {/* Background Glows */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />

    <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
      <div className="inline-block mb-4 px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
        <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Established 1933</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-2xl">
        Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Unknown</span><br />
        Innovate the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Future</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 mb-10 leading-relaxed">
        Welcome to the official Science Club of Siddheswari Boys' Higher Secondary School. 
        A hub for curiosity, innovation, and scientific excellence.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          onClick={() => setView(View.REGISTER)}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:-translate-y-1"
        >
          Become a Member →
        </button>
        <button 
          onClick={() => setView(View.PROJECTS)}
          className="px-8 py-3 bg-transparent border border-gray-600 text-white rounded-lg font-semibold hover:bg-white/5 hover:border-white transition-all duration-300"
        >
          View Projects
        </button>
      </div>
    </div>

    {/* Announcements - Public Only */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 mt-24 w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
        <h2 className="text-2xl font-bold text-white">Latest Announcements</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.filter(a => a.type === 'PUBLIC').slice(0, 4).map((ann) => (
          <div key={ann.id} className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors border border-white/5 hover:border-cyan-500/30">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${ann.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-cyan-950/50 text-cyan-400'}`}>
                {ann.priority === 'HIGH' ? 'Important' : 'Notice'}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={12}/> {ann.date}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{ann.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{ann.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 2. PROJECTS VIEW
const ProjectsView: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className="pt-28 pb-20 max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">Innovation Showcase</h2>
      <p className="text-gray-400">Explore the groundbreaking work done by our young scientists.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div key={project.id} className="group glass-panel rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300">
          <div className="relative h-48 overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 left-4">
               <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide border ${
                 project.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                 project.status === 'ONGOING' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                 'bg-purple-500/20 text-purple-400 border-purple-500/30'
               }`}>
                 {project.status}
               </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
            {project.description && <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Researchers</p>
              <div className="flex flex-wrap gap-2">
                {project.researchers && project.researchers.map((r, idx) => (
                  <span key={idx} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300 border border-white/5">{r}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 3. GALLERY VIEW
const GalleryView: React.FC<{ gallery: GalleryItem[] }> = ({ gallery }) => (
  <div className="pt-28 pb-20 max-w-7xl mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">Club Gallery</h2>
        <p className="text-gray-400">Moments of discovery and celebration.</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
      {gallery.map((item, index) => (
        <div key={item.id} className={`relative rounded-lg overflow-hidden group border border-white/10 ${index % 4 === 0 ? 'md:col-span-2' : ''}`}>
          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">{item.category}</span>
            <h3 className="text-white font-bold text-lg">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 4. MEMBERS VIEW (Public/Restricted)
const MembersView: React.FC<{ members: Member[], currentUser: Member | null }> = ({ members, currentUser }) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  // Filter only approved members for public view, and HIDE ADMINS
  const displayMembers = members.filter(m => m.status === 'APPROVED' && m.role !== 'ADMIN');

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Our Members</h2>
        <p className="text-gray-400">The brilliant minds driving our club forward.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayMembers.map((member) => (
          <div key={member.id} className="glass-panel rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden group border border-white/10">
            {/* Admin Badge */}
            {member.role === 'ADMIN' && (
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded text-[10px] font-bold text-red-400 flex items-center gap-1">
                 <Shield size={10} /> Admin
              </div>
            )}

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-blue-500/20 ring-4 ring-white/5">
              {member.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
            <p className="text-cyan-400 font-mono text-sm mb-6 bg-cyan-950/30 px-3 py-1 rounded border border-cyan-900/50">ID: {member.id}</p>
            
            <div className="w-full grid grid-cols-2 gap-4 mb-6 border-t border-b border-white/5 py-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Class</p>
                <p className="text-white font-semibold">{member.class}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Roll</p>
                <p className="text-white font-semibold">{member.roll}</p>
              </div>
            </div>

            {/* Public visitors see less info */}
            {currentUser?.role === 'ADMIN' ? (
              <button 
                onClick={() => setSelectedMember(member)}
                className="w-full py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <FileText size={16} /> View Full Profile
              </button>
            ) : (
              <div className="text-xs text-gray-500 italic">Login to view more details</div>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedMember} onClose={() => setSelectedMember(null)} title={`Profile: ${selectedMember?.name}`}>
        {selectedMember && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <h3 className="flex items-center gap-2 text-lg font-semibold text-cyan-400 mb-4 pb-2 border-b border-white/10">
                 <User size={20} /> Personal Information
               </h3>
               <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="text-gray-500 text-xs uppercase">Father's Name</p>
                     <p className="text-white">{selectedMember.fatherName}</p>
                   </div>
                   <div>
                     <p className="text-gray-500 text-xs uppercase">Mother's Name</p>
                     <p className="text-white">{selectedMember.motherName}</p>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="text-gray-500 text-xs uppercase">Blood Group</p>
                     <p className="text-white">{selectedMember.bloodGroup}</p>
                   </div>
                   <div>
                     <p className="text-gray-500 text-xs uppercase">Date of Birth</p>
                     <p className="text-white">{selectedMember.dob}</p>
                   </div>
                 </div>
                 <div>
                    <p className="text-gray-500 text-xs uppercase">Birth Certificate</p>
                    <p className="text-white font-mono">{selectedMember.birthCertNo}</p>
                 </div>
               </div>
             </div>

             <div>
               <h3 className="flex items-center gap-2 text-lg font-semibold text-cyan-400 mb-4 pb-2 border-b border-white/10">
                 <MapPin size={20} /> Contact & Address
               </h3>
               <div className="space-y-4">
                 <div>
                   <p className="text-gray-500 text-xs uppercase">Mobile</p>
                   <p className="text-white flex items-center gap-2"><Phone size={14} />{selectedMember.mobile}</p>
                 </div>
                 <div>
                   <p className="text-gray-500 text-xs uppercase">Present Address</p>
                   <p className="text-white">{selectedMember.presentAddress}</p>
                 </div>
                 <div>
                   <p className="text-gray-500 text-xs uppercase">Permanent Address</p>
                   <p className="text-white">{selectedMember.permanentAddress}</p>
                 </div>
               </div>
             </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// 5. REGISTER VIEW (Detailed Form)
const RegisterView: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Member>>({
    name: '', fatherName: '', motherName: '', 
    dob: '', bloodGroup: '', birthCertNo: '',
    class: '', roll: '', mobile: '', 
    presentAddress: '', permanentAddress: '', password: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError('You must agree to the club policy.');
      return;
    }

    const required = ['name', 'fatherName', 'motherName', 'dob', 'class', 'roll', 'mobile', 'password'];
    for (const field of required) {
      if (!formData[field as keyof Member]) {
        setError(`Please fill in all fields. Missing: ${field}`);
        return;
      }
    }

    try {
      const newMember: Member = {
        ...formData as Member,
        id: `TEMP-${Date.now()}`, 
        role: 'MEMBER',
        status: 'PENDING',
        joinedDate: new Date().toISOString()
      };
      
      await DB.saveMember(newMember);
      alert('Application Submitted Successfully! Your Member ID will be generated upon Admin Approval.');
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
          <UserCircle size={14} /> Join the Club
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Membership Application</h2>
        <p className="text-gray-400 mt-2">Join the elite scientific community of SBHSS.</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl max-w-5xl mx-auto border border-white/10 shadow-2xl shadow-blue-900/10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Personal Information</h3>
              <div className="space-y-4">
                <input name="name" onChange={handleChange} required placeholder="Full Name" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
                <input name="fatherName" onChange={handleChange} required placeholder="Father's Name" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
                <input name="motherName" onChange={handleChange} required placeholder="Mother's Name" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="dob" type="date" onChange={handleChange} required className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
                  <select name="bloodGroup" onChange={handleChange} required className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:border-cyan-500 focus:outline-none">
                    <option value="">Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <input name="birthCertNo" onChange={handleChange} required placeholder="Birth Certificate Number" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Academic & Security</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input name="class" onChange={handleChange} required placeholder="Class" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
                  <input name="roll" onChange={handleChange} required placeholder="Roll No" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
                </div>
                <input name="presentAddress" onChange={handleChange} required placeholder="Present Address" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
                <input name="permanentAddress" onChange={handleChange} required placeholder="Permanent Address" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
                <input name="mobile" onChange={handleChange} required placeholder="Mobile Number" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
                <input name="password" type="password" onChange={handleChange} required placeholder="Password" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-[#0a0f1c]/50 rounded-lg border border-white/10">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <FileText size={16} className="text-cyan-400" /> বিজ্ঞান ক্লাবের নীতিমালা
            </h3>
            <div className="h-32 overflow-y-auto text-sm text-gray-300 p-4 bg-black/40 rounded custom-scrollbar border border-white/5 leading-relaxed font-sans">
              <p className="font-bold text-cyan-400 mb-2">উদ্দেশ্য</p>
              <p className="mb-4">বিজ্ঞান ক্লাবের প্রাথমিক লক্ষ্য হল সমালোচনামূলক চিন্তাভাবনাকে উৎসাহিত করা...</p>
              <p className="mb-4">...জালিয়াতি করলে ক্লাব ও প্রতিযোগিতা থেকে তাৎক্ষণিক বহিষ্কার করা হবে।</p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input type="checkbox" id="agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 cursor-pointer" />
              <label htmlFor="agree" className="text-sm text-gray-300 font-medium cursor-pointer select-none">আমি বিজ্ঞান ক্লাবের সকল নীতিমালা পড়েছি এবং সম্মত আছি</label>
            </div>
          </div>

          {error && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-sm flex items-center gap-2"><AlertTriangle size={16}/>{error}</div>}

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button type="submit" className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-lg shadow-cyan-900/50 transition-all">Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 6. MEMBER DASHBOARD
const MemberDashboard: React.FC<{ member: Member, weeklyFact: WeeklyFact }> = ({ member, weeklyFact }) => (
  <div className="pt-28 pb-20 max-w-7xl mx-auto px-4">
     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
       <div>
         <h2 className="text-3xl font-bold text-white">Welcome, {member.name}</h2>
         <p className="text-gray-400">Class: {member.class} | Roll: {member.roll} | ID: {member.id}</p>
       </div>
       <div className="px-4 py-2 bg-green-900/30 border border-green-500/30 rounded-full text-green-400 text-sm font-bold flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
         Active Member
       </div>
     </div>
     <div className="w-full">
         <div className="glass-panel p-6 rounded-xl border border-white/10">
           <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FlaskConical className="text-purple-400" /> Virtual Science Corner</h3>
           <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-lg border border-white/5">
             <h4 className="font-bold text-white mb-2">{weeklyFact.title}</h4>
             <p className="text-gray-300 text-sm leading-relaxed">{weeklyFact.content}</p>
           </div>
         </div>
     </div>
  </div>
);

// 7. ADMIN DASHBOARD
const AdminDashboard: React.FC<{ currentUser: Member; setCurrentUser: (u: Member) => void; refreshData: () => void }> = ({ currentUser, setCurrentUser, refreshData }) => {
  const [activeTab, setActiveTab] = useState<'MEMBERS' | 'CMS' | 'SETTINGS'>('MEMBERS');
  const [members, setMembers] = useState<Member[]>([]);
  
  // CMS States
  const [cmsView, setCmsView] = useState<'PROJECTS' | 'ANNOUNCEMENTS' | 'GALLERY' | 'FACT'>('PROJECTS');
  const [projects, setProjects] = useState<Project[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [weeklyFact, setWeeklyFact] = useState<WeeklyFact>({ id: 0, title: '', content: '' });

  // Editing States
  const [approveId, setApproveId] = useState<string | null>(null); 
  const [newMemberId, setNewMemberId] = useState('');
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [cmsModal, setCmsModal] = useState<{ isOpen: boolean, type: 'PROJ' | 'ANN' | 'GAL' | 'FACT', data: any | null }>({ isOpen: false, type: 'PROJ', data: null });
  const [adminSettings, setAdminSettings] = useState({ id: currentUser.id, password: currentUser.password });

  const loadData = async () => {
    setMembers(await DB.getMembers());
    setProjects(await DB.getProjects());
    setAnnouncements(await DB.getAnnouncements());
    setGallery(await DB.getGallery());
    setWeeklyFact(await DB.getWeeklyFact());
  };

  useEffect(() => {
    loadData();
  }, [activeTab, cmsView]);

  // --- Member Management ---
  const handleApprove = async (member: Member) => {
    if (!newMemberId.trim()) { alert("Please assign a Member ID"); return; }
    try {
        const updated = { ...member, id: newMemberId, status: 'APPROVED' as const };
        await DB.replaceMember(member.id, updated);
        setApproveId(null);
        setNewMemberId('');
        loadData();
        refreshData();
    } catch (e: any) {
        alert(e.message);
    }
  };

  const handleToggleStatus = async (member: Member) => {
      const newStatus = member.status === 'APPROVED' ? 'REJECTED' : 'APPROVED';
      await DB.updateMember({ ...member, status: newStatus as any });
      loadData();
  };

  const handleSaveMemberChanges = async (e: React.FormEvent) => {
      e.preventDefault();
      if (editingMember) {
          await DB.updateMember(editingMember);
          setEditingMember(null);
          loadData();
      }
  };

  // --- CMS Helpers ---
  const deleteItem = async (type: 'PROJ' | 'ANN' | 'GAL', id: number) => {
      if(!confirm("Delete item?")) return;
      if (type === 'PROJ') {
         // Note: Real apps should use DB.deleteProject(id)
         // For now using save with filtered list or direct Supabase delete logic
         const newD = projects.filter(p => p.id !== id);
         await DB.saveProjects(newD);
      } else if (type === 'ANN') {
         const newD = announcements.filter(a => a.id !== id);
         await DB.saveAnnouncements(newD);
      } else if (type === 'GAL') {
         const newD = gallery.filter(g => g.id !== id);
         await DB.saveGallery(newD);
      }
      loadData();
      refreshData();
  };

  const openCmsModal = (type: 'PROJ' | 'ANN' | 'GAL' | 'FACT', data?: any) => {
      let initialData;
      if (data) {
          initialData = { ...data };
          if (type === 'PROJ' && Array.isArray(data.researchers)) {
              initialData.researchers = data.researchers.join(', ');
          }
      } else {
          if (type === 'PROJ') initialData = { title: '', status: 'ONGOING', image: '', description: '', researchers: '' };
          if (type === 'ANN') initialData = { title: '', date: new Date().toISOString().split('T')[0], type: 'PUBLIC', priority: 'NORMAL', description: '' };
          if (type === 'GAL') initialData = { title: '', category: 'Event', image: '' };
      }
      setCmsModal({ isOpen: true, type, data: initialData });
  };

  const handleSaveCms = async (e: React.FormEvent) => {
      e.preventDefault();
      const { type, data } = cmsModal;
      let finalData = { ...data };

      if (type === 'PROJ') {
          if (typeof finalData.researchers === 'string') {
              finalData.researchers = finalData.researchers.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
          }
          await DB.saveProjects([finalData]);
      } else if (type === 'ANN') {
          await DB.saveAnnouncements([finalData]);
      } else if (type === 'GAL') {
          await DB.saveGallery([finalData]);
      } else if (type === 'FACT') {
          await DB.saveWeeklyFact(finalData);
      }
      setCmsModal({ ...cmsModal, isOpen: false });
      loadData();
      refreshData();
  };

  const handleUpdateAdmin = async () => {
      try {
        const oldId = currentUser.id;
        const updatedProfile = { ...currentUser, id: adminSettings.id, password: adminSettings.password };
        await DB.replaceMember(oldId, updatedProfile);
        setCurrentUser(updatedProfile);
        alert("Admin credentials updated.");
      } catch (e: any) {
          alert(e.message);
      }
  };

  const pendingMembers = members.filter(m => m.status === 'PENDING');
  const activeMembers = members.filter(m => m.status === 'APPROVED' || m.status === 'REJECTED');

  return (
    <div className="pt-24 pb-10 max-w-7xl mx-auto px-4 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Administration Portal</h2>
          <p className="text-gray-400 text-sm">Logged in as {currentUser.name}</p>
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden min-h-[600px] border border-white/10">
        <div className="flex border-b border-white/10 bg-[#0a0f1c]/50">
          <button onClick={() => setActiveTab('MEMBERS')} className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'MEMBERS' ? 'bg-cyan-900/20 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Users size={16} /> Members</button>
          <button onClick={() => setActiveTab('CMS')} className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'CMS' ? 'bg-cyan-900/20 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><LayoutGrid size={16} /> CMS</button>
          <button onClick={() => setActiveTab('SETTINGS')} className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'SETTINGS' ? 'bg-cyan-900/20 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Settings size={16} /> Settings</button>
        </div>

        <div className="p-6">
          {activeTab === 'MEMBERS' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><AlertTriangle size={20} className="text-yellow-500" /> Pending Approvals ({pendingMembers.length})</h3>
                {pendingMembers.length === 0 ? <p className="text-gray-500 italic text-sm">No pending applications.</p> : (
                  <div className="grid gap-4">
                    {pendingMembers.map(m => (
                      <div key={m.id} className="bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col md:flex-row justify-between gap-4">
                         <div>
                            <p className="font-bold text-white">{m.name}</p>
                            <p className="text-xs text-gray-400">Class: {m.class} | Roll: {m.roll} | Mob: {m.mobile}</p>
                            <p className="text-xs text-gray-500 mt-1">Applied: {new Date(m.joinedDate).toLocaleDateString()}</p>
                         </div>
                         <div className="flex items-center gap-2">
                           {approveId === m.id ? (
                             <div className="flex items-center gap-2">
                               <input type="text" placeholder="Assign ID" className="bg-black/30 border border-gray-600 rounded px-2 py-1 text-white text-sm w-32" value={newMemberId} onChange={(e) => setNewMemberId(e.target.value)} />
                               <button onClick={() => handleApprove(m)} className="p-2 bg-green-600 rounded hover:bg-green-500"><CheckCircle size={16}/></button>
                               <button onClick={() => setApproveId(null)} className="p-2 bg-gray-600 rounded hover:bg-gray-500"><XCircle size={16}/></button>
                             </div>
                           ) : (
                              <button onClick={() => setApproveId(m.id)} className="px-3 py-1 bg-green-600/20 text-green-400 border border-green-600/50 rounded text-sm font-semibold hover:bg-green-600 hover:text-white transition-colors">Approve</button>
                           )}
                         </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                 <h3 className="text-lg font-semibold text-white mb-4">All Members ({activeMembers.length})</h3>
                 <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm text-gray-400">
                     <thead className="bg-white/5 text-gray-200 font-semibold uppercase text-xs">
                       <tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Action</th></tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                       {activeMembers.map(m => (
                         <tr key={m.id} className="hover:bg-white/5 transition-colors">
                           <td className="px-4 py-4 font-mono text-cyan-400">{m.id}</td>
                           <td className="px-4 py-4 font-medium text-white">{m.name}</td>
                           <td className="px-4 py-4">{m.status}</td>
                           <td className="px-4 py-4">{m.role}</td>
                           <td className="px-4 py-4 flex gap-2">
                             {m.role !== 'ADMIN' && (
                               <>
                                <button onClick={() => setEditingMember(m)} className="text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-1"><Edit size={12} /> Edit</button>
                                <button onClick={() => handleToggleStatus(m)} className="text-yellow-400 hover:text-yellow-300 px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/30">{m.status === 'APPROVED' ? 'Disable' : 'Enable'}</button>
                               </>
                             )}
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'CMS' && (
             <div className="space-y-6">
               <div className="flex gap-4 border-b border-white/5 pb-4">
                  {['PROJECTS', 'ANNOUNCEMENTS', 'GALLERY', 'FACT'].map(v => (
                      <button key={v} onClick={() => setCmsView(v as any)} className={`px-3 py-1 rounded text-xs font-bold ${cmsView === v ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-400'}`}>{v}</button>
                  ))}
               </div>
               {cmsView !== 'FACT' && (
                 <div className="flex justify-end">
                     <button onClick={() => openCmsModal(cmsView as any)} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold"><Plus size={16}/> Add New</button>
                 </div>
               )}
               
               <div className="grid grid-cols-1 gap-4">
                  {cmsView === 'PROJECTS' && projects.map(p => (
                      <div key={p.id} className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
                          <div><p className="font-bold text-white">{p.title}</p><p className="text-xs text-cyan-400">{p.status}</p></div>
                          <div className="flex gap-2">
                             <button onClick={() => openCmsModal('PROJ', p)} className="text-cyan-400 hover:text-white p-2"><Edit size={16}/></button>
                             <button onClick={() => deleteItem('PROJ', p.id)} className="text-red-400 hover:text-white p-2"><Trash2 size={16}/></button>
                          </div>
                      </div>
                  ))}
                  {cmsView === 'ANNOUNCEMENTS' && announcements.map(a => (
                      <div key={a.id} className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
                          <div><p className="font-bold text-white">{a.title}</p><p className="text-xs text-gray-400">{a.date} - {a.type}</p></div>
                           <div className="flex gap-2">
                             <button onClick={() => openCmsModal('ANN', a)} className="text-cyan-400 hover:text-white p-2"><Edit size={16}/></button>
                             <button onClick={() => deleteItem('ANN', a.id)} className="text-red-400 hover:text-white p-2"><Trash2 size={16}/></button>
                          </div>
                      </div>
                  ))}
                  {cmsView === 'GALLERY' && gallery.map(g => (
                      <div key={g.id} className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-3"><img src={g.image} className="w-10 h-10 object-cover rounded" /><p className="font-bold text-white">{g.title}</p></div>
                           <div className="flex gap-2">
                             <button onClick={() => openCmsModal('GAL', g)} className="text-cyan-400 hover:text-white p-2"><Edit size={16}/></button>
                             <button onClick={() => deleteItem('GAL', g.id)} className="text-red-400 hover:text-white p-2"><Trash2 size={16}/></button>
                          </div>
                      </div>
                  ))}
                  {cmsView === 'FACT' && (
                     <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                         <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-white text-xl">Current Weekly Fact</h3>
                            <button onClick={() => openCmsModal('FACT', weeklyFact)} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold"><Edit size={16}/> Edit Fact</button>
                         </div>
                         <div className="bg-black/20 p-4 rounded border border-white/5">
                            <p className="font-bold text-cyan-400 mb-2">{weeklyFact.title}</p>
                            <p className="text-gray-300">{weeklyFact.content}</p>
                         </div>
                     </div>
                  )}
               </div>
             </div>
          )}

          {activeTab === 'SETTINGS' && (
            <div className="max-w-xl mx-auto py-10">
               <h3 className="text-xl font-bold text-white mb-6 text-center">Admin Security Settings</h3>
               <div className="space-y-4">
                  <div>
                      <label className="block text-sm text-gray-400 mb-1">Admin ID</label>
                      <input type="text" value={adminSettings.id} onChange={e => setAdminSettings({...adminSettings, id: e.target.value})} className="w-full bg-black/30 border border-gray-700 rounded px-4 py-2 text-white" />
                  </div>
                  <div>
                      <label className="block text-sm text-gray-400 mb-1">New Password</label>
                      <input type="text" value={adminSettings.password} onChange={e => setAdminSettings({...adminSettings, password: e.target.value})} className="w-full bg-black/30 border border-gray-700 rounded px-4 py-2 text-white" />
                  </div>
                  <button onClick={handleUpdateAdmin} className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg font-bold mt-4">Update Credentials</button>
               </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Member Edit Modal */}
      <Modal isOpen={!!editingMember} onClose={() => setEditingMember(null)} title="Edit Member Details">
        {editingMember && (
            <form onSubmit={handleSaveMemberChanges} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs text-gray-400">Name</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.name} onChange={e => setEditingMember({...editingMember, name: e.target.value})} /></div>
                    <div><label className="text-xs text-gray-400">Class</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.class} onChange={e => setEditingMember({...editingMember, class: e.target.value})} /></div>
                    <div><label className="text-xs text-gray-400">Roll</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.roll} onChange={e => setEditingMember({...editingMember, roll: e.target.value})} /></div>
                    <div><label className="text-xs text-gray-400">Mobile</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.mobile} onChange={e => setEditingMember({...editingMember, mobile: e.target.value})} /></div>
                    <div><label className="text-xs text-gray-400">Father Name</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.fatherName} onChange={e => setEditingMember({...editingMember, fatherName: e.target.value})} /></div>
                    <div><label className="text-xs text-gray-400">Mother Name</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.motherName} onChange={e => setEditingMember({...editingMember, motherName: e.target.value})} /></div>
                    <div><label className="text-xs text-gray-400">Blood Group</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.bloodGroup} onChange={e => setEditingMember({...editingMember, bloodGroup: e.target.value})} /></div>
                    <div><label className="text-xs text-gray-400">DOB</label><input type="date" className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.dob} onChange={e => setEditingMember({...editingMember, dob: e.target.value})} /></div>
                    <div className="col-span-2"><label className="text-xs text-gray-400">Birth Certificate No</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.birthCertNo || ''} onChange={e => setEditingMember({...editingMember, birthCertNo: e.target.value})} /></div>
                </div>
                <div><label className="text-xs text-gray-400">Present Address</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.presentAddress} onChange={e => setEditingMember({...editingMember, presentAddress: e.target.value})} /></div>
                <div><label className="text-xs text-gray-400">Permanent Address</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={editingMember.permanentAddress} onChange={e => setEditingMember({...editingMember, permanentAddress: e.target.value})} /></div>
                
                <div className="flex justify-end pt-4"><button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold">Save Changes</button></div>
            </form>
        )}
      </Modal>

      {/* CMS Edit Modal */}
      <Modal isOpen={cmsModal.isOpen} onClose={() => setCmsModal({...cmsModal, isOpen: false})} title={cmsModal.data && projects.find(p => p.id === cmsModal.data.id) ? "Edit Content" : (cmsModal.type === 'FACT' ? "Edit Weekly Fact" : "Add/Edit Content")}>
         {cmsModal.isOpen && cmsModal.data && (
             <form onSubmit={handleSaveCms} className="space-y-4">
                 {/* Project Form */}
                 {cmsModal.type === 'PROJ' && (
                     <>
                        <div><label className="text-xs text-gray-400">Title</label><input required className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.title} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, title: e.target.value}})} /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-xs text-gray-400">Status</label><select className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.status} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, status: e.target.value}})}><option value="ONGOING">ONGOING</option><option value="COMPLETED">COMPLETED</option><option value="UPCOMING">UPCOMING</option></select></div>
                            <div><label className="text-xs text-gray-400">Image URL</label><input className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.image} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, image: e.target.value}})} /></div>
                        </div>
                        <div><label className="text-xs text-gray-400">Description</label><textarea className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white h-24" value={cmsModal.data.description} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, description: e.target.value}})} /></div>
                        <div>
                            <label className="text-xs text-gray-400">Researchers (comma separated)</label>
                            <input 
                                className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" 
                                value={cmsModal.data.researchers} 
                                onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, researchers: e.target.value}})}
                                placeholder="e.g. John Doe, Jane Smith"
                            />
                        </div>
                     </>
                 )}
                 {/* Announcement Form */}
                 {cmsModal.type === 'ANN' && (
                     <>
                        <div><label className="text-xs text-gray-400">Title</label><input required className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.title} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, title: e.target.value}})} /></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div><label className="text-xs text-gray-400">Date</label><input type="date" required className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.date} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, date: e.target.value}})} /></div>
                            <div><label className="text-xs text-gray-400">Type</label><select className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.type} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, type: e.target.value}})}><option value="PUBLIC">PUBLIC</option><option value="INTERNAL">INTERNAL</option></select></div>
                            <div><label className="text-xs text-gray-400">Priority</label><select className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.priority} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, priority: e.target.value}})}><option value="NORMAL">NORMAL</option><option value="HIGH">HIGH</option></select></div>
                        </div>
                        <div><label className="text-xs text-gray-400">Description</label><textarea required className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white h-24" value={cmsModal.data.description} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, description: e.target.value}})} /></div>
                     </>
                 )}
                 {/* Gallery Form */}
                 {cmsModal.type === 'GAL' && (
                     <>
                        <div><label className="text-xs text-gray-400">Title</label><input required className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.title} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, title: e.target.value}})} /></div>
                        <div className="grid grid-cols-2 gap-4">
                             <div><label className="text-xs text-gray-400">Category</label><select className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.category} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, category: e.target.value}})}><option value="Event">Event</option><option value="Experiment">Experiment</option><option value="Competition">Competition</option></select></div>
                             <div><label className="text-xs text-gray-400">Image URL</label><input required className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.image} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, image: e.target.value}})} /></div>
                        </div>
                     </>
                 )}
                 {/* Weekly Fact Form */}
                 {cmsModal.type === 'FACT' && (
                     <>
                        <div><label className="text-xs text-gray-400">Title / Question</label><input required className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white" value={cmsModal.data.title} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, title: e.target.value}})} /></div>
                        <div><label className="text-xs text-gray-400">Content / Answer</label><textarea required className="w-full bg-black/20 border border-gray-700 rounded p-2 text-white h-32" value={cmsModal.data.content} onChange={e => setCmsModal({...cmsModal, data: {...cmsModal.data, content: e.target.value}})} /></div>
                     </>
                 )}
                 <div className="flex justify-end pt-4"><button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold">Save Content</button></div>
             </form>
         )}
      </Modal>
    </div>
  );
};

// 8. LOGIN VIEW (Unified)
const LoginView: React.FC<{ onSuccess: (user: Member) => void }> = ({ onSuccess }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [creds, setCreds] = useState({ id: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Updated to use Async DB fetch
    const member = await DB.findMember(creds.id);

    if (!member || member.password !== creds.password) {
      setError('Invalid Credentials');
      return;
    }

    if (isAdminMode && member.role !== 'ADMIN') {
      setError('Access Denied: Not an Admin Account');
      return;
    }

    if (member.status === 'PENDING') {
      setError('Your application is still pending approval.');
      return;
    }

    if (member.status === 'REJECTED') {
      setError('Account Disabled/Rejected.');
      return;
    }

    onSuccess(member);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="glass-panel p-8 rounded-xl w-full max-w-md border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-300">
        <div className={`absolute top-0 left-0 w-full h-1 ${isAdminMode ? 'bg-red-500' : 'bg-cyan-500'}`} />

        <div className="text-center mb-8">
           <h2 className="text-2xl font-bold text-white mb-1">{isAdminMode ? 'Admin Portal' : 'Member Login'}</h2>
           <p className="text-gray-400 text-sm">{isAdminMode ? 'Restricted System Access' : 'Access your dashboard'}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
           <div>
             <label className="block text-sm text-gray-400 mb-2">{isAdminMode ? 'Admin ID' : 'Member ID'}</label>
             <input type="text" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500" value={creds.id} onChange={(e) => setCreds({...creds, id: e.target.value})} placeholder={isAdminMode ? "Admin ID" : "Enter Member ID"} />
           </div>
           <div>
             <label className="block text-sm text-gray-400 mb-2">Password</label>
             <input type="password" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500" value={creds.password} onChange={(e) => setCreds({...creds, password: e.target.value})} placeholder="Enter password" />
           </div>

           {error && <p className="text-red-400 text-xs text-center bg-red-500/10 py-2 rounded border border-red-500/20">{error}</p>}
           
           <button type="submit" className={`w-full text-white font-bold py-3 rounded-lg transition-all ${isAdminMode ? 'bg-red-600 hover:bg-red-500' : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/20'}`}>
             {isAdminMode ? 'Admin Login' : 'Login'}
           </button>
        </form>

        <div className="mt-6 text-center border-t border-white/5 pt-4">
            <button 
                onClick={() => { setIsAdminMode(!isAdminMode); setError(''); setCreds({id:'', password:''}); }}
                className={`text-xs font-bold uppercase tracking-wider ${isAdminMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-red-400 hover:text-red-300'}`}
            >
                {isAdminMode ? '← Back to Member Login' : 'Switch to Admin Login'}
            </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  
  // Data State
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [weeklyFact, setWeeklyFact] = useState<WeeklyFact>({ id: 0, title: '', content: '' });

  const refreshAllData = async () => {
    setAnnouncements(await DB.getAnnouncements());
    setProjects(await DB.getProjects());
    setGallery(await DB.getGallery());
    setMembers(await DB.getMembers());
    setWeeklyFact(await DB.getWeeklyFact());
  };

  useEffect(() => {
    // Initial Load
    refreshAllData();
  }, []); // Run once on mount

  useEffect(() => {
    // Re-fetch data if view changes (e.g. going back to Dashboard)
    refreshAllData();
    window.scrollTo(0, 0);
  }, [currentView, currentUser]);

  return (
    <div className="min-h-screen bg-[#050b14] text-gray-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#050b14] to-[#050b14]"></div>
      </div>

      {currentView !== View.LOGIN_ADMIN && currentView !== View.LOGIN_MEMBER && (
        <Navbar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          currentUser={currentUser}
          onLogout={() => { setCurrentUser(null); setCurrentView(View.HOME); }}
        />
      )}

      <main className="flex-grow z-10 relative">
        {currentView === View.HOME && <HeroSection setView={setCurrentView} announcements={announcements} />}
        {currentView === View.PROJECTS && <ProjectsView projects={projects} />}
        {currentView === View.GALLERY && <GalleryView gallery={gallery} />}
        {currentView === View.MEMBERS && <MembersView members={members} currentUser={currentUser} />}
        {currentView === View.REGISTER && <RegisterView onSuccess={() => setCurrentView(View.HOME)} />}

        {(currentView === View.LOGIN_MEMBER || currentView === View.LOGIN_ADMIN) && (
          <LoginView onSuccess={(user) => { 
              setCurrentUser(user); 
              setCurrentView(user.role === 'ADMIN' ? View.DASHBOARD_ADMIN : View.DASHBOARD_MEMBER); 
          }} />
        )}

        {currentView === View.DASHBOARD_MEMBER && currentUser && <MemberDashboard member={currentUser} weeklyFact={weeklyFact} />}
        {currentView === View.DASHBOARD_ADMIN && currentUser && <AdminDashboard currentUser={currentUser} setCurrentUser={setCurrentUser} refreshData={refreshAllData} />}
      </main>

      {currentView !== View.LOGIN_ADMIN && currentView !== View.LOGIN_MEMBER && currentView !== View.DASHBOARD_ADMIN && (
        <Footer setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default App;
