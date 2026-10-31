import pageSettingsData from "../content/page-settings.json";

export type Availability = "public" | "unlisted" | "password" | "draft";

export type PageSettings = {
  navLabel: string;
  slug: string;
  availability: Availability;
  showFooter: boolean;
};

export type PageKey = keyof typeof pageSettingsData;

export const allPageSettings: Record<string, PageSettings> = pageSettingsData as Record<string, PageSettings>;

export function getPageSettings(key: PageKey): PageSettings {
  return allPageSettings[key];
}
