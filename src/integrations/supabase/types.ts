export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      cms_allowed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          note: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          note?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          note?: string | null
        }
        Relationships: []
      }
      nav_items: {
        Row: {
          created_at: string
          href: string | null
          id: string
          is_published: boolean
          label: string
          parent_key: string | null
          section: string
          sort_order: number
          to_path: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          href?: string | null
          id?: string
          is_published?: boolean
          label: string
          parent_key?: string | null
          section?: string
          sort_order?: number
          to_path?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          href?: string | null
          id?: string
          is_published?: boolean
          label?: string
          parent_key?: string | null
          section?: string
          sort_order?: number
          to_path?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      news_posts: {
        Row: {
          body: string
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean
          published_at: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          body?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          published_at?: string
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          published_at?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_jsonld_issues: {
        Row: {
          id: string
          message: string
          path: string
          run_id: string
          schema_types: string[]
          severity: string
        }
        Insert: {
          id?: string
          message: string
          path: string
          run_id: string
          schema_types?: string[]
          severity?: string
        }
        Update: {
          id?: string
          message?: string
          path?: string
          run_id?: string
          schema_types?: string[]
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_jsonld_issues_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "seo_jsonld_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_jsonld_runs: {
        Row: {
          id: string
          notes: string | null
          pages_failed: number
          pages_passed: number
          pages_total: number
          source: string
          started_at: string
          target: string
        }
        Insert: {
          id?: string
          notes?: string | null
          pages_failed?: number
          pages_passed?: number
          pages_total?: number
          source?: string
          started_at?: string
          target: string
        }
        Update: {
          id?: string
          notes?: string | null
          pages_failed?: number
          pages_passed?: number
          pages_total?: number
          source?: string
          started_at?: string
          target?: string
        }
        Relationships: []
      }
      seo_page_checks: {
        Row: {
          checked_at: string
          coverage_state: string | null
          crawled_as: string | null
          google_canonical: string | null
          id: string
          in_sitemap: boolean
          indexing_state: string | null
          last_crawl_time: string | null
          page_fetch_state: string | null
          page_url: string
          raw: Json | null
          rich_results_verdict: string | null
          robots_txt_state: string | null
          site_url: string
          source: string
          user_canonical: string | null
          verdict: string | null
        }
        Insert: {
          checked_at?: string
          coverage_state?: string | null
          crawled_as?: string | null
          google_canonical?: string | null
          id?: string
          in_sitemap?: boolean
          indexing_state?: string | null
          last_crawl_time?: string | null
          page_fetch_state?: string | null
          page_url: string
          raw?: Json | null
          rich_results_verdict?: string | null
          robots_txt_state?: string | null
          site_url: string
          source?: string
          user_canonical?: string | null
          verdict?: string | null
        }
        Update: {
          checked_at?: string
          coverage_state?: string | null
          crawled_as?: string | null
          google_canonical?: string | null
          id?: string
          in_sitemap?: boolean
          indexing_state?: string | null
          last_crawl_time?: string | null
          page_fetch_state?: string | null
          page_url?: string
          raw?: Json | null
          rich_results_verdict?: string | null
          robots_txt_state?: string | null
          site_url?: string
          source?: string
          user_canonical?: string | null
          verdict?: string | null
        }
        Relationships: []
      }
      seo_sitemap_snapshots: {
        Row: {
          captured_at: string
          errors: number
          id: string
          indexed_urls: number
          is_pending: boolean
          last_downloaded: string | null
          last_submitted: string | null
          notes: string | null
          site_url: string
          sitemap_url: string
          source: string
          submitted_urls: number
          warnings: number
        }
        Insert: {
          captured_at?: string
          errors?: number
          id?: string
          indexed_urls?: number
          is_pending?: boolean
          last_downloaded?: string | null
          last_submitted?: string | null
          notes?: string | null
          site_url: string
          sitemap_url: string
          source?: string
          submitted_urls?: number
          warnings?: number
        }
        Update: {
          captured_at?: string
          errors?: number
          id?: string
          indexed_urls?: number
          is_pending?: boolean
          last_downloaded?: string | null
          last_submitted?: string | null
          notes?: string | null
          site_url?: string
          sitemap_url?: string
          source?: string
          submitted_urls?: number
          warnings?: number
        }
        Relationships: []
      }
      slider_slides: {
        Row: {
          alt_text: string
          caption: string | null
          created_at: string
          id: string
          image_url: string
          is_published: boolean
          link_to: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          alt_text?: string
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_published?: boolean
          link_to?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          alt_text?: string
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_published?: boolean
          link_to?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      soc_controls: {
        Row: {
          category: string
          code: string
          created_at: string
          description: string | null
          evidence: string | null
          id: string
          last_reviewed_at: string | null
          next_review_at: string | null
          owner: string | null
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          code: string
          created_at?: string
          description?: string | null
          evidence?: string | null
          id?: string
          last_reviewed_at?: string | null
          next_review_at?: string | null
          owner?: string | null
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string
          description?: string | null
          evidence?: string | null
          id?: string
          last_reviewed_at?: string | null
          next_review_at?: string | null
          owner?: string | null
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      soc_csp_violations: {
        Row: {
          blocked_uri: string | null
          document_uri: string | null
          effective_directive: string | null
          id: string
          line_number: number | null
          occurrences: number
          reported_at: string
          source_file: string | null
          user_agent: string | null
          violated_directive: string | null
        }
        Insert: {
          blocked_uri?: string | null
          document_uri?: string | null
          effective_directive?: string | null
          id?: string
          line_number?: number | null
          occurrences?: number
          reported_at?: string
          source_file?: string | null
          user_agent?: string | null
          violated_directive?: string | null
        }
        Update: {
          blocked_uri?: string | null
          document_uri?: string | null
          effective_directive?: string | null
          id?: string
          line_number?: number | null
          occurrences?: number
          reported_at?: string
          source_file?: string | null
          user_agent?: string | null
          violated_directive?: string | null
        }
        Relationships: []
      }
      soc_route_checks: {
        Row: {
          created_at: string
          failures: Json
          headers: Json
          id: string
          passed: boolean
          path: string
          response_ms: number | null
          run_id: string
          status_code: number | null
        }
        Insert: {
          created_at?: string
          failures?: Json
          headers?: Json
          id?: string
          passed?: boolean
          path: string
          response_ms?: number | null
          run_id: string
          status_code?: number | null
        }
        Update: {
          created_at?: string
          failures?: Json
          headers?: Json
          id?: string
          passed?: boolean
          path?: string
          response_ms?: number | null
          run_id?: string
          status_code?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "soc_route_checks_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "soc_scan_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      soc_scan_runs: {
        Row: {
          created_at: string
          csp_violations: number
          engines: string[]
          finished_at: string | null
          id: string
          notes: string | null
          routes_failed: number
          routes_passed: number
          routes_total: number
          source: string
          started_at: string
          target: string
        }
        Insert: {
          created_at?: string
          csp_violations?: number
          engines?: string[]
          finished_at?: string | null
          id?: string
          notes?: string | null
          routes_failed?: number
          routes_passed?: number
          routes_total?: number
          source?: string
          started_at?: string
          target: string
        }
        Update: {
          created_at?: string
          csp_violations?: number
          engines?: string[]
          finished_at?: string | null
          id?: string
          notes?: string | null
          routes_failed?: number
          routes_passed?: number
          routes_total?: number
          source?: string
          started_at?: string
          target?: string
        }
        Relationships: []
      }
      soc_uptime_samples: {
        Row: {
          checked_at: string
          id: string
          is_up: boolean
          path: string
          response_ms: number | null
          status_code: number | null
          target: string
        }
        Insert: {
          checked_at?: string
          id?: string
          is_up?: boolean
          path: string
          response_ms?: number | null
          status_code?: number | null
          target: string
        }
        Update: {
          checked_at?: string
          id?: string
          is_up?: boolean
          path?: string
          response_ms?: number | null
          status_code?: number | null
          target?: string
        }
        Relationships: []
      }
      soc_web_vitals: {
        Row: {
          device: string | null
          id: string
          metric: string
          path: string
          rating: string | null
          recorded_at: string
          value: number
        }
        Insert: {
          device?: string | null
          id?: string
          metric: string
          path: string
          rating?: string | null
          recorded_at?: string
          value: number
        }
        Update: {
          device?: string | null
          id?: string
          metric?: string
          path?: string
          rating?: string | null
          recorded_at?: string
          value?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
    },
  },
} as const
