import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "News Forum Docs",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [__dirname + "/swagger-docs.yaml"],
};
const spec = swaggerJSDoc(options);
export function swagger(app: Express, port: string | 3000) {
  app.use("/api", swaggerUi.serve, swaggerUi.setup(spec));
}
