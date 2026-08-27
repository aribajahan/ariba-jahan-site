import seo from "../../../content/seo.json";
import SeoEditor from "./SeoEditor";

export default function AdminSeo() {
  return <SeoEditor initialSeo={seo} />;
}
