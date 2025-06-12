import { Link } from "react-router-dom";

const Footer = () => (
    <footer className="bg-base-300 mt-12 py-6 border-t">
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 mx-auto px-4 max-w-2xl">
            <span className="text-zinc-400 text-sm">
                © {new Date().getFullYear()} UINEST. All rights reserved.
            </span>
            <div className="flex gap-4 text-zinc-400 text-sm">
                <Link to="/privacy-policy" className="hover:underline">
                    Privacy Policy
                </Link>
                <Link to="/terms" className="hover:underline">
                    Terms of Service
                </Link>
                <Link to="/cookies" className="hover:underline">
                    Cookie Policy
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;