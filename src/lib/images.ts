// Asset folders under public/ -- filenames include spaces and non-ASCII
// characters, so build each URL through encodeURIComponent rather than
// writing raw src strings per page.

export function fullPhoto(name: string): string {
  return `/Full%20photos/${encodeURIComponent(name)}`;
}

export function journalImage(name: string): string {
  return `/Journal/${encodeURIComponent(name)}`;
}

export function archiveImage(name: string): string {
  return `/Archive/${encodeURIComponent(name)}`;
}
