import type {RouteConfig} from "@remix-run/route-config"
import {index, route} from "@remix-run/route-config"

const routes: RouteConfig = [
    index("./routes/index.tsx"),
    route("about", "./routes/about.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("signin", "./routes/signin.tsx"),
    route("signup", "./routes/signup.tsx"),
    route("signout", "./routes/signout.tsx"),
    route("reset", "./routes/reset.tsx"),
    route("reset/token/:token", "./routes/resetToken.tsx"),
    route("api/hello", "./routes/api/hello.tsx"),
    route("sentry", "./routes/sentry.tsx"),
    route("sentry/frontend", "./routes/sentryFrontend.tsx"),
    route("sentry/loader", "./routes/sentryLoader.tsx"),
    route("sentry/action", "./routes/sentryAction.tsx"),
]

export default routes
