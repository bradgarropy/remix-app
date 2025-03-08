import {defineConfig, devices} from "@playwright/test"

const config = defineConfig({
    testDir: "./src/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    maxFailures: 1,
    retries: 0,
    // workers: process.env.CI ? 1 : undefined,
    workers: 1,
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
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
    },
})

export default config
