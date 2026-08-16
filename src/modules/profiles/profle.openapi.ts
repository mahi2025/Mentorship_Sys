import { registry } from "../../docs/registry";
import { updateProfileSchema, profileResponseSchema } from "./profile.validation";

registry.register("UpdateProfileRequest", updateProfileSchema);

registry.register("ProfileResponse", profileResponseSchema);

registry.registerPath({
  method: "patch",
  path: "/api/profile",

  tags: ["Profile"],

  summary: "Update current user's profile",

  description: "Updates the authenticated user's profile.",

  request: {
    body: {
      content: {
        "application/json": {
          schema: updateProfileSchema,
        },
      },
    },
  },

  responses: {
    200: {
      description: "Profile updated successfully",

      content: {
        "application/json": {
          schema: profileResponseSchema,
        },
      },
    },

    400: {
      description: "Invalid profile data",
    },

    401: {
      description: "User is not authenticated",
    },
  },
});
