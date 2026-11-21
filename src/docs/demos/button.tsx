import { ArrowUp, ChevronDown, GitBranch, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";
import { Example } from "@/docs/kit/example";

export default function ButtonDemo() {
  const [loading, setLoading] = React.useState(false);
  const [view, setView] = React.useState("board");

  return (
    <>
      <Example title="variants">
        <Button>default</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="outline">outline</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="bracket">bracket</Button>
        <Button variant="link">link</Button>
      </Example>
      <Example title="sizes">
        <Button size="sm">small</Button>
        <Button>default</Button>
        <Button size="lg">large</Button>
        <Button size="icon-sm" variant="outline" aria-label="Add">
          <Plus />
        </Button>
        <Button size="icon" variant="outline" aria-label="Scroll to top">
          <ArrowUp />
        </Button>
      </Example>
      <Example title="with icons · states">
        <Button>
          <Save /> save <Kbd className="border-accent-foreground/30 bg-transparent text-accent-foreground shadow-none">^S</Kbd>
        </Button>
        <Button variant="outline">
          <GitBranch /> new branch
        </Button>
        <Button
          variant="secondary"
          disabled={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
        >
          {loading ? <Spinner className="text-foreground" /> : <RefreshCw />}
          {loading ? "syncing..." : "sync"}
        </Button>
        <Button variant="destructive">
          <Trash2 /> delete
        </Button>
        <Button disabled>disabled</Button>
      </Example>
      <Example title="button group">
        <ButtonGroup>
          <Button variant="secondary">archive</Button>
          <Button variant="secondary">report</Button>
          <Button variant="secondary">snooze</Button>
        </ButtonGroup>
        <ButtonGroup>
          {["board", "list", "table"].map((v) => (
            <Button key={v} variant={view === v ? "default" : "secondary"} size="sm" onClick={() => setView(v)} aria-pressed={view === v}>
              {v}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup>
          <Button>merge pull request</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" aria-label="More merge options" className="border-l-accent-foreground/30">
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>create a merge commit</DropdownMenuItem>
              <DropdownMenuItem>squash and merge</DropdownMenuItem>
              <DropdownMenuItem>rebase and merge</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
        <ButtonGroup>
          <ButtonGroupText>https://</ButtonGroupText>
          <Input placeholder="scanline.dev" className="w-40" />
          <Button variant="secondary">go</Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical">
          <Button variant="secondary" size="icon-sm" aria-label="Increase">
            <Plus />
          </Button>
          <Button variant="secondary" size="icon-sm" aria-label="Decrease">
            −
          </Button>
        </ButtonGroup>
      </Example>
    </>
  );
}
