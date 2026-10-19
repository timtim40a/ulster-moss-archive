import type { SchemaTypeDefinition } from "sanity";
import { aboutPage } from "./aboutPage";
import { contactPage } from "./contactPage";
import { processPage } from "./processPage";

// One file per document type, registered here.
export const schemaTypes: SchemaTypeDefinition[] = [aboutPage, contactPage, processPage];
