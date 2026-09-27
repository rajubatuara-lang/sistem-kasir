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
      products: {
        Row: {
          id: string
          code: string
          name: string
          category: string
          price: number
          cost: number
          stock: number
          status: 'active' | 'inactive'
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          category: string
          price: number
          cost: number
          stock: number
          status?: 'active' | 'inactive'
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          category?: string
          price?: number
          cost?: number
          stock?: number
          status?: 'active' | 'inactive'
          image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          invoice: string
          date: string
          cashier: string
          items: Json
          subtotal: number
          discount: number
          total: number
          method: 'cash' | 'transfer' | 'qris'
          status: 'completed' | 'void' | 'pending'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invoice: string
          date: string
          cashier: string
          items: Json
          subtotal: number
          discount: number
          total: number
          method: 'cash' | 'transfer' | 'qris'
          status?: 'completed' | 'void' | 'pending'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invoice?: string
          date?: string
          cashier?: string
          items?: Json
          subtotal?: number
          discount?: number
          total?: number
          method?: 'cash' | 'transfer' | 'qris'
          status?: 'completed' | 'void' | 'pending'
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
