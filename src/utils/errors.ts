type Errors = Record<string, string | undefined>

const createErrorStack = (error: Error) => {
    if (!error.stack) {
        return ""
    }

    const shortStack = error.stack.split("\n").slice(0, 10).join("\n")
    return shortStack
}

const hasErrors = (errors: Errors) => {
    const hasErrors = Object.keys(errors).length > 0
    return hasErrors
}

export {createErrorStack, hasErrors}
export type {Errors}
