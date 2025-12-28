export function StreamCard({ title, desc, icon: Icon, link, color }) {
    return (
        <Link
            to={link}
            className={`rounded-2xl p-6 bg-gradient-to-br ${color} text-white shadow hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
        >
            <Icon size={32} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm opacity-90 mb-4">{desc}</p>
            <span className="text-sm font-medium underline">Explore-</span>
        </Link>
    );
}