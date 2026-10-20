import type { StructureResolver } from "sanity/structure";

/*
 * Single pages: each is one document whose id is its type name. They show as
 * single items in the sidebar, and sanity.config.ts stops them being created
 * again, duplicated or deleted.
 */
export const SINGLETONS = [
    { type: "homePage", title: "Home" },
    { type: "aboutPage", title: "About" },
    { type: "contactPage", title: "Contact" },
    { type: "processPage", title: "Process" },
];

export const SINGLETON_TYPES = new Set(SINGLETONS.map(({ type }) => type));

export const structure: StructureResolver = (S, context) =>
    S.list()
        .title("Content")
        .items([
            // Only singletons whose schema is registered, so pages can be added one at a time.
            ...SINGLETONS.filter(({ type }) => context.schema.get(type)).map(({ type, title }) =>
                S.listItem()
                    .title(title)
                    .id(type)
                    .child(S.document().schemaType(type).documentId(type).title(title)),
            ),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !SINGLETON_TYPES.has(item.getId() ?? "")),
        ]);
