/** @type {import('tailwindcss').Config} */

const config = {
    content: ["./app/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                remix: {
                    black: "#121212",
                    blue: "#3defe9",
                },
            },
            gridTemplateColumns: {
                "todos": "auto 1fr auto",
                "new-todo": "1fr auto",
            },
            gridTemplateRows: {
                layout: "auto 1fr auto",
            },
            textDecorationThickness: {
                3: "3px",
            },
            textUnderlineOffset: {
                6: "6px",
            },
        },
    },
    plugins: [],
}

module.exports = config
