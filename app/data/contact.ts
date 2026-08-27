// Content data for the Contact page, extracted from design-reference/Contact.dc.html.

export type ContactReason = "speaking" | "advisory" | "career" | "press" | "other";

export const contactPhotoSrc = "/uploads/personal-red-wall-shoes.jpg";

export const reasonOptions: { value: ContactReason; label: string }[] = [
  { value: "speaking", label: "Speaking inquiry" },
  { value: "advisory", label: "CX Sprint / advisory" },
  { value: "career", label: "Career Advisory" },
  { value: "press", label: "Press or media" },
  { value: "other", label: "Something else" },
];

export const speakingFormatOptions = ["Keynote", "Workshop", "Panel", "Fireside chat", "Not sure yet"];

export const speakingBudgetOptions = [
  "Under $5,000",
  "$5,000–$15,000",
  "$15,000–$30,000",
  "$30,000+",
  "Not sure yet, let's discuss",
];

export const advisoryTeamSizeOptions = ["1–10", "11–50", "51–200", "200+"];

export const advisoryTimelineOptions = ["ASAP", "Within a month", "1–3 months out", "Just exploring"];
