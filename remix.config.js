/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/", "contacts/_index.tsx");
      route("/contacts/:contactId", "contacts/widgets/$contactId.tsx");
      route(
        "/contacts/:contactId/edit",
        "contacts/widgets/$contactId.edit.tsx"
      );
      route(
        "/contacts/:contactId/destroy",
        "contacts/widgets/$contactId.destroy.tsx"
      );
    });
  },
};
