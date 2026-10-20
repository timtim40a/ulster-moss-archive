import { defineArrayMember, defineField, defineType } from "sanity";

export const journalEntry = defineType({
    name: "journalEntry",
    title: "Journal entry",
    type: "document",
    fields: [
        defineField({
            name: "date",
            title: "Date",
            type: "date",
            description: "The day of the field visit. Entries are shown in date order, oldest first.",
            options: { dateFormat: "D MMMM YYYY" },
            initialValue: () => new Date().toISOString().slice(0, 10),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "conditions",
            title: "Conditions",
            type: "string",
            description: "Weather and tide, shown after the date, e.g. \"low tide, overcast\". Optional.",
            validation: (rule) => rule.max(80),
        }),
        defineField({
            name: "body",
            title: "Text",
            type: "array",
            description: "The entry text. Each box is one paragraph; drag the handles to reorder them.",
            of: [defineArrayMember({ type: "text", rows: 5 })],
        }),
        defineField({
            name: "images",
            title: "Images",
            type: "array",
            description:
                "Photos and sketches for this entry. They are placed in the text automatically, alternating sides, in this order.",
            of: [
                defineArrayMember({
                    name: "journalImage",
                    title: "Image",
                    type: "object",
                    fields: [
                        defineField({
                            name: "image",
                            title: "Image",
                            type: "image",
                            description: "The photo or sketch. It is always shown whole, never cropped.",
                            // No hotspot or crop tool: artwork is never cropped.
                            options: { hotspot: false },
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: "alt",
                            title: "Image description",
                            type: "string",
                            description:
                                "A short description of the image for people who can't see it (screen readers, search engines).",
                            validation: (rule) => rule.required().max(200),
                        }),
                        defineField({
                            name: "caption",
                            title: "Caption",
                            type: "string",
                            description: "The small handwritten-style line under the image, e.g. \"field sketch\". Optional.",
                            validation: (rule) => rule.max(80),
                        }),
                    ],
                    preview: {
                        select: { title: "caption", subtitle: "alt", media: "image" },
                    },
                }),
            ],
        }),
    ],
    orderings: [
        { title: "Date, newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
        { title: "Date, oldest first", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
    ],
    preview: {
        select: { date: "date", conditions: "conditions", media: "images.0.image" },
        prepare: ({ date, conditions, media }) => ({
            title: date
                ? new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                  })
                : "(no date)",
            subtitle: conditions,
            media,
        }),
    },
});
