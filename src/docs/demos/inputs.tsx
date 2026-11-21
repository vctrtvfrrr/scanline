import { Search } from "lucide-react";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Input, PromptInput, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Example } from "@/docs/kit/example";

export default function InputsDemo() {
  return (
    <>
      <Example title="input" contentClassName="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid content-start gap-1">
          <Label htmlFor="in-email">email</Label>
          <Input id="in-email" type="email" placeholder="you@example.com" />
        </div>
        <div className="grid content-start gap-1">
          <Label htmlFor="in-file">file</Label>
          <Input id="in-file" type="file" />
        </div>
        <div className="grid content-start gap-1">
          <Label htmlFor="in-invalid">invalid</Label>
          <Input id="in-invalid" aria-invalid defaultValue="not-an-email" />
          <span className="text-xs text-red-ink">✗ must be a valid email</span>
        </div>
        <div className="grid content-start gap-1">
          <Label htmlFor="in-disabled">disabled</Label>
          <Input id="in-disabled" disabled placeholder="read only" />
        </div>
        <div className="grid content-start gap-1">
          <Label htmlFor="in-prompt">prompt input</Label>
          <PromptInput id="in-prompt" placeholder="run a command" />
        </div>
        <div className="grid content-start gap-1">
          <Label htmlFor="in-search">with addon</Label>
          <ButtonGroup className="w-full shadow-none">
            <ButtonGroupText>
              <Search />
            </ButtonGroupText>
            <Input id="in-search" placeholder="search..." />
          </ButtonGroup>
        </div>
      </Example>
      <Example title="textarea" contentClassName="block max-w-xl">
        <div className="grid content-start gap-1">
          <Label htmlFor="in-msg">commit message</Label>
          <Textarea id="in-msg" placeholder={"feat: describe your change\n\nwhy it matters..."} />
          <span className="text-xs text-muted-foreground">0/72 · first line is the subject</span>
        </div>
      </Example>
      <Example title="select" contentClassName="items-start gap-6">
        <div className="grid w-56 content-start gap-1">
          <Label>fruit</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>fruits</SelectLabel>
                {["apple", "banana", "blueberry", "grapes", "pineapple"].map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>vegetables</SelectLabel>
                <SelectItem value="carrot">carrot</SelectItem>
                <SelectItem value="potato" disabled>
                  potato
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-56 content-start gap-1">
          <Label>timezone</Label>
          <Select defaultValue="brt">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brt">America/Sao_Paulo (BRT)</SelectItem>
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="cet">Europe/Berlin (CET)</SelectItem>
              <SelectItem value="jst">Asia/Tokyo (JST)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Example>
      <Example title="switch" contentClassName="grid gap-2">
        <Label>
          <Switch defaultChecked /> airplane mode
        </Label>
        <Label>
          <Switch /> wi-fi
        </Label>
        <Label>
          <Switch disabled /> bluetooth (disabled)
        </Label>
      </Example>
    </>
  );
}
