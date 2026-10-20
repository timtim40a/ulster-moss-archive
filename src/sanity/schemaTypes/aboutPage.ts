import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
    name: "aboutPage",
    title: "About",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Heading",
            type: "string",
            description: "The large heading at the top of the About page.",
            validation: (rule) => rule.max(80),
        }),
        defineField({
            name: "body",
            title: "Text",
            type: "array",
            description: "The page text. Each box is one paragraph; drag the handles to reorder them.",
            of: [defineArrayMember({ type: "text", rows: 5 })],
        }),
    ],
    preview: { prepare: () => ({ title: "About" }) },
});
