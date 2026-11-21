import { BadgeCheck, GitBranch, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Example } from "@/docs/kit/example";

export default function BadgeDemo() {
  return (
    <>
      <Example title="variants">
        <Badge>default</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="outline">outline</Badge>
        <Badge variant="destructive">destructive</Badge>
        <Badge variant="bracket">bracket</Badge>
      </Example>
      <Example title="status tones">
        <Badge variant="success">done</Badge>
        <Badge variant="warning">in progress</Badge>
        <Badge variant="info">to do</Badge>
        <Badge variant="magenta">review</Badge>
        <Badge variant="cyan">backlog</Badge>
      </Example>
      <Example title="with icons">
        <Badge variant="secondary">
          <BadgeCheck className="text-blue-ink" />
          verified
        </Badge>
        <Badge variant="outline">
          <GitBranch />
          main
        </Badge>
        <Badge variant="info">
          <Tag />
          v0.1.0
        </Badge>
        <Badge className="min-w-[3ch] justify-center tabular-nums">8</Badge>
        <Badge variant="destructive" className="min-w-[3ch] justify-center tabular-nums">
          99+
        </Badge>
      </Example>
    </>
  );
}
