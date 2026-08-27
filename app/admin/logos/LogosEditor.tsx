"use client";

import LogoGridEditor from "../_shared/LogoGridEditor";

type Logo = { src: string; alt: string; heightPx: number; invert?: boolean };

export default function LogosEditor({ initialItems }: { initialItems: Logo[] }) {
  return (
    <LogoGridEditor
      initialItems={initialItems}
      title="Speaking Logos"
      contextLabel="Collection — used on Speaking page"
      publishPath="content/collections/speaking-logos.json"
      publishMessage="Update Speaking Logos via Studio"
      showInvert
      defaultHeightPx={44}
      footerNote={'Order determines which logos are the first 12 shown before the mobile/tablet "Show more" toggle.'}
    />
  );
}
