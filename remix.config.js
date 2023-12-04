/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/", "contacts/_index.tsx");
      route("/contacts/:contactId", "contacts/$contactId.tsx");
      route("/contacts/:contactId/edit", "contacts/$contactId.edit.tsx");
      route("/contacts/:contactId/destroy", "contacts/$contactId.destroy.tsx");
    });
  },
};
