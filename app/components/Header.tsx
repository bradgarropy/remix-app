import type {FC} from "react"

import Navigation from "~/components/Navigation"

const Header: FC = () => {
    return (
        <header className="flex justify-between items-center px-8 py-12">
            <h1 className="text-3xl font-bold">Remix App</h1>
            <Navigation />
        </header>
    )
}

export default Header
