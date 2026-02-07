import { supabase } from './lib/supabase';
import { Member, Project, Announcement, GalleryItem, WeeklyFact } from './types';

// Helper to map DB snake_case columns to camelCase if needed,
// but since we defined columns in Supabase carefully, they match mostly.
// Note: Supabase returns data matching the column names.

export const DB = {
  // Init is no longer needed with Supabase, but keeping empty for compatibility
  init: async () => {
    // Optional: Check connection
    const { error } = await supabase.from('members').select('count', { count: 'exact', head: true });
    if (error) console.error('Supabase connection error:', error);
  },

  // --- MEMBERS ---

  getMembers: async (): Promise<Member[]> => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching members:', error);
      return [];
    }
    return data as Member[];
  },
  
  saveMember: async (member: Member) => {
    // Check if ID exists to decide Insert vs Update
    const { data: existing } = await supabase
      .from('members')
      .select('id')
      .eq('id', member.id)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('members')
        .update(member)
        .eq('id', member.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('members')
        .insert([member]);
      if (error) throw error;
    }
  },

  updateMember: async (updatedMember: Member) => {
    const { error } = await supabase
      .from('members')
      .update(updatedMember)
      .eq('id', updatedMember.id);

    if (error) throw error;
  },

  // Important: Supabase doesn't allow changing Primary Key easily.
  // We delete the old record and insert a new one.
  replaceMember: async (oldId: string, newMember: Member) => {
    // 1. Delete old
    const { error: delError } = await supabase
      .from('members')
      .delete()
      .eq('id', oldId);
    
    if (delError) throw delError;

    // 2. Insert new
    const { error: insError } = await supabase
      .from('members')
      .insert([newMember]);
    
    if (insError) throw insError;
  },

  deleteMember: async (id: string) => {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  findMember: async (id: string): Promise<Member | undefined> => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return undefined;
    return data as Member;
  },

  // --- CMS CONTENT ---

  getProjects: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: false }); // Using ID for ordering as proxy for time
    
    if (error) return [];
    return data as Project[];
  },

  saveProjects: async (projects: Project[]) => {
    // In the App.tsx logic, saveProjects receives the FULL array.
    // This is inefficient for Supabase. We should update specific items.
    // However, to keep compatibility with your App.tsx logic:
    // We will upsert (insert or update) each project.
    
    const { error } = await supabase
      .from('projects')
      .upsert(projects, { onConflict: 'id' });
      
    if (error) throw error;
  },

  getAnnouncements: async (): Promise<Announcement[]> => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) return [];
    return data as Announcement[];
  },

  saveAnnouncements: async (announcements: Announcement[]) => {
    const { error } = await supabase
      .from('announcements')
      .upsert(announcements, { onConflict: 'id' });
    if (error) throw error;
  },

  getGallery: async (): Promise<GalleryItem[]> => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) return [];
    return data as GalleryItem[];
  },

  saveGallery: async (galleryItems: GalleryItem[]) => {
    const { error } = await supabase
      .from('gallery')
      .upsert(galleryItems, { onConflict: 'id' });
    if (error) throw error;
  },

  getWeeklyFact: async (): Promise<WeeklyFact> => {
    const { data, error } = await supabase
      .from('weekly_fact')
      .select('*')
      .order('id', { ascending: false }) // Get latest
      .limit(1)
      .single();
    
    if (error || !data) {
       return { id: 0, title: "Weekly Fact", content: "Loading..." };
    }
    return data as WeeklyFact;
  },

  saveWeeklyFact: async (data: WeeklyFact) => {
    // If it has an ID, update it, otherwise insert
    const { error } = await supabase
      .from('weekly_fact')
      .upsert(data);
    
    if (error) throw error;
  },
};
