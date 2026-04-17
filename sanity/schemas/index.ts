import { type SchemaTypeDefinition } from "sanity";

// Import skema custom yang sudah kita buat
import { carSchema } from "./car";
import { newsSchema } from "./news";

// Daftarkan ke dalam array types
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [carSchema, newsSchema],
};
