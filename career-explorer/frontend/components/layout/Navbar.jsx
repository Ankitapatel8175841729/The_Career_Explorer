import { Link } from "@remix-run/react";
import { GraduationCap, Sparkles } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
                    <GraduationCap /> Career Explorer
                </Link>
                <div className="hidden md:flex gap-6 text-gray-700 font-medium">
                    <Link to="/streams/pcm" className="hover:text-indigo-600">PCM</Link>
                    <Link to="/streams/pcb" className="hover:text-indigo-600">PCB</Link>
                    <Link to="/streams/commerce" className="hover:text-indigo-600">Commerce</Link>
                    <Link to="/streams/humanities" className="hover:text-indigo-600">Humanities</Link>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
                    <Sparkles size={18} /> AI Guide
                </button>
            </div>
        </nav>
    );
}