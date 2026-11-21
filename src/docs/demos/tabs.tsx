import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Example } from "@/docs/kit/example";

export default function TabsDemo() {
  return (
    <>
      <Example title="line · numbered" contentClassName="block">
        <Tabs defaultValue="account" className="max-w-lg">
          <TabsList numbered>
            <TabsTrigger value="account">
              <User /> account
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell /> notifications
            </TabsTrigger>
            <TabsTrigger value="billing" disabled>
              billing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Make changes to your account here.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid content-start gap-1">
                  <Label htmlFor="tabs-name">name</Label>
                  <Input id="tabs-name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid content-start gap-1">
                  <Label htmlFor="tabs-username">username</Label>
                  <Input id="tabs-username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="notifications">
            <Card className="bg-background">
              <CardContent className="grid gap-2">
                {["email digests", "push notifications", "mentions only"].map((label, i) => (
                  <Label key={label} className="justify-between">
                    {label}
                    <Switch defaultChecked={i !== 1} />
                  </Label>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Example>
      <Example title="inverted (lazygit style)" contentClassName="block">
        <Tabs defaultValue="status" className="max-w-lg">
          <TabsList variant="inverted" numbered>
            <TabsTrigger value="status">status</TabsTrigger>
            <TabsTrigger value="files">files</TabsTrigger>
            <TabsTrigger value="branches">branches</TabsTrigger>
            <TabsTrigger value="commits">commits</TabsTrigger>
          </TabsList>
          <TabsContent value="status" className="border border-border-strong p-[1ch] text-muted-foreground">
            <span className="text-green-ink">✓</span> working tree clean
          </TabsContent>
          <TabsContent value="files" className="border border-border-strong p-[1ch]">
            <div>
              <span className="text-yellow-ink">M </span> src/index.css
            </div>
            <div>
              <span className="text-green-ink">??</span> src/components/ui/file-tree.tsx
            </div>
          </TabsContent>
          <TabsContent value="branches" className="border border-border-strong p-[1ch]">
            <div className="text-accent-ink">* main</div>
            <div className="text-muted-foreground">  feat/sidebar</div>
          </TabsContent>
          <TabsContent value="commits" className="border border-border-strong p-[1ch]">
            <div>
              <span className="text-yellow-ink">4f2a9c1</span> feat: add file tree
            </div>
            <div>
              <span className="text-yellow-ink">a81bb03</span> chore: initial commit
            </div>
          </TabsContent>
        </Tabs>
      </Example>
    </>
  );
}
