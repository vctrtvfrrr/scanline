import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Example } from "@/docs/kit/example";

export default function DialogDemo() {
  return (
    <Example title="dialogs">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">edit profile</Button>
        </DialogTrigger>
        <DialogContent label="edit profile" className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-[10ch_1fr] items-center gap-2">
              <Label htmlFor="dlg-name">name</Label>
              <Input id="dlg-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid grid-cols-[10ch_1fr] items-center gap-2">
              <Label htmlFor="dlg-user">username</Label>
              <Input id="dlg-user" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">cancel</Button>
            </DialogClose>
            <Button type="submit">save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">delete repository</Button>
        </DialogTrigger>
        <DialogContent label="confirm" className="border-red/70 sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-[1ch] text-red-ink">
              <TriangleAlert className="size-4" /> Are you absolutely sure?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete <span className="text-foreground">scanline/web</span> and remove all of its data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="bracket">no, cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">yes, delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">about</Button>
        </DialogTrigger>
        <DialogContent label="about" className="sm:max-w-sm">
          <DialogHeader className="items-center text-center">
            <DialogTitle>scanline v0.1.0</DialogTitle>
            <DialogDescription>TUI-flavoured components for the web.</DialogDescription>
          </DialogHeader>
          <pre className="text-center text-xs text-muted-foreground">{"(c) 2026 · MIT licensed\nbuilt with bun + react + vite"}</pre>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button>  ok  </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>
  );
}
