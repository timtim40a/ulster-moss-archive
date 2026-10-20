import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import type { SanityTag } from "@/sanity/fetch";

/*
 * Called by the Sanity webhook on every create, update and delete of the
 * content types. Revalidates the cache tag named after the document's
 * `_type`, so pages showing it are fresh on their very next request.
 */

const TAGS: ReadonlySet<string> = new Set<SanityTag>([
    "homePage",
    "aboutPage",
    "contactPage",
    "processPage",
    "journalEntry",
]);

export async function POST(request: NextRequest) {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    // Without a secret, parseBody would skip the signature check altogether.
    if (!secret) {
        return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
    }

    try {
        // `true` waits out Content Lake's eventual consistency, so the refetch sees the change.
        const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret, true);

        if (!isValidSignature) {
            return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
        }
        if (!body?._type || !TAGS.has(body._type)) {
            return NextResponse.json({ message: "Unknown or missing _type" }, { status: 400 });
        }

        // expire: 0 -- never serve the old content once a change is published.
        revalidateTag(body._type, { expire: 0 });
        return NextResponse.json({ revalidated: body._type, now: Date.now() });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Could not parse the request" }, { status: 400 });
    }
}
