
// "use client";

// import Link from "next/link";
// import {
//     FaFacebookF,
//     FaInstagram,
//     FaLinkedinIn,
//     FaYoutube,
//     FaPinterestP,
//     FaPhoneAlt,
//     FaMapMarkerAlt,
// } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";

// export default function Footer() {
//     return (
//         <footer className="bg-slate-900 text-slate-300">
//             <div className="max-w-7xl mx-auto px-6 py-12">
//                 <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

//                     {/* Logo & About */}
//                     <div>
//                         <Link href="/" className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-xl shadow-md">
//                                 🍳
//                             </div>

//                             <span className="text-2xl font-bold text-white">
//                                 RecipeHub
//                             </span>
//                         </Link>

//                         <p className="mt-4 text-sm leading-6 text-slate-400">
//                             Discover, cook, and share delicious recipes from around the world.
//                             Explore new dishes, save your favorites, and become a better cook
//                             every day.
//                         </p>
//                     </div>

//                     {/* Quick Links */}
//                     <div>
//                         <h3 className="text-lg font-semibold text-white mb-4">
//                             Quick Links
//                         </h3>

//                         <ul className="space-y-3">
//                             <li>
//                                 <Link
//                                     href="/"
//                                     className="hover:text-orange-400 transition-colors"
//                                 >
//                                     Home
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link
//                                     href="/recipes"
//                                     className="hover:text-orange-400 transition-colors"
//                                 >
//                                     Browse Recipes
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link
//                                     href="/login"
//                                     className="hover:text-orange-400 transition-colors"
//                                 >
//                                     Login
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link
//                                     href="/register"
//                                     className="hover:text-orange-400 transition-colors"
//                                 >
//                                     Register
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Contact Information */}
//                     <div>
//                         <h3 className="text-lg font-semibold text-white mb-4">
//                             Contact Us
//                         </h3>

//                         <ul className="space-y-4">
//                             <li className="flex items-center gap-3">
//                                 <MdEmail className="text-orange-400 text-lg" />
//                                 <span>support@recipehub.com</span>
//                             </li>

//                             <li className="flex items-center gap-3">
//                                 <FaPhoneAlt className="text-orange-400 text-sm" />
//                                 <span>+1 (212) 555-7890</span>
//                             </li>

//                             <li className="flex items-start gap-3">
//                                 <FaMapMarkerAlt className="text-orange-400 text-lg mt-1" />
//                                 <span>350 5th Avenue, New York, NY 10118, USA</span>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Social Links */}
//                     <div>
//                         <h3 className="text-lg font-semibold text-white mb-4">
//                             Follow Us
//                         </h3>

//                         <div className="flex flex-wrap gap-4">
//                             <Link
//                                 href="https://facebook.com"
//                                 target="_blank"
//                                 className="p-3 rounded-full bg-slate-800 hover:bg-orange-500 hover:text-white transition-all duration-300"
//                             >
//                                 <FaFacebookF size={18} />
//                             </Link>

//                             <Link
//                                 href="https://instagram.com"
//                                 target="_blank"
//                                 className="p-3 rounded-full bg-slate-800 hover:bg-orange-500 hover:text-white transition-all duration-300"
//                             >
//                                 <FaInstagram size={18} />
//                             </Link>

//                             <Link
//                                 href="https://linkedin.com"
//                                 target="_blank"
//                                 className="p-3 rounded-full bg-slate-800 hover:bg-orange-500 hover:text-white transition-all duration-300"
//                             >
//                                 <FaLinkedinIn size={18} />
//                             </Link>

//                             <Link
//                                 href="https://youtube.com"
//                                 target="_blank"
//                                 className="p-3 rounded-full bg-slate-800 hover:bg-orange-500 hover:text-white transition-all duration-300"
//                             >
//                                 <FaYoutube size={18} />
//                             </Link>

//                             <Link
//                                 href="https://pinterest.com"
//                                 target="_blank"
//                                 className="p-3 rounded-full bg-slate-800 hover:bg-orange-500 hover:text-white transition-all duration-300"
//                             >
//                                 <FaPinterestP size={18} />
//                             </Link>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Bar */}
//                 <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
//                     <p className="text-sm text-slate-400 text-center md:text-left">
//                         © {new Date().getFullYear()} RecipeHub. All rights reserved.
//                     </p>

//                     <div className="flex gap-4 text-sm">
//                         <Link
//                             href="/privacy-policy"
//                             className="hover:text-orange-400 transition-colors"
//                         >
//                             Privacy Policy
//                         </Link>

//                         <Link
//                             href="/terms-and-conditions"
//                             className="hover:text-orange-400 transition-colors"
//                         >
//                             Terms & Conditions
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// }



"use client";

import Link from "next/link";
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