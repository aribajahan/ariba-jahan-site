"use client";

import LogoGridEditor from "../_shared/LogoGridEditor";

type Logo = { src: string; alt: string; heightPx: number };

export default function WwmTrustedByEditor({ initialItems }: { initialItems: Logo[] }) {
  return (
    <LogoGridEditor
      initialItems={initialItems}
      title="WWM Trusted By"
      contextLabel="Gallery · used on Work With Me page"
      publishPath="content/collections/wwm-trusted-by.json"
      publishMessage="Update WWM Trusted By via Studio"
      defaultHeightPx={30}
      footerNote="These scroll continuously in the Trusted By marquee. Order sets the starting position."
    />
  );
}
