import {defineConfig, devices} from "@playwright/test"

const config = defineConfig({
    testDir: "./src/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
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
        command: "npm start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
    },
})

export default config
