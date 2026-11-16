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
  headingPrimary: string;
  headingAccent: string;
  introduction: string;
  thankYouMessage: string;
  submitLabel: string;
  fields: FeedbackField[];
};

const quotePermissionOptions = [
  { value: "Full name", label: "Yes, with my full name" },
  { value: "First name", label: "Yes, with my first name" },
  { value: "Anonymous", label: "Yes, anonymously" },
  { value: "No", label: "No" },
];

export const feedbackForms = {
  "ai-advisory": {
    id: "ai-advisory",
    title: "AI advisory feedback",
    headingPrimary: "AI Advisory",
    headingAccent: "Feedback",
    introduction:
      "Hi, and thank you for trusting me with your work and taking the time to share your feedback. I’d love to know what was useful, what changed in how you’re thinking about the issue we worked through, and what would have made the session more helpful.\n\nI use what I learn from every session to improve the next one, so your perspective matters. The form takes less than 5 minutes.",
    thankYouMessage:
      "I appreciate you taking the time to share this. I’ll read your feedback closely and use it to make future AI advisory sessions better.",
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
        options: quotePermissionOptions,
      },
    ],
  },
  "build-with-me": {
    id: "build-with-me",
    title: "Build With Me feedback",
    headingPrimary: "Build With Me",
    headingAccent: "Feedback",
    introduction:
      "Thank you for taking the time to tell me how Build With Me worked for you. I’d love to know what you built, what changed in how you use AI, and what would have made the program more useful.\n\nI’ll use what I learn to improve the next cohort. The form takes less than 5 minutes.",
    thankYouMessage:
      "I appreciate you taking the time to share this. I’ll read your feedback closely and use it to improve the next Build With Me cohort.",
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
        label: "How useful was Build With Me overall?",
        type: "rating",
        required: true,
        ratingMax: 5,
      },
      {
        id: "what_built",
        label: "What did you build or make progress on during the program?",
        type: "textarea",
        required: true,
      },
      {
        id: "new_ai_capability",
        label: "What can you do with AI now that you could not do before Build With Me?",
        type: "textarea",
        required: true,
      },
      {
        id: "describe_experience",
        label: "What would you tell a friend or colleague who was considering Build With Me?",
        type: "textarea",
        required: true,
      },
      {
        id: "could_improve",
        label: "What could I change to make the program more useful?",
        type: "textarea",
        required: true,
      },
      {
        id: "quote_permission",
        label: "May I quote your feedback publicly?",
        type: "radio",
        required: true,
        options: quotePermissionOptions,
      },
    ],
  },
  "reading-room": {
    id: "reading-room",
    title: "Reading Room feedback",
    headingPrimary: "Reading Room",
    headingAccent: "Feedback",
    introduction:
      "Thank you for spending time in the Reading Room and taking a few minutes to share what stayed with you. I’d love to know what you’re leaving with and what would have made the session more useful.\n\nI’ll use your feedback to shape future sessions. The form takes about 2 minutes.",
    thankYouMessage:
      "I appreciate you taking the time to share this. I’ll read your feedback closely and use it to shape future Reading Room sessions.",
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
        id: "overall_usefulness",
        label: "How useful was this Reading Room session overall?",
        type: "rating",
        required: true,
        ratingMax: 5,
      },
      {
        id: "leaving_with",
        label: "What idea or question are you leaving the Reading Room with?",
        type: "textarea",
        required: true,
      },
      {
        id: "describe_experience",
        label: "What would you tell a friend or colleague who was considering the Reading Room?",
        type: "textarea",
        required: true,
      },
      {
        id: "could_improve",
        label: "What would have made this session more useful?",
        type: "textarea",
        required: true,
      },
      {
        id: "quote_permission",
        label: "May I quote your feedback publicly?",
        type: "radio",
        required: true,
        options: quotePermissionOptions,
      },
    ],
  },
} satisfies Record<string, FeedbackFormConfig>;

export type FeedbackFormId = keyof typeof feedbackForms;
