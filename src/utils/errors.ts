const createErrorStack = (error: Error) => {
    if (!error.stack) {
        return ""
    }

    const shortStack = error.stack.split("\n").slice(0, 10).join("\n")
    return shortStack
}

const hasErrors = (errors: Record<string, string>) => {
    const hasErrors = Object.keys(errors).length > 0
    return hasErrors
}

export {createErrorStack, hasErrors}
