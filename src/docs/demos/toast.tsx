import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Example } from "@/docs/kit/example";

export default function ToastDemo() {
  return (
    <Example title="types" description="Toasts are rendered by sonner with the TUI skin applied through classNames.">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2026 at 9:00 AM",
            action: { label: "undo", onClick: () => toast("Undone") },
          })
        }
      >
        default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Build finished", { description: "42 modules transformed in 1.42s" })}>
        success
      </Button>
      <Button variant="outline" onClick={() => toast.info("New version available", { description: "scanline v0.2.0" })}>
        info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Disk usage at 87%")}>
        warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Connection refused", { description: "ECONNREFUSED 127.0.0.1:5432" })}>
        error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: "Deploying to production...",
            success: "Deployed!",
            error: "Deploy failed",
          })
        }
      >
        promise
      </Button>
    </Example>
  );
}
