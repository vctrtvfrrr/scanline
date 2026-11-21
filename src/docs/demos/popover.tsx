import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Example } from "@/docs/kit/example";

export default function PopoverDemo() {
  return (
    <Example title="popover">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Settings2 /> dimensions
          </Button>
        </PopoverTrigger>
        <PopoverContent label="dimensions" align="start" className="w-80">
          <div className="grid gap-3">
            <p className="text-muted-foreground">Set the dimensions for the layer.</p>
            {[
              ["width", "100%"],
              ["max. width", "300px"],
              ["height", "25px"],
              ["max. height", "none"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[12ch_1fr] items-center gap-2">
                <Label htmlFor={`pop-${label}`}>{label}</Label>
                <Input id={`pop-${label}`} defaultValue={value} className="h-6" />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="bracket">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side} className="w-56">
            Popover on the <span className="text-accent-ink">{side}</span>.
          </PopoverContent>
        </Popover>
      ))}
    </Example>
  );
}
