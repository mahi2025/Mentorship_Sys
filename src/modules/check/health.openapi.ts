import { registry } from "../../docs/registry";

registry.registerPath({
  method: "get",
  path: "/api/health",
  tags: ["Health"],
  summary: "Check process liveness",
  responses: {
    200: { description: "The API process is responding" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/health/ready",
  tags: ["Health"],
  summary: "Check dependency readiness",
  responses: {
    200: { description: "PostgreSQL and Redis are ready" },
    503: { description: "A required dependency is unavailable" },
  },
});