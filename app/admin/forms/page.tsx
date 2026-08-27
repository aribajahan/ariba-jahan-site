import forms from "../../../content/collections/forms.json";
import FormsEditor from "./FormsEditor";

export default function AdminForms() {
  return <FormsEditor initialForms={forms} />;
}
