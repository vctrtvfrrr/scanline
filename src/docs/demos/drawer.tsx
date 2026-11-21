import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Example } from "@/docs/kit/example";

const HISTORY = [400, 300, 200, 300, 200, 278, 189, 239, 300, 200, 278, 189, 349];
const BARS = " ▁▂▃▄▅▆▇█";

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="text-3xl leading-none tracking-[0.1em] text-accent-ink">
      {values.map((v) => BARS[Math.round((v / max) * (BARS.length - 1))]).join("")}
    </div>
  );
}

export default function DrawerDemo() {
  const [goal, setGoal] = React.useState(350);
  return (
    <Example title="directions">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">move goal (bottom)</Button>
        </DrawerTrigger>
        <DrawerContent label="activity">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="flex items-center justify-center gap-4 px-[2ch]">
              <Button variant="outline" size="icon" onClick={() => setGoal((g) => Math.max(200, g - 10))} disabled={goal <= 200} aria-label="Decrease">
                <Minus />
              </Button>
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold tabular-nums">{goal}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">calories/day</div>
              </div>
              <Button variant="outline" size="icon" onClick={() => setGoal((g) => Math.min(400, g + 10))} disabled={goal >= 400} aria-label="Increase">
                <Plus />
              </Button>
            </div>
            <div className="mt-4 flex justify-center px-[2ch]">
              <Sparkline values={HISTORY} />
            </div>
            <DrawerFooter>
              <Button>submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      {(["right", "left", "top"] as const).map((direction) => (
        <Drawer key={direction} direction={direction}>
          <DrawerTrigger asChild>
            <Button variant="secondary">{direction}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{direction} drawer</DrawerTitle>
              <DrawerDescription>Slides in from the {direction}. Drag or press esc to dismiss.</DrawerDescription>
            </DrawerHeader>
            <div className="px-[2ch] text-muted-foreground">
              <pre>{"┌──────────────┐\n│   content    │\n└──────────────┘"}</pre>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </Example>
  );
}
