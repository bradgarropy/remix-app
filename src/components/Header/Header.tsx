import Navigation from "~/components/Navigation"
import {useAuth} from "~/utils/auth"

const Header = () => {
    const user = useAuth()

    return (
        <header className="flex items-start justify-between px-8 py-12">
            <div>
                <h1 className="text-3xl font-bold">remix app</h1>
                {user ? <p className="text-sm">{user.email}</p> : null}
            </div>

            <Navigation />
        </header>
    )
}

export default Header
