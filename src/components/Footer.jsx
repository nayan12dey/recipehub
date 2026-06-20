"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaPinterestP,
    FaPhoneAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    const links = [
        { name: "Home", href: "/" },
        { name: "Browse Recipes", href: "/recipes" },
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
    ];

    const social = [
        FaFacebookF,
        FaInstagram,
        FaLinkedinIn,
        FaYoutube,
        FaPinterestP,
    ];

    const pathname = usePathname();
    if(pathname.includes('dashboard')){
        return null;
    }

    return (
        <footer className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-slate-300 overflow-hidden">

            {/* subtle glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-red-500/10 blur-3xl rounded-full" />

            <div className="relative max-w-7xl mx-auto px-6 py-20">

                {/* Top Grid */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-md group-hover:scale-105 transition">
                                🍳
                            </div>

                            <span className="text-2xl font-extrabold text-white tracking-tight">
                                RecipeHub
                            </span>
                        </Link>

                        <p className="mt-5 text-sm leading-7 text-slate-400">
                            Discover, cook, and share recipes from around the world.
                            Improve your cooking skills and explore new flavors every day.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
                            Navigation
                        </h3>

                        <ul className="space-y-3 text-sm">
                            {links.map((l) => (
                                <li key={l.name}>
                                    <Link
                                        href={l.href}
                                        className="hover:text-orange-400 transition-colors"
                                    >
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
                            Contact
                        </h3>

                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-center gap-3">
                                <MdEmail className="text-orange-400" />
                                support@recipehub.com
                            </li>

                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-orange-400 text-sm" />
                                +1 (212) 555-7890
                            </li>

                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-orange-400 mt-1" />
                                New York, USA
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
                            Follow
                        </h3>

                        <div className="flex gap-3 flex-wrap">
                            {social.map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-900 border border-white/5 hover:border-orange-500/40 hover:bg-slate-800 transition-all hover:scale-105"
                                >
                                    <Icon size={15} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-16 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} RecipeHub. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-xs text-slate-400">
                        <Link href="/privacy-policy" className="hover:text-orange-400">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-and-conditions" className="hover:text-orange-400">
                            Terms
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}