import siteSettings from "../../../content/site-settings.json";
import SiteSettingsEditor from "./SiteSettingsEditor";

export default function AdminSettings() {
  return <SiteSettingsEditor initialSettings={siteSettings} />;
}
