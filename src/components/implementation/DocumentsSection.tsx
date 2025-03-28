
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DocumentsSectionProps {
  handoverProtocolFile?: string;
  commissioningProtocolFile?: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DocumentsSection({
  handoverProtocolFile,
  commissioningProtocolFile,
  handleFileChange,
}: DocumentsSectionProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="handover_protocol_file">Übergabeprotokoll</Label>
        <div className="flex gap-2 items-center">
          <Input
            id="handover_protocol_file"
            name="handover_protocol_file"
            type="file"
            className="flex-1"
            onChange={handleFileChange}
          />
          {handoverProtocolFile && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => window.open(handoverProtocolFile, '_blank')}
            >
              Anzeigen
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="commissioning_protocol_file">Inbetriebnahmeprotokoll</Label>
        <div className="flex gap-2 items-center">
          <Input
            id="commissioning_protocol_file"
            name="commissioning_protocol_file"
            type="file"
            className="flex-1"
            onChange={handleFileChange}
          />
          {commissioningProtocolFile && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => window.open(commissioningProtocolFile, '_blank')}
            >
              Anzeigen
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
