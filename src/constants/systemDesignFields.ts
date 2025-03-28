
import { FieldConfig } from "@/hooks/useFormProgress";

export const systemDesignFormFields: FieldConfig[] = [
  { name: "heat_pump_type", required: true },
  { name: "heating_capacity_planned", required: true },
  { name: "cop" },
  { name: "estimated_spf" },
  { name: "heat_source", required: true },
  { name: "electricity_tariff" },
  { name: "space_requirements_met" },
  { name: "sound_requirements_met" },
  { name: "permissions_required" },
];

export const heatPumpTypes = ["Luft/Wasser", "Sole/Wasser", "Wasser/Wasser"];
export const heatSources = ["Luft", "Erdkollektor", "Erdsonde", "Grundwasser", "Abwasser", "Abwärme"];
export const electricityTariffs = ["HT/NT", "PV", "Direktverbrauch", "Dynamisch"];
export const permissionStatuses = ["Ja", "Nein", "Unklar"];
