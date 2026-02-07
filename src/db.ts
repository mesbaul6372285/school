import { supabase } from './lib/supabase';
import { Member, Project, Announcement, GalleryItem, WeeklyFact } from './types';

// This file acts as the bridge between your App and Supabase.

export const DB = {
  // --- INITIALIZATION (Optional Check) ---
  init: async () => {
    // We can leave this empty or use it to log a connection success
    console.log('Supabase DB initialized');
  },

  // --- MEMBER MANAGEMENT ---

  // 1. Get All Members
  getMembers: async (): Promise<Member[]> => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return (data as Member[]) || [];
  },
  
  // 2. Add a New Member (Registration)
  saveMember: async (member: Member) => {
    // Check if ID exists to avoid duplicates (Supabase throws error anyway, but good for safety)
    const { error } = await supabase
      .from('members')
      .insert([member]);
      
    if (error) throw new Error(error.message);
  },

  // 3. Update an Existing Member
  updateMember: async (updatedMember: Member) => {
    const { error } = await supabase
      .from('members')
      .update(updatedMember)
      .eq('id', updatedMember.id);

    if (error) throw new Error(error.message);
  },

  // 4. Replace Member ID (Used when Admin approves and assigns a real ID)
  replaceMember: async (oldId: string, newMember: Member) => {
    // Strategy: Insert the NEW record first. If successful, delete the OLD one.
    // This prevents losing data if the insert fails.
    
    // Step 1: Insert New
    const { error: insertError } = await supabase
      .from('members')
      .insert([newMember]);

    if (insertError) throw new Error(`Failed to create new ID: ${insertError.message}`);

    // Step 2: Delete Old (Only if Step 1 succeeded)
    const { error: deleteError } = await supabase
      .from('members')
      .delete()
      .eq('id', oldId);

    if (deleteError) {
      console.error("Warning: Created new member but failed to delete old temp record.");
    }
  },

  // 5. Delete Member
  deleteMember: async (id: string) => {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },

  // 6. Find Single Member (Login)
  findMember: async (id: string): Promise<Member | undefined> => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined; // Return undefined if not found/error
    return data as Member;
  },

  // --- CMS CONTENT (Projects, Announcements, Gallery) ---

  // Projects
  getProjects: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: false }); // Show newest first
    
    if (error) return [];
    return (data as Project[]);
  },

  saveProjects: async (projects: Project[]) => {
    // Supabase upsert can handle an array of items to update/insert at once
    const { error } = await supabase
      .from('projects')
      .upsert(projects, { onConflict: 'id' });
      
    if (error) throw new Error(error.message);
  },

  // Announcements
  getAnnouncements: async (): Promise<Announcement[]> => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) return [];
    return (data as Announcement[]);
  },

  saveAnnouncements: async (announcements: Announcement[]) => {
    const { error } = await supabase
      .from('announcements')
      .upsert(announcements, { onConflict: 'id' });
    if (error) throw new Error(error.message);
  },

  // Gallery
  getGallery: async (): Promise<GalleryItem[]> => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) return [];
    return (data as GalleryItem[]);
  },

  saveGallery: async (galleryItems: GalleryItem[]) => {
    const { error } = await supabase
      .from('gallery')
      .upsert(galleryItems, { onConflict: 'id' });
    if (error) throw new Error(error.message);
  },

  // Weekly Fact
  getWeeklyFact: async (): Promise<WeeklyFact> => {
    const { data, error } = await supabase
      .from('weekly_fact')
      .select('*')
      .limit(1)
      .single();
    
    // Fallback if DB is empty
    if (error || !data) {
       return { id: 0, title: "Welcome!", content: "Science facts will appear here." };
    }
    return data as WeeklyFact;
  },

  saveWeeklyFact: async (data: WeeklyFact) => {
    // We remove 'id' from the data if it's 0 or undefined to let Supabase auto-generate/handle it
    // But since we are Upserting, we generally want to match the ID.
    // Logic: We usually only have ONE row for weekly fact in this simple app.
    
    // Simple fix: Always update the row with ID 1, or just upsert whatever is passed.
    const { error } = await supabase
      .from('weekly_fact')
      .upsert(data);
    
    if (error) throw new Error(error.message);
  },
};
