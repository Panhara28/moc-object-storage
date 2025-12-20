import { createSwaggerSpec } from "next-swagger-doc";

export function getSwaggerSpec() {
  return createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "TTRI API Documentation",
        version: "1.0.0",
      },
    },
    apiFolder: "app/api", // ✔ your screenshot confirms this
  });
}
