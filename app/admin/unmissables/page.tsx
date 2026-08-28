import tiles from "../../../content/collections/unmissables.json";
import UnmissablesEditor, { type Tile } from "./UnmissablesEditor";

export default function AdminUnmissables() {
  return <UnmissablesEditor initialItems={tiles as Tile[]} />;
}
