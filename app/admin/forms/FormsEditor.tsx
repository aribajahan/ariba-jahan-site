"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type Field = { id: string; label: string; type: string; required: boolean };
type ContactForm = { status: string; link: string; accentColor: string; onSubmit: string; fields: Field[] };
type Forms = { contactForm: ContactForm };

export default function FormsEditor({ initialForms }: { initialForms: Forms }) {
  const [forms, setForms] = useState(initialForms);
  const { publish, publishing, result } = usePublish();

  const updateField = (id: string, label: string) => {
    setForms((f) => ({
      ...f,
      contactForm: { ...f.contactForm, fields: f.contactForm.fields.map((field) => (field.id === id ? { ...field, label } : field)) },
    }));
  };

  const handlePublish = () =>
    publish([{ path: "content/collections/forms.json", content: JSON.stringify(forms, null, 2) + "\n" }], "Update Forms via Studio");

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Collection</div>
      <h1 className="text-2xl mb-2">Forms</h1>
      <p className="text-[14px] text-[#888] mb-6">
        One shared Form template, styled the same everywhere. Field labels below are editable and live on the real
        contact form. Adding new fields or changing field types is still a code change, not yet self-service.
      </p>

      <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="bg-[#8EF942] text-[#2D2D2D] text-[10px] font-bold tracking-[0.06em] uppercase px-2 py-[3px] rounded">
            {forms.contactForm.status}
          </span>
          <h3 className="text-[15px] font-semibold flex-1">Contact Form ({forms.contactForm.link})</h3>
          <span className="text-xs text-[#999]">{forms.contactForm.fields.length} fields</span>
        </div>

        <label className="block text-xs font-bold tracking-[0.04em] uppercase text-[#888] mb-2">Fields</label>
        <div className="flex flex-col gap-2 mb-5">
          {forms.contactForm.fields.map((field) => (
            <div key={field.id} className="flex gap-[10px] items-center p-[10px] bg-[#f7f6f4] rounded-md">
              <input
                value={field.label}
                onChange={(e) => updateField(field.id, e.target.value)}
                className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]"
              />
              <span className="text-[11px] text-[#999] whitespace-nowrap">
                {field.type} · {field.required ? "required" : "optional"}
              </span>
            </div>
          ))}
        </div>

        <label className="block text-xs font-bold tracking-[0.04em] uppercase text-[#888] mb-2">Accent Color</label>
        <div className="w-7 h-7 rounded-full mb-5" style={{ background: forms.contactForm.accentColor }} />

        <label className="block text-xs font-bold tracking-[0.04em] uppercase text-[#888] mb-2">On Submit</label>
        <div className="text-[13px] text-[#444] mb-1">{forms.contactForm.onSubmit}</div>
        <div className="text-xs text-[#999]">Submissions are emailed to you via Resend. They&rsquo;re not stored in this CMS, to keep visitor data out of the public repo.</div>
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
