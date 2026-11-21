import { CircleCheck } from "lucide-react";
import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Example } from "@/docs/kit/example";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "en-US", label: "English (US)" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
  { value: "ja", label: "日本語" },
];

type Errors = Partial<Record<"username" | "email" | "bio" | "terms", string>>;

function Field({ label, htmlFor, error, hint, children, className }: { label: string; htmlFor?: string; error?: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid content-start gap-1", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <span className="text-xs text-red-ink">✗ {error}</span> : hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}

function ProfileForm() {
  const [errors, setErrors] = React.useState<Errors>({});
  const [language, setLanguage] = React.useState("pt-BR");
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    const username = String(data.get("username") ?? "");
    if (username.length < 3) next.username = "username must be at least 3 characters";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? ""))) next.email = "enter a valid email address";
    if (String(data.get("bio") ?? "").length > 160) next.bio = "bio must be at most 160 characters";
    if (!data.get("terms")) next.terms = "you must accept the terms";
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
    if (Object.keys(next).length === 0) toast.success("Profile updated", { description: `@${username} · ${language}` });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-2xl">
      <Card label="profile.toml" labelEnd={submitted ? <span className="text-green-ink">saved</span> : <span className="text-yellow-ink">unsaved</span>}>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is how others will see you on the site.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="username" htmlFor="f-username" error={errors.username} hint="your public display name">
              <Input id="f-username" name="username" placeholder="shadcn" aria-invalid={!!errors.username} />
            </Field>
            <Field label="email" htmlFor="f-email" error={errors.email}>
              <Input id="f-email" name="email" type="email" placeholder="you@example.com" aria-invalid={!!errors.email} />
            </Field>
            <Field label="role">
              <Select name="role" defaultValue="engineer">
                <SelectTrigger aria-label="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineer">engineer</SelectItem>
                  <SelectItem value="designer">designer</SelectItem>
                  <SelectItem value="manager">manager</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="language">
              <Combobox options={LANGUAGES} value={language} onValueChange={setLanguage} className="w-full" />
            </Field>
          </div>
          <Field label="bio" htmlFor="f-bio" error={errors.bio} hint="max. 160 characters">
            <Textarea id="f-bio" name="bio" placeholder="I own a computer." aria-invalid={!!errors.bio} />
          </Field>
          <Separator variant="dashed" label="notifications" />
          <div className="grid gap-4 sm:grid-cols-2">
            <RadioGroup name="notify" defaultValue="mentions" aria-label="notify me about">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">notify me about</span>
              {["all new messages", "direct messages and mentions", "nothing"].map((v, i) => (
                <Label key={v}>
                  <RadioGroupItem value={["all", "mentions", "none"][i]} /> {v}
                </Label>
              ))}
            </RadioGroup>
            <div className="grid content-start gap-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">email</span>
              {["communication emails", "marketing emails", "security emails"].map((label, i) => (
                <Label key={label} className="justify-between">
                  {label}
                  <Switch name={label} defaultChecked={i !== 1} disabled={i === 2} />
                </Label>
              ))}
            </div>
          </div>
          <Field label="" error={errors.terms}>
            <Label>
              <Checkbox name="terms" aria-invalid={!!errors.terms} /> I accept the terms of service
            </Label>
          </Field>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="reset" variant="ghost" onClick={() => setErrors({})}>
            reset
          </Button>
          <Button type="submit">update profile</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default function FormsExample() {
  return (
    <>
      <Example title="profile settings" description="Client-side validation with inline errors. Submit empty to see them." contentClassName="block">
        <ProfileForm />
      </Example>
      <Example title="inline · horizontal" contentClassName="block">
        <form onSubmit={(e) => e.preventDefault()} className="grid max-w-xl gap-2">
          {[
            ["host", "127.0.0.1"],
            ["port", "5432"],
            ["database", "scanline_dev"],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[12ch_1fr] items-center">
              <Label htmlFor={`conn-${label}`} className="text-muted-foreground">
                {label.padEnd(10, ".")}:
              </Label>
              <Input id={`conn-${label}`} defaultValue={value} />
            </div>
          ))}
          <div className="grid grid-cols-[12ch_1fr]">
            <span />
            <div className="flex gap-2">
              <Button size="sm" type="submit">
                connect
              </Button>
              <Button size="sm" variant="bracket" type="button" onClick={() => toast.info("Testing connection...")}>
                test
              </Button>
            </div>
          </div>
        </form>
      </Example>
      <Example title="newsletter" contentClassName="block">
        <Alert variant="success" className="mb-3 max-w-xl">
          <CircleCheck />
          <AlertTitle>No spam, ever.</AlertTitle>
          <AlertDescription>One email per release. Unsubscribe anytime.</AlertDescription>
        </Alert>
        <form onSubmit={(e) => e.preventDefault()} className="flex max-w-xl gap-2">
          <Input type="email" placeholder="you@example.com" aria-label="email" />
          <Button type="submit">subscribe</Button>
        </form>
      </Example>
    </>
  );
}
