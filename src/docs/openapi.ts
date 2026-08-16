import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import "../modules/profiles/profle.openapi";

import { registry } from "./registry";

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openapi: ReturnType<typeof generator.generateDocument> =
  generator.generateDocument({
    openapi: "3.0.0",

    info: {
      version: "1.0.0",
      title: "Mentorship System API",
      description: "API documentation for mentorship System",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  });
