import { notFound } from "next/navigation";
import { allPageSettings } from "../../../../lib/pageSettings";
import navVisibility from "../../../../content/nav-visibility.json";
import seo from "../../../../content/seo.json";
import PageSettingsEditor from "./PageSettingsEditor";

export default async function AdminPageSettings({ params }: { params: Promise<{ pageKey: string }> }) {
  const { pageKey } = await params;
  if (!allPageSettings[pageKey]) notFound();

  return (
    <PageSettingsEditor
      pageKey={pageKey}
      allPageSettings={allPageSettings}
      allNavVisibility={navVisibility}
      allSeo={seo}
    />
  );
}
