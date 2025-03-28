
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Neuer Checklistenpunkt:", formData);
  };

  return (
    <Card className="max-w-xl mx-auto my-6">
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="kategorie">Kategorie</Label>
            <Select
              value={formData.kategorie}
              onValueChange={(value) => handleSelectChange("kategorie", value)}
            >
              <SelectTrigger id="kategorie">
                <SelectValue placeholder="Kategorie auswählen" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prüfpunkt">Prüfpunkt</Label>
            <Input
              id="prüfpunkt"
              name="prüfpunkt"
              placeholder="Prüfpunkt eingeben"
              value={formData.prüfpunkt}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="pflichtfeld"
              checked={formData.pflichtfeld}
              onCheckedChange={(checked) => 
                handleSelectChange("pflichtfeld", checked === true)
              }
            />
            <Label htmlFor="pflichtfeld">Pflichtfeld</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Status auswählen" />
              </SelectTrigger>
              <SelectContent>
                {["Offen", "In Bearbeitung", "Erledigt", "Blockiert"].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verantwortlich">Verantwortlich</Label>
            <Select
              value={formData.verantwortlich}
              onValueChange={(value) => handleSelectChange("verantwortlich", value)}
            >
              <SelectTrigger id="verantwortlich">
                <SelectValue placeholder="Verantwortlichen auswählen" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="datumGeplant">Geplantes Datum</Label>
            <Input
              id="datumGeplant"
              type="date"
              name="datumGeplant"
              value={formData.datumGeplant}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="datumErledigt">Datum erledigt</Label>
            <Input
              id="datumErledigt"
              type="date"
              name="datumErledigt"
              value={formData.datumErledigt}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bemerkungen">Bemerkungen</Label>
            <Textarea
              id="bemerkungen"
              name="bemerkungen"
              placeholder="Zusätzliche Bemerkungen"
              value={formData.bemerkungen}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="mt-4">Checklistenpunkt speichern</Button>
        </form>
      </CardContent>
    </Card>
  );
}
