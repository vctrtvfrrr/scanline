import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useTheme } from "@/lib/theme";

function Toaster(props: ToasterProps) {
  const { theme } = useTheme();
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheck className="size-3.5 text-green-ink" />,
        info: <Info className="size-3.5 text-blue-ink" />,
        warning: <TriangleAlert className="size-3.5 text-yellow-ink" />,
        error: <CircleAlert className="size-3.5 text-red-ink" />,
        loading: <Spinner />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group/toast relative flex w-[var(--width)] items-start gap-[1.5ch] border border-border-strong border-l-[3px] border-l-accent bg-surface px-[2ch] py-2 font-mono text-base text-foreground shadow-tui data-[type=success]:border-l-green data-[type=error]:border-l-red data-[type=warning]:border-l-yellow data-[type=info]:border-l-blue",
          icon: "relative mt-[0.2lh] flex size-3.5 shrink-0 items-center justify-center",
          content: "flex flex-1 flex-col gap-0.5",
          title: "font-bold",
          description: "text-muted-foreground",
          actionButton: "ml-auto shrink-0 self-center border border-accent bg-accent px-[1ch] text-xs text-accent-foreground hover:brightness-110",
          cancelButton: "shrink-0 self-center border border-border-strong px-[1ch] text-xs text-muted-foreground hover:text-foreground",
          closeButton: "absolute! top-1! right-1! left-auto! border-0! bg-transparent! text-muted-foreground! hover:text-red-ink! transform-none!",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
export { toast } from "sonner";
