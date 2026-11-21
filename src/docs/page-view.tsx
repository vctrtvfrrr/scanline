import { CodeView } from "@/docs/kit/code-view";
import { PageHeader } from "@/docs/kit/page-header";
import type { PageEntry } from "@/docs/registry";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PageView({ page }: { page: PageEntry }) {
  const { Component } = page;
  const path = page.group === "overview" ? (page.slug || "readme") : `${page.group}/${page.slug}`;
  const hasCode = page.usage || page.sources.length > 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-[2ch] py-6 md:px-[4ch]">
      <PageHeader path={path} title={page.title} description={page.description} />
      {hasCode ? (
        <Tabs defaultValue="preview">
          <TabsList numbered>
            <TabsTrigger value="preview">preview</TabsTrigger>
            {page.usage && <TabsTrigger value="usage">usage</TabsTrigger>}
            {page.sources.length > 0 && <TabsTrigger value="source">source</TabsTrigger>}
          </TabsList>
          <TabsContent value="preview" className="flex flex-col gap-6">
            <Component />
          </TabsContent>
          {page.usage && (
            <TabsContent value="usage">
              <CodeView code={page.usage.code} filename={page.usage.filename} />
            </TabsContent>
          )}
          <TabsContent value="source" className="flex flex-col gap-6">
            {page.sources.map((s) => (
              <CodeView key={s.filename} code={s.code} filename={s.filename} />
            ))}
          </TabsContent>
        </Tabs>
      ) : (
        <Component />
      )}
    </div>
  );
}
