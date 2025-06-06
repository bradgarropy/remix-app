export const action = () => {
    throw new Error("Sentry Action Error")
}

const Route = () => {
    return (
        <>
            <title>💿 remix app | sentry</title>
            <h2 className="text-2xl font-bold mb-4">Sentry | Action Error</h2>

            <form method="post">
                <button
                    type="submit"
                    className="bg-purple-500 text-white px-4 py-2 font-bold hover:bg-purple-600"
                >
                    Submit
                </button>
            </form>
        </>
    )
}

export default Route
