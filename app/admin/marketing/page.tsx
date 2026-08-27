import siteSettings from "../../../content/site-settings.json";
import MarketingToolsEditor from "./MarketingToolsEditor";

export default function AdminMarketing() {
  return <MarketingToolsEditor initialSettings={siteSettings} />;
}
