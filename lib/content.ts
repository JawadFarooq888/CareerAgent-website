import { prisma } from "@/lib/prisma";

// Looks up an editable copy override from the ContentBlock table, falling back
// to the given default when the DB isn't connected or the key doesn't exist yet.
export async function getContentBlock(key: string, fallback: string): Promise<string> {
  try {
    const block = await prisma.contentBlock.findUnique({ where: { key } });
    return block?.value ?? fallback;
  } catch {
    return fallback;
  }
}
