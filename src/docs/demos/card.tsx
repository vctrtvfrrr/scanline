import { Cpu, Ellipsis, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Example } from "@/docs/kit/example";

export default function CardDemo() {
  return (
    <>
      <Example title="login form" contentClassName="items-start">
        <Card label="login" labelEnd="1/2" className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>Enter your email below to continue.</CardDescription>
            <CardAction>
              <Button variant="link" size="sm">
                sign up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid content-start gap-1">
              <Label htmlFor="card-email">email</Label>
              <Input id="card-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid content-start gap-1">
              <Label htmlFor="card-password">password</Label>
              <Input id="card-password" type="password" placeholder="••••••••" />
            </div>
            <Label>
              <Checkbox /> remember me
            </Label>
          </CardContent>
          <CardFooter className="flex-col items-stretch">
            <Button>login</Button>
            <Button variant="outline">
              <Mail /> continue with magic link
            </Button>
          </CardFooter>
        </Card>
        <div className="grid w-full max-w-sm gap-6">
          <Card label={<><Cpu /> cpu</>} labelEnd="2s" footerLabel="load avg 1.24 0.98 0.77">
            <CardContent className="grid gap-1 pb-1">
              {[42, 87, 13, 64].map((v, i) => (
                <div key={i} className="flex items-center gap-[1ch]">
                  <span className="w-[3ch] text-muted-foreground">{i}</span>
                  <Progress value={v} tone={v > 80 ? "red" : v > 50 ? "yellow" : "green"} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card label="notification">
            <CardHeader>
              <CardTitle>Deploy #482 succeeded</CardTitle>
              <CardDescription>main · 4f2a9c1 · 2 minutes ago</CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="More">
                  <Ellipsis />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Badge variant="success">production</Badge>
              <Badge variant="outline">1m 12s</Badge>
            </CardContent>
          </Card>
        </div>
      </Example>
    </>
  );
}
