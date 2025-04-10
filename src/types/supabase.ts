
export type BuildingType = 'EFH' | 'MFH' | 'Gewerbe' | 'Industrie';
export type RenovationStatus = 'unsaniert' | 'teilsaniert' | 'vollsaniert';
export type EnergySource = 'Gas' | 'Öl' | 'Fernwärme' | 'Strom' | 'Sonstiges';
export type HeatingSurface = 'Radiatoren' | 'FBH' | 'Wandheizung' | 'Gemischt';
export type DrillAccess = 'möglich' | 'eingeschränkt' | 'nicht möglich';
export type HeatPumpType = 'Luft/Wasser' | 'Sole/Wasser' | 'Wasser/Wasser';
export type HeatSource = 'Luft' | 'Erdkollektor' | 'Erdsonde' | 'Grundwasser' | 'Abwasser' | 'Abwärme';
export type ElectricityTariff = 'HT/NT' | 'PV' | 'Direktverbrauch' | 'Dynamisch';
export type PermissionStatus = 'Ja' | 'Nein' | 'Unklar';
export type UserRole = 'Projektleiter' | 'Techniker' | 'Bauleitung' | 'Betreiber' | 'Kunde';

// Project entity - Central entity with basic data
export interface ProjectExtended {
  id: string;
  name: string;
  status: string;
  startdate: string; // Matches the database column name
  enddate: string;   // Matches the database column name
  manager: string;
  location: string;
  client: string;
  notes: string;
  progress: number;
  building_type?: BuildingType;
  construction_year?: number;
  renovation_status?: RenovationStatus;
  previous_energy_source?: EnergySource;
  project_goal?: string;
  created_at: string;
  updated_at: string;
}

// Technical data entity - 1:1 relationship with Project
export interface TechnicalData {
  id: string;
  project_id: string;
  heating_load_calculated?: number;
  heat_demand_estimated?: number;
  number_of_units?: number;
  heating_surfaces?: HeatingSurface;
  buffer_tank_available: boolean;
  hot_water_integrated: boolean;
  grid_connection_capacity?: number;
  three_phase_connection: boolean;
  indoor_unit_space_available: boolean;
  outdoor_unit_space_available: boolean;
  drill_access?: DrillAccess;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// System design entity - 1:1 relationship with Project
export interface SystemDesign {
  id: string;
  project_id: string;
  heat_pump_type?: HeatPumpType;
  heating_capacity_planned?: number;
  cop?: number;
  estimated_spf?: number;
  heat_source?: HeatSource;
  electricity_tariff?: ElectricityTariff;
  space_requirements_met: boolean;
  sound_requirements_met: boolean;
  permissions_required?: PermissionStatus;
  created_at: string;
  updated_at: string;
}

// Implementation entity - 1:1 relationship with Project
export interface Implementation {
  id: string;
  project_id: string;
  construction_progress_documented: boolean;
  handover_protocol_file?: string;
  commissioning_protocol_file?: string;
  regulation_performed: boolean;
  customer_instruction_done: boolean;
  monitoring_activated: boolean;
  heat_meter_data?: number;
  electricity_meter_data?: number;
  created_at: string;
  updated_at: string;
}

// Operation entity - 1:1 relationship with Project
export interface Operation {
  id: string;
  project_id: string;
  measured_spf?: number;
  measured_cop?: number;
  performance_as_expected?: string;
  monitoring_active: boolean;
  monitoring_system?: string;
  remote_access_configured: boolean;
  maintenance_schedule_set: boolean;
  next_maintenance_date?: string;
  maintenance_provider?: string;
  maintenance_contract_signed?: boolean;
  spf_realized_first_year?: number;
  fault_messages?: string;
  created_at: string;
  updated_at: string;
}

// Checklist item entity - 1:n relationship with Project
export interface ChecklistItem {
  id: string;
  project_id: string;
  category: string;
  description: string;
  status: string;
  responsible?: string;
  due_date?: string;
  completed_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// User role entity for role-based access control
export interface UserRoleAssignment {
  id: string;
  user_id: string;
  project_id: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}
