/** @type {import('@remix-run/dev').AppConfig} */

const config = {
    future: {
        v2_errorBoundary: true,
        v2_headers: true,
        v2_meta: true,
        v2_normalizeFormMethod: true,
        v2_routeConvention: true,
    },
    ignoredRouteFiles: ["**/.*"],
    publicPath: "/build/",
    server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
    serverBuildPath: "api/index.js",
    serverMainFields: ["main", "module"],
    serverMinify: false,
    serverModuleFormat: "cjs",
    serverPlatform: "node",
    tailwind: true,
}

module.exports = config
