import {defineConfig, devices} from "@playwright/test"

const config = defineConfig({
    testDir: "./src/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    maxFailures: 1,
    retries: 0,
    reporter: "html",
    use: {
        baseURL: "http://localhost:3000",
        trace: "on",
    },
    projects: [
        {
            name: "setup",
            testMatch: "setup.ts",
        },
        {
            name: "chromium",
            use: {...devices["Desktop Chrome"]},
            dependencies: ["setup"],
        },
    ],
    webServer: {
        command:
            "echo $SESSION_SECRET && echo $VITE_SESSION_SECRET && npm start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
    },
})

export default config
