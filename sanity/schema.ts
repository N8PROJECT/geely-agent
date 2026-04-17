import type { SchemaTypeDefinition } from "sanity";
import { carSchema } from "./schemas/car";
import { newsSchema } from "./schemas/news";

/**
 * All document and object schemas registered here are automatically
 * picked up by the Sanity Studio embedded at /studio (see sanity.config.ts).
 *
 * ORDER MATTERS for the Studio sidebar — list the most-used types first.
 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [carSchema, newsSchema],
};