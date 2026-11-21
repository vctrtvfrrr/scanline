import { Copy, Pencil, Share2, Trash2 } from "lucide-react";
import * as React from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Example } from "@/docs/kit/example";

export default function ContextMenuDemo() {
  const [showHidden, setShowHidden] = React.useState(true);
  const [sort, setSort] = React.useState("name");
  return (
    <Example title="right click the area" contentClassName="block">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-40 w-full max-w-md items-center justify-center border border-dashed border-border-strong text-muted-foreground data-[state=open]:border-accent data-[state=open]:text-accent-ink">
          ┌ right click here ┐
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>file: README.md</ContextMenuLabel>
          <ContextMenuItem>
            <Pencil /> rename <ContextMenuShortcut>F2</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Copy /> duplicate <ContextMenuShortcut>^D</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Share2 /> share
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuItem>copy link</ContextMenuItem>
              <ContextMenuItem>email</ContextMenuItem>
              <ContextMenuItem disabled>slack (offline)</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
            show hidden files
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>sort by</ContextMenuLabel>
          <ContextMenuRadioGroup value={sort} onValueChange={setSort}>
            <ContextMenuRadioItem value="name">name</ContextMenuRadioItem>
            <ContextMenuRadioItem value="size">size</ContextMenuRadioItem>
            <ContextMenuRadioItem value="modified">modified</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <Trash2 /> delete <ContextMenuShortcut>⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Example>
  );
}
