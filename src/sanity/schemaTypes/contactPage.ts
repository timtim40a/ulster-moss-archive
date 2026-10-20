import { defineField, defineType } from "sanity";

export const contactPage = defineType({
    name: "contactPage",
    title: "Contact",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Heading",
            type: "string",
            description: "The large heading at the top of the Contact page.",
            validation: (rule) => rule.max(80),
        }),
        defineField({
            name: "intro",
            title: "Introduction",
            type: "text",
            rows: 3,
            description: "The short paragraph under the heading.",
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            description: "Shown in the \"Email\" row. Leave empty to hide the row.",
            validation: (rule) => rule.email(),
        }),
        defineField({
            name: "phone",
            title: "Phone",
            type: "string",
            description: "Shown in the \"Phone\" row. Leave empty to hide the row.",
            validation: (rule) => rule.max(40),
        }),
        defineField({
            name: "address",
            title: "Location",
            type: "string",
            description: "Shown in the \"Location\" row, e.g. \"Donegal coast, Ireland\". Leave empty to hide the row.",
            validation: (rule) => rule.max(120),
        }),
        defineField({
            name: "hours",
            title: "Hours",
            type: "string",
            description: "Shown in the \"Hours\" row, e.g. \"By appointment only\". Leave empty to hide the row.",
            validation: (rule) => rule.max(120),
        }),
        defineField({
            name: "formIntro",
            title: "Form introduction",
            type: "text",
            rows: 2,
            description: "The sentence under \"Send an enquiry\", above the contact form.",
        }),
    ],
    preview: { prepare: () => ({ title: "Contact" }) },
});
