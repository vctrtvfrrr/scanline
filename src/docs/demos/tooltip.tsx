import { Bold, Italic, Plus, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Example } from "@/docs/kit/example";

export default function TooltipDemo() {
  return (
    <>
      <Example title="sides">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="outline">{side}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>tooltip on the {side}</TooltipContent>
          </Tooltip>
        ))}
      </Example>
      <Example title="toolbar with shortcuts">
        <ButtonGroup>
          {[
            { icon: Bold, label: "bold", kbd: "^B" },
            { icon: Italic, label: "italic", kbd: "^I" },
            { icon: Underline, label: "underline", kbd: "^U" },
          ].map(({ icon: Icon, label, kbd }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon" aria-label={label}>
                  <Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {label} <Kbd className="ml-[1ch] border-background/30 bg-transparent text-background shadow-none">{kbd}</Kbd>
              </TooltipContent>
            </Tooltip>
          ))}
        </ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" aria-label="Add to library">
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>add to library</TooltipContent>
        </Tooltip>
      </Example>
    </>
  );
}
