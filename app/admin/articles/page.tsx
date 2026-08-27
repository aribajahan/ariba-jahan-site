import { allArticles } from "../../data/articles";
import ArticlesEditor from "./ArticlesEditor";

export default function AdminArticles() {
  return <ArticlesEditor initialItems={allArticles} />;
}
