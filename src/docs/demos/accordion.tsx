import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Example } from "@/docs/kit/example";

export default function AccordionDemo() {
  return (
    <>
      <Example title="single · collapsible" contentClassName="block">
        <Accordion type="single" collapsible defaultValue="install" className="max-w-[70ch]">
          <AccordionItem value="install">
            <AccordionTrigger>How do I install scanline?</AccordionTrigger>
            <AccordionContent>
              Copy the component files into <code className="text-accent-ink">src/components/ui</code>, install the peer dependencies and import{" "}
              <code className="text-accent-ink">index.css</code> once.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="a11y">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. Every interactive primitive is built on Radix UI, so focus management, ARIA and keyboard navigation come for free.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="themes">
            <AccordionTrigger>Can I switch themes?</AccordionTrigger>
            <AccordionContent>Toggle the <code className="text-accent-ink">.dark</code> class on the root element. Both Ayu Light and Ayu Dark ship by default.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="disabled" disabled>
            <AccordionTrigger>Disabled item</AccordionTrigger>
            <AccordionContent>You will never see this.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Example>
      <Example title="multiple" contentClassName="block">
        <Accordion type="multiple" defaultValue={["logs", "env"]} className="max-w-[70ch]">
          <AccordionItem value="logs">
            <AccordionTrigger>
              logs <span className="text-muted-foreground">(3 warnings)</span>
            </AccordionTrigger>
            <AccordionContent className="text-xs leading-relaxed">
              <div>
                <span className="text-yellow-ink">WARN</span> deprecated flag --legacy
              </div>
              <div>
                <span className="text-yellow-ink">WARN</span> cache miss for /api/users
              </div>
              <div>
                <span className="text-yellow-ink">WARN</span> slow query (812ms)
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="env">
            <AccordionTrigger>environment</AccordionTrigger>
            <AccordionContent className="text-xs leading-relaxed">
              <div>
                NODE_ENV=<span className="text-green-ink">production</span>
              </div>
              <div>
                PORT=<span className="text-magenta-ink">5173</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Example>
    </>
  );
}
