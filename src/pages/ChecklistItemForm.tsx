
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Projektstart",
  "Planung",
  "Technik",
  "Subunternehmer",
  "Ausführung",
  "Abnahme",
  "Abrechnung",
  "Betrieb",
];

const roles = ["Projektleiter", "Subunternehmer", "Technischer Planer", "Kunde"];

export default function ChecklistItemForm() {
  const [formData, setFormData] = useState({
    kategorie: "",
    prüfpunkt: "",
    pflichtfeld: false,
    status: "Offen",
    verantwortlich: "",
    datumGeplant: "",
    datumErledigt: "",
    bemerkungen: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Neuer Checklistenpunkt:", formData);
  };

  return (
    <Card className="max-w-xl mx-auto my-6">
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Select name="kategorie" onChange={handleChange} required>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </Select>

          <Input
            name="prüfpunkt"
            placeholder="Prüfpunkt eingeben"
            value={formData.prüfpunkt}
            onChange={handleChange}
            required
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="pflichtfeld"
              checked={formData.pflichtfeld}
              onChange={handleChange}
            />
            Pflichtfeld
          </label>

          <Select name="status" onChange={handleChange} value={formData.status}>
            {["Offen", "In Bearbeitung", "Erledigt", "Blockiert"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>

          <Select
            name="verantwortlich"
            onChange={handleChange}
            value={formData.verantwortlich}
          >
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="date"
            name="datumGeplant"
            value={formData.datumGeplant}
            onChange={handleChange}
          />

          <Input
            type="date"
            name="datumErledigt"
            value={formData.datumErledigt}
            onChange={handleChange}
          />

          <Textarea
            name="bemerkungen"
            placeholder="Zusätzliche Bemerkungen"
            value={formData.bemerkungen}
            onChange={handleChange}
          />

          <Button type="submit">Checklistenpunkt speichern</Button>
        </form>
      </CardContent>
    </Card>
  );
}
