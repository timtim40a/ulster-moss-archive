// Everything project-specific comes from env vars, so moving the Sanity
// project to another account needs no code changes. See .env.example.

// Pinned so a Sanity API change can never alter what a query returns.
export const apiVersion = "2026-10-01";

export const projectId = assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    "Missing env var NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const dataset = assertValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    "Missing env var NEXT_PUBLIC_SANITY_DATASET",
);

function assertValue<T>(value: T | undefined, message: string): T {
    if (value === undefined || value === "") throw new Error(message);
    return value;
}
