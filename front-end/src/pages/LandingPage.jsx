import { useNavigate } from "react-router-dom";
import { Leaf, ShieldCheck, TrendingUp, Users } from "lucide-react";
import logo from "../assets/image-removebg-preview.png";
import farmerImage from "../assets/olive_grove4.jpg";
import agriculteur from "../assets/images (2).jpg";

const BRAND_NAME = "Olivetrack";

const FEATURES = [
    {
        icon: ShieldCheck,
        title: "Données sécurisées",
        text: "Authentification par token et accès protégés : chaque exploitant ne voit que ses propres parcelles.",
    },
    {
        icon: TrendingUp,
        title: "Rendement suivi",
        text: "Le tableau de bord calcule votre rendement annuel et signale les parcelles qui sortent de la normale.",
    },
    {
        icon: Leaf,
        title: "Pensé pour l'olivier",
        text: "Un vocabulaire et des workflows adaptés à la réalité du terrain : parcelle, récolte, trituration, vente.",
    },
    {
        icon: Users,
        title: "Simple à utiliser",
        text: "Une interface claire, pensée pour être utilisée au quotidien, sans formation technique.",
    },
];

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            {/* Nav */}
            <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-30">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-[#1B5E5A]">
                        <img
                            src={logo}
                            alt={BRAND_NAME}
                            className="h-10 w-10"
                        />
                        {BRAND_NAME}
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <a href="#pourquoi" className="hover:text-[#1B5E5A]">
                            Pourquoi {BRAND_NAME}
                        </a>
                        <a href="#avis" className="hover:text-[#1B5E5A]">
                            Témoignages
                        </a>
                    </nav>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/login")}
                            className="hidden sm:inline text-sm font-medium text-gray-600 hover:text-[#1B5E5A]"
                        >
                            Se connecter
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-[#49CCC3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#38b0a9] transition-colors"
                        >
                            Créer un compte
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 pt-14 pb-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <span className="inline-flex items-center gap-1.5 bg-[#edf7ee] text-[#1B5E5A] text-xs font-semibold px-3 py-1 rounded-full mb-5">
                        <Leaf size={12} /> Gestion d'exploitation oléicole
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#134e4a] leading-tight mb-5">
                        De la parcelle à la vente,
                        <br /> tout votre olivier au même endroit
                    </h1>
                    <p className="text-gray-500 mb-8 max-w-md">
                        {BRAND_NAME} centralise le suivi de vos parcelles :
                        récoltes, trituration en huile et ventes d'olives, pour
                        un suivi clair, précis et sans papier.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-10">
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-[#49CCC3] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#38b0a9] transition-colors"
                        >
                            Commencer gratuitement
                        </button>
                        <a
                            href="#pourquoi"
                            className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm font-semibold hover:border-[#49CCC3] hover:text-[#1B5E5A] transition-colors"
                        >
                            Découvrir les fonctionnalités
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4 max-w-sm">
                        <div className="border border-gray-100 rounded-xl p-4">
                            <p className="text-xs text-gray-400 mb-1">
                                Parcours complet
                            </p>
                            <p className="text-[#00B894] font-bold text-lg">
                                Parcelle → Vente
                            </p>
                        </div>
                        <div className="border border-gray-100 rounded-xl p-4">
                            <p className="text-xs text-gray-400 mb-1">Accès</p>
                            <p className="text-[#00B894] font-bold text-lg">
                                Sécurisé & privé
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                        src={farmerImage}
                        alt="Illustration d'un agriculteur sur le terrain"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Story */}
            <section className="bg-[#f8f9fa] py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                   <div className="rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                        src={agriculteur}
                        alt="Illustration d'un agriculteur sur le terrain"
                        className="w-full h-full object-cover"
                    />
                </div>
                    <div className="order-1 md:order-2">
                        <span className="inline-flex items-center gap-1.5 text-[#00B894] text-xs font-semibold mb-3">
                            <Leaf size={12} /> Notre mission
                        </span>
                        <h2 className="text-3xl font-extrabold text-[#134e4a] mb-4 leading-snug">
                            Une gestion moderne, pensée pour l'oléiculture
                        </h2>
                        <p className="text-gray-500 mb-6 max-w-md">
                            Nous croyons qu'un bon suivi commence par des
                            données simples et fiables : combien de parcelles,
                            combien récolté, combien d'huile produite, combien
                            d'olives vendues directement. {BRAND_NAME} réunit
                            tout ça en un seul endroit, accessible à tout
                            moment.
                        </p>
                        <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
                            <div className="bg-[#edf7ee] text-[#00B894] rounded-lg px-3 py-2 text-xs font-bold">
                                100%
                            </div>
                            <p className="text-sm text-gray-600">
                                de vos données de parcelle, récolte et vente
                                réunies au même endroit
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why choose */}
            <section id="pourquoi" className="bg-[#edf7ee] py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-[#134e4a] text-center mb-2">
                        Pourquoi choisir {BRAND_NAME}
                    </h2>
                    <p className="text-gray-500 text-center mb-10 max-w-lg mx-auto">
                        Une plateforme conçue pour la réalité du terrain, pas
                        pour un tableur.
                    </p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {FEATURES.map((f) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={f.title}
                                    className="bg-white rounded-xl p-5 border border-gray-100"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-[#edf7ee] text-[#00B894] flex items-center justify-center mb-3">
                                        <Icon size={18} />
                                    </div>
                                    <p className="font-bold text-sm text-[#134e4a] mb-1">
                                        {f.title}
                                    </p>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        {f.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA banner */}
            <section className="bg-[#1B5E5A] py-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white font-semibold text-lg text-center sm:text-left">
                        Prêt à structurer le suivi de votre exploitation ?
                    </p>
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-[#49CCC3] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#38b0a9] transition-colors whitespace-nowrap"
                    >
                        Créer mon compte
                    </button>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
