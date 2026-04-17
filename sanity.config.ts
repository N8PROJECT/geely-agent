import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset } from "./sanity/env";
import { schema } from "./sanity/schema";
import { colorInput } from "@sanity/color-input";

/**
 * This config powers the Sanity Studio embedded at /studio in your Next.js app.
 * Access it at http://localhost:3000/studio during development.
 */
export default defineConfig({
  /* Must match the route defined in app/studio/[[...tool]]/page.tsx */
  basePath: "/studio",

  projectId: projectId,
  dataset: dataset,

  schema,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Geely Agent CMS")
          .items([
            S.listItem()
              .title("🚗  Car Catalog")
              .child(S.documentTypeList("car").title("All Cars")),
            S.divider(),
            S.listItem()
              .title("📰  News Articles")
              .child(S.documentTypeList("news").title("All News")),
          ]),
    }),
    colorInput(),

    /* GROQ query playground — only useful in development */
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
  ],
});
