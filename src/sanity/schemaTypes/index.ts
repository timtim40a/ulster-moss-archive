import type { SchemaTypeDefinition } from "sanity";
import { aboutPage } from "./aboutPage";
import { contactPage } from "./contactPage";

// One file per document type, registered here.
export const schemaTypes: SchemaTypeDefinition[] = [aboutPage, contactPage];
