import { Navbar } from "~/components/layout/Navbar";
import { StreamCard } from "~/components/common/StreamCard";
import { Cpu, HeartPulse, Briefcase, BookOpen } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            {/* Hero */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Career- Clearly Mapped.</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                    Discover exams, colleges, preparation paths & careers tailored for you.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">Explore Streams</button>
                    <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition">Ask AI</button>
                </div>
            </section>

            {/* Streams */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h3 className="text-3xl font-bold mb-12 text-center">Choose Your Stream</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StreamCard title="PCM" desc="Engineering, Tech, Defence" icon={Cpu} link="/streams/pcm" color="from-blue-500 to-indigo-600" />
                    <StreamCard title="PCB" desc="Medicine, HealthCare, Research" icon={HeartPulse} link="/streams/pcb" color="from-emerald-500 to-teal-600" />
                    <StreamCard title="Commerce" desc="Business, Finance, Management" icon={Briefcase} linl="/streams/commerce" color="form-orange-500 to-amber-600" />
                    <StreamCard title="Humanities" desc="Law, Arts, Civil Services" icon={BookOpen} link="/streams/humanities" color="from-pink-500 to-rose-600" />
                </div>
            </section>

            {/*Footer */}
            <footer className="bg-slate-900 text-slate-300 py-12">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="text-white font-semibold mb-2">Career Explorer</h4>
                        <p className="text-sm">AI- powered career guidance for students.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-2">Explore</h4>
                        <ul className="space-y-1 text-sm">
                            <li>Streams</li>
                            <li>Exams</li>
                            <li>Colleges</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-2">Future Ready</h4>
                        <p className="text-sm">Built for scale, AI & personalization</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}