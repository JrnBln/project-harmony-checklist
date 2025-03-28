export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      implementation: {
        Row: {
          commissioning_protocol_file: string | null
          construction_progress_documented: boolean | null
          created_at: string | null
          customer_instruction_done: boolean | null
          electricity_meter_data: number | null
          handover_protocol_file: string | null
          heat_meter_data: number | null
          id: string
          monitoring_activated: boolean | null
          project_id: string | null
          regulation_performed: boolean | null
          updated_at: string | null
        }
        Insert: {
          commissioning_protocol_file?: string | null
          construction_progress_documented?: boolean | null
          created_at?: string | null
          customer_instruction_done?: boolean | null
          electricity_meter_data?: number | null
          handover_protocol_file?: string | null
          heat_meter_data?: number | null
          id?: string
          monitoring_activated?: boolean | null
          project_id?: string | null
          regulation_performed?: boolean | null
          updated_at?: string | null
        }
        Update: {
          commissioning_protocol_file?: string | null
          construction_progress_documented?: boolean | null
          created_at?: string | null
          customer_instruction_done?: boolean | null
          electricity_meter_data?: number | null
          handover_protocol_file?: string | null
          heat_meter_data?: number | null
          id?: string
          monitoring_activated?: boolean | null
          project_id?: string | null
          regulation_performed?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "implementation_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      operation: {
        Row: {
          created_at: string | null
          fault_messages: string | null
          id: string
          maintenance_contract_signed: boolean | null
          monitoring_active: boolean | null
          project_id: string | null
          spf_realized_first_year: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          fault_messages?: string | null
          id?: string
          maintenance_contract_signed?: boolean | null
          monitoring_active?: boolean | null
          project_id?: string | null
          spf_realized_first_year?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          fault_messages?: string | null
          id?: string
          maintenance_contract_signed?: boolean | null
          monitoring_active?: boolean | null
          project_id?: string | null
          spf_realized_first_year?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "operation_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          building_type: Database["public"]["Enums"]["building_type"] | null
          client: string | null
          construction_year: number | null
          created_at: string | null
          enddate: string | null
          id: string
          location: string | null
          manager: string | null
          name: string
          notes: string | null
          previous_energy_source:
            | Database["public"]["Enums"]["energy_source"]
            | null
          progress: number | null
          project_goal: string | null
          renovation_status:
            | Database["public"]["Enums"]["renovation_status"]
            | null
          startdate: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          building_type?: Database["public"]["Enums"]["building_type"] | null
          client?: string | null
          construction_year?: number | null
          created_at?: string | null
          enddate?: string | null
          id?: string
          location?: string | null
          manager?: string | null
          name: string
          notes?: string | null
          previous_energy_source?:
            | Database["public"]["Enums"]["energy_source"]
            | null
          progress?: number | null
          project_goal?: string | null
          renovation_status?:
            | Database["public"]["Enums"]["renovation_status"]
            | null
          startdate?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          building_type?: Database["public"]["Enums"]["building_type"] | null
          client?: string | null
          construction_year?: number | null
          created_at?: string | null
          enddate?: string | null
          id?: string
          location?: string | null
          manager?: string | null
          name?: string
          notes?: string | null
          previous_energy_source?:
            | Database["public"]["Enums"]["energy_source"]
            | null
          progress?: number | null
          project_goal?: string | null
          renovation_status?:
            | Database["public"]["Enums"]["renovation_status"]
            | null
          startdate?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      system_design: {
        Row: {
          cop: number | null
          created_at: string | null
          electricity_tariff:
            | Database["public"]["Enums"]["electricity_tariff"]
            | null
          estimated_spf: number | null
          heat_pump_type: Database["public"]["Enums"]["heat_pump_type"] | null
          heat_source: Database["public"]["Enums"]["heat_source"] | null
          heating_capacity_planned: number | null
          id: string
          permissions_required:
            | Database["public"]["Enums"]["permission_status"]
            | null
          project_id: string | null
          sound_requirements_met: boolean | null
          space_requirements_met: boolean | null
          updated_at: string | null
        }
        Insert: {
          cop?: number | null
          created_at?: string | null
          electricity_tariff?:
            | Database["public"]["Enums"]["electricity_tariff"]
            | null
          estimated_spf?: number | null
          heat_pump_type?: Database["public"]["Enums"]["heat_pump_type"] | null
          heat_source?: Database["public"]["Enums"]["heat_source"] | null
          heating_capacity_planned?: number | null
          id?: string
          permissions_required?:
            | Database["public"]["Enums"]["permission_status"]
            | null
          project_id?: string | null
          sound_requirements_met?: boolean | null
          space_requirements_met?: boolean | null
          updated_at?: string | null
        }
        Update: {
          cop?: number | null
          created_at?: string | null
          electricity_tariff?:
            | Database["public"]["Enums"]["electricity_tariff"]
            | null
          estimated_spf?: number | null
          heat_pump_type?: Database["public"]["Enums"]["heat_pump_type"] | null
          heat_source?: Database["public"]["Enums"]["heat_source"] | null
          heating_capacity_planned?: number | null
          id?: string
          permissions_required?:
            | Database["public"]["Enums"]["permission_status"]
            | null
          project_id?: string | null
          sound_requirements_met?: boolean | null
          space_requirements_met?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_design_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      technical_data: {
        Row: {
          buffer_tank_available: boolean | null
          created_at: string | null
          drill_access: Database["public"]["Enums"]["drill_access"] | null
          grid_connection_capacity: number | null
          heat_demand_estimated: number | null
          heating_load_calculated: number | null
          heating_surfaces:
            | Database["public"]["Enums"]["heating_surface"]
            | null
          hot_water_integrated: boolean | null
          id: string
          indoor_unit_space_available: boolean | null
          number_of_units: number | null
          outdoor_unit_space_available: boolean | null
          project_id: string | null
          three_phase_connection: boolean | null
          updated_at: string | null
        }
        Insert: {
          buffer_tank_available?: boolean | null
          created_at?: string | null
          drill_access?: Database["public"]["Enums"]["drill_access"] | null
          grid_connection_capacity?: number | null
          heat_demand_estimated?: number | null
          heating_load_calculated?: number | null
          heating_surfaces?:
            | Database["public"]["Enums"]["heating_surface"]
            | null
          hot_water_integrated?: boolean | null
          id?: string
          indoor_unit_space_available?: boolean | null
          number_of_units?: number | null
          outdoor_unit_space_available?: boolean | null
          project_id?: string | null
          three_phase_connection?: boolean | null
          updated_at?: string | null
        }
        Update: {
          buffer_tank_available?: boolean | null
          created_at?: string | null
          drill_access?: Database["public"]["Enums"]["drill_access"] | null
          grid_connection_capacity?: number | null
          heat_demand_estimated?: number | null
          heating_load_calculated?: number | null
          heating_surfaces?:
            | Database["public"]["Enums"]["heating_surface"]
            | null
          hot_water_integrated?: boolean | null
          id?: string
          indoor_unit_space_available?: boolean | null
          number_of_units?: number | null
          outdoor_unit_space_available?: boolean | null
          project_id?: string | null
          three_phase_connection?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technical_data_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      building_type: "EFH" | "MFH" | "Gewerbe" | "Industrie"
      drill_access: "möglich" | "eingeschränkt" | "nicht möglich"
      electricity_tariff: "HT/NT" | "PV" | "Direktverbrauch" | "Dynamisch"
      energy_source: "Gas" | "Öl" | "Fernwärme" | "Strom" | "Sonstiges"
      heat_pump_type: "Luft/Wasser" | "Sole/Wasser" | "Wasser/Wasser"
      heat_source:
        | "Luft"
        | "Erdkollektor"
        | "Erdsonde"
        | "Grundwasser"
        | "Abwasser"
        | "Abwärme"
      heating_surface: "Radiatoren" | "FBH" | "Wandheizung" | "Gemischt"
      permission_status: "Ja" | "Nein" | "Unklar"
      renovation_status: "unsaniert" | "teilsaniert" | "vollsaniert"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
