
export type BuildingType = 'EFH' | 'MFH' | 'Gewerbe' | 'Industrie';
export type RenovationStatus = 'unsaniert' | 'teilsaniert' | 'vollsaniert';
export type EnergySource = 'Gas' | 'Öl' | 'Fernwärme' | 'Strom' | 'Sonstiges';
export type HeatingSurface = 'Radiatoren' | 'FBH' | 'Wandheizung' | 'Gemischt';
export type DrillAccess = 'möglich' | 'eingeschränkt' | 'nicht möglich';
export type HeatPumpType = 'Luft/Wasser' | 'Sole/Wasser' | 'Wasser/Wasser';
export type HeatSource = 'Luft' | 'Erdkollektor' | 'Erdsonde' | 'Grundwasser' | 'Abwasser' | 'Abwärme';
export type ElectricityTariff = 'HT/NT' | 'PV' | 'Direktverbrauch' | 'Dynamisch';
export type PermissionStatus = 'Ja' | 'Nein' | 'Unklar';

export interface ProjectExtended {
  id: string;
  name: string;
  status: string;
  startdate: string; // Changed from startDate to match DB column
  enddate: string;   // Changed from endDate to match DB column
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
  created_at: string;
  updated_at: string;
}

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

export interface Operation {
  id: string;
  project_id: string;
  maintenance_contract_signed: boolean;
  monitoring_active: boolean;
  spf_realized_first_year?: number;
  fault_messages?: string;
  created_at: string;
  updated_at: string;
}
