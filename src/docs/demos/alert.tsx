import { CircleAlert, CircleCheck, Info, Terminal, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Example, Stack } from "@/docs/kit/example";

export default function AlertDemo() {
  return (
    <Example title="variants">
      <Stack className="max-w-[80ch]">
        <Alert>
          <Terminal />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
        </Alert>
        <Alert variant="info">
          <Info />
          <AlertTitle>info: new version available</AlertTitle>
          <AlertDescription>scanline v0.2.0 ships a new File Tree with git status markers.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <CircleCheck />
          <AlertTitle>ok: build finished in 1.42s</AlertTitle>
          <AlertDescription>42 modules transformed · 0 errors · 0 warnings</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <TriangleAlert />
          <AlertTitle>warn: disk usage at 87%</AlertTitle>
          <AlertDescription>Consider pruning old docker images before the next deploy.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>error: unable to process your payment</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-['-_']">
              <li>check your card details</li>
              <li>ensure sufficient funds</li>
            </ul>
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertTitle>No icon</AlertTitle>
          <AlertDescription>Alerts work without an icon as well.</AlertDescription>
        </Alert>
      </Stack>
    </Example>
  );
}
