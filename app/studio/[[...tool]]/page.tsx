/**
 * This route renders the Sanity Studio embedded inside your Next.js app.
 * Navigate to /studio to access the CMS dashboard.
 *
 * The { dynamic } export opts this specific route out of static generation
 * because the Studio is a fully dynamic, client-side application.
 */
"use client";

export const dynamic = "force-dynamic";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}