import type { SchemaTypeDefinition } from "sanity";
import { aboutPage } from "./aboutPage";
import { contactPage } from "./contactPage";
import { homePage } from "./homePage";
import { journalEntry } from "./journalEntry";
import { processPage } from "./processPage";

// One file per document type, registered here.
export const schemaTypes: SchemaTypeDefinition[] = [homePage, aboutPage, contactPage, processPage, journalEntry];
