import { defineArrayMember, defineField, defineType } from "sanity";

export const processPage = defineType({
    name: "processPage",
    title: "Process",
    type: "document",
    fields: [
        defineField({
            name: "items",
            title: "Carousel items",
            type: "array",
            description: "The slides of the Process carousel, in order. Drag the handles to reorder them.",
            of: [
                defineArrayMember({
                    name: "processItem",
                    title: "Carousel item",
                    type: "object",
                    fields: [
                        defineField({
                            name: "image",
                            title: "Image",
                            type: "image",
                            description: "The photo for this slide. It is always shown whole, never cropped.",
                            // No hotspot or crop tool: artwork is never cropped.
                            options: { hotspot: false },
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: "alt",
                            title: "Image description",
                            type: "string",
                            description:
                                "A short description of the photo for people who can't see it (screen readers, search engines).",
                            validation: (rule) => rule.required().max(200),
                        }),
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                            description: "The heading under the photo, e.g. \"Recovery\". Leave empty for no heading.",
                            validation: (rule) => rule.max(40),
                        }),
                        defineField({
                            name: "text",
                            title: "Text",
                            type: "array",
                            description: "The text under the heading. Each box is one paragraph.",
                            of: [defineArrayMember({ type: "text", rows: 4 })],
                        }),
                    ],
                    preview: {
                        select: { title: "title", media: "image" },
                        prepare: ({ title, media }) => ({ title: title || "(no title)", media }),
                    },
                }),
            ],
        }),
    ],
    preview: { prepare: () => ({ title: "Process" }) },
});
