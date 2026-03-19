// sanity.config.ts
"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// Token público para autenticación del Studio
const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  // Pasar el token para permitir escritura
  ...(token ? { token } : {}),
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
  ],
});
