export type FeedbackField = {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "rating" | "radio";
  required?: boolean;
  optionalLabel?: string;
  placeholder?: string;
  ratingMax?: number;
  options?: { value: string; label: string }[];
};

export type FeedbackFormConfig = {
  id: string;
  title: string;
  introduction: string;
  submitLabel: string;
  fields: FeedbackField[];
};

export const feedbackForms = {
  "ai-advisory": {
    id: "ai-advisory",
    title: "AI advisory feedback",
    introduction:
      "Hi, and thank you for trusting me with your work and taking the time to share your feedback. I would love to know what was useful, what changed in how you’re thinking about the issue we worked through, and what else would be helpful. Every session is informed by the feedback from the one before, so your feedback matters. Filling out the form takes less than 5 minutes.",
    submitLabel: "Send feedback",
    fields: [
      {
        id: "name",
        label: "Name",
        type: "text",
        required: true,
        placeholder: "Your name",
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        id: "overall_usefulness",
        label: "How useful was the session overall?",
        type: "rating",
        required: true,
        ratingMax: 5,
      },
      {
        id: "most_useful",
        label: "What was the most useful part of the session for you?",
        type: "textarea",
        required: true,
      },
      {
        id: "what_became_clearer",
        label: "What feels clearer now than it did before the session?",
        type: "textarea",
        required: true,
      },
      {
        id: "describe_experience",
        label: "What would you tell a friend or colleague who was considering a session with me?",
        type: "textarea",
        required: true,
      },
      {
        id: "could_improve",
        label: "What could I change to make the session more useful?",
        type: "textarea",
        required: true,
      },
      {
        id: "quote_permission",
        label: "May I quote your feedback publicly?",
        type: "radio",
        required: true,
        options: [
          { value: "Full name, title, and organization", label: "Yes, with my full name, title, and organization" },
          { value: "First name and role", label: "Yes, with my first name and role" },
          { value: "Anonymous", label: "Yes, anonymously" },
          { value: "Ask first", label: "Please ask me first" },
          { value: "No", label: "No" },
        ],
      },
    ],
  },
} satisfies Record<string, FeedbackFormConfig>;

export type FeedbackFormId = keyof typeof feedbackForms;
