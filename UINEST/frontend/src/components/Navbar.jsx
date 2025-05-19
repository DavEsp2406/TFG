import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { logout, authUser } = useAuthStore()

    return (
        <header className="top-0 z-40 fixed bg-base-100/80 backdrop-blur-lg border-b border-base-300 w-full">
            <div className="mx-auto px-4 h-16 container">
                <div className="flex justify-between items-center h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="flex justify-center items-center bg-primary/10 rounded-lg size-9">
                                <MessageSquare className="size-5 text-primary" />
                            </div>
                            <h1 className="font-bold text-lg">UINEST</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to={"/settings"} className="gap-2 transition-colors btn btn-sm">
                            <Settings className="size-4" />
                            <span className="hidden sm:inline">Settings</span>
                        </Link>
                        {authUser && (
                            <>
                                <Link to={"/profile"} className="gap-2 btn btn-sm">
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>

                                <button className="flex items-center gap-2" onClick={logout}>
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar