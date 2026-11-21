import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Example } from "@/docs/kit/example";

const COMPONENTS = [
  { title: "Alert Dialog", href: "#/dialog", description: "A modal dialog that interrupts the user with important content." },
  { title: "Hover Card", href: "#/popover", description: "Preview content available behind a link." },
  { title: "Progress", href: "#/progress", description: "Displays an indicator showing the completion progress of a task." },
  { title: "Tabs", href: "#/tabs", description: "Layered sections of content displayed one at a time." },
];

export default function MenubarDemo() {
  return (
    <>
      <Example title="menubar" contentClassName="block">
        <div className="border border-border-strong bg-surface">
          <Menubar className="px-px">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent className="w-56">
                <MenubarItem>
                  new tab <MenubarShortcut>^T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  new window <MenubarShortcut>^N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>new incognito window</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>email link</MenubarItem>
                    <MenubarItem>messages</MenubarItem>
                    <MenubarItem>notes</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  print... <MenubarShortcut>^P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent className="w-52">
                <MenubarItem>
                  undo <MenubarShortcut>^Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  redo <MenubarShortcut>⇧^Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>cut</MenubarItem>
                <MenubarItem>copy</MenubarItem>
                <MenubarItem>paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent className="w-60">
                <MenubarCheckboxItem>always show bookmarks bar</MenubarCheckboxItem>
                <MenubarCheckboxItem checked>always show full urls</MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  reload <MenubarShortcut>^R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset disabled>
                  force reload
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Profiles</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value="benoit">
                  <MenubarRadioItem value="andy">andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">benoit</MenubarRadioItem>
                  <MenubarRadioItem value="luis">luis</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>add profile...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <div className="h-24 border-t border-border-strong bg-background p-[1ch] text-muted-foreground">
            <span className="text-accent-ink">~</span> <span className="animate-blink bg-accent text-accent">_</span>
          </div>
        </div>
      </Example>
      <Example title="navigation menu" contentClassName="block min-h-64">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-px md:w-[56ch] md:grid-cols-[0.8fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink href="#/" className="h-full justify-end border border-border-strong bg-surface-2 p-[2ch]">
                      <span className="text-lg font-bold">▌scanline</span>
                      <span className="text-muted-foreground">TUI-flavoured components built with Radix and Tailwind.</span>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#/">
                      <span className="font-bold">introduction</span>
                      <span className="text-muted-foreground">Re-usable components you can copy and paste.</span>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#/typography">
                      <span className="font-bold">typography</span>
                      <span className="text-muted-foreground">Styles for headings, paragraphs, lists.</span>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#/forms">
                      <span className="font-bold">forms</span>
                      <span className="text-muted-foreground">Inputs, selects, switches and validation.</span>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-px md:w-[60ch] md:grid-cols-2">
                  {COMPONENTS.map((c) => (
                    <li key={c.title}>
                      <NavigationMenuLink href={c.href}>
                        <span className="font-bold">{c.title}</span>
                        <span className="line-clamp-2 text-muted-foreground">{c.description}</span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#/tables" className={navigationMenuTriggerStyle}>
                docs
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Example>
    </>
  );
}
