export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: string
          created_at: string
          name: string
          role: string
          status: string
          class: string
          roll: string
          mobile: string
          fatherName: string | null
          motherName: string | null
          presentAddress: string | null
          permanentAddress: string | null
          birthCertNo: string | null
          dob: string | null
          bloodGroup: string | null
          password: string
        }
        Insert: {
          id?: string // Allow setting ID manually or default
          created_at?: string
          name: string
          role?: string
          status?: string
          class: string
          roll: string
          mobile: string
          fatherName?: string | null
          motherName?: string | null
          presentAddress?: string | null
          permanentAddress?: string | null
          birthCertNo?: string | null
          dob?: string | null
          bloodGroup?: string | null
          password?: string
        }
        Update: Partial<Database['public']['Tables']['members']['Insert']>
      }
      projects: {
        Row: {
          id: number
          created_at: string
          title: string
          description: string | null
          image: string | null
          status: string
          researchers: string[]
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          description?: string | null
          image?: string | null
          status: string
          researchers: string[]
        }
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      announcements: {
        Row: {
          id: number
          created_at: string
          title: string
          description: string | null
          date: string
          type: string
          priority: string
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          description?: string | null
          date: string
          type: string
          priority: string
        }
        Update: Partial<Database['public']['Tables']['announcements']['Insert']>
      }
      gallery: {
        Row: {
          id: number
          created_at: string
          title: string
          image: string
          category: string
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          image: string
          category: string
        }
        Update: Partial<Database['public']['Tables']['gallery']['Insert']>
      }
      weekly_fact: {
        Row: {
          id: number
          created_at: string
          title: string
          content: string
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          content: string
        }
        Update: Partial<Database['public']['Tables']['weekly_fact']['Insert']>
      }
    }
  }
}
