import { defineArrayMember, defineField, defineType } from "sanity";

// Text only: the Home page's images and layout are fixed in the code.
export const homePage = defineType({
    name: "homePage",
    title: "Home",
    type: "document",
    fields: [
        defineField({
            name: "heroTitle",
            title: "Opening heading",
            type: "string",
            description: "The large heading of the first section, e.g. \"Traces of Presence around...\".",
            validation: (rule) => rule.max(60),
        }),
        defineField({
            name: "storyIntro",
            title: "Story: first paragraph",
            type: "text",
            rows: 4,
            description: "The first paragraph of the story, next to the opening heading.",
        }),
        defineField({
            name: "storyContinued",
            title: "Story: continued",
            type: "array",
            description:
                "The rest of the story, shown as one block. Each box starts on a new line; drag the handles to reorder them.",
            of: [defineArrayMember({ type: "text", rows: 4 })],
        }),
        defineField({
            name: "hashtags",
            title: "Hashtags",
            type: "array",
            description: "The tags above the second heading. Type the word only, e.g. \"IrishArt\"; the # is added for you.",
            of: [defineArrayMember({ type: "string", validation: (rule) => rule.max(30) })],
            validation: (rule) => rule.max(6),
        }),
        defineField({
            name: "projectTitle",
            title: "Second heading",
            type: "string",
            description: "The large heading of the second section, e.g. \"Ulster Moss Artefacts\".",
            validation: (rule) => rule.max(40),
        }),
        defineField({
            name: "journalHeading",
            title: "Journal excerpt: heading",
            type: "string",
            description: "The small heading above the journal excerpt, e.g. \"Last from the Journal:\".",
            validation: (rule) => rule.max(40),
        }),
        defineField({
            name: "journalExcerptTitle",
            title: "Journal excerpt: first line",
            type: "string",
            description: "The bold first line of the excerpt, e.g. \"Entry, September 11...\".",
            validation: (rule) => rule.max(60),
        }),
        defineField({
            name: "journalExcerpt",
            title: "Journal excerpt: text",
            type: "array",
            description:
                "The excerpt itself, shown as one block under the bold line. Each box starts on a new line. Include the quotation marks if you want them.",
            of: [defineArrayMember({ type: "text", rows: 3 })],
        }),
        defineField({
            name: "quote",
            title: "Quote",
            type: "text",
            rows: 2,
            description:
                "The large quote in the third section, including its quotation marks, e.g. “I am finding these objects more and more often.”",
            validation: (rule) => rule.max(200),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "array",
            description: "The text under the quote. Each box is one paragraph; drag the handles to reorder them.",
            of: [defineArrayMember({ type: "text", rows: 5 })],
        }),
    ],
    preview: { prepare: () => ({ title: "Home" }) },
});
