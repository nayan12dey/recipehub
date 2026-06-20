"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 px-6 py-16">
            <div className="max-w-2xl w-full text-center">

                {/* SVG Illustration */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex justify-center mb-8"
                >
                    <svg
                        viewBox="0 0 420 320"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full max-w-md"
                    >
                        {/* Plate */}
                        <motion.ellipse
                            cx="210"
                            cy="230"
                            rx="140"
                            ry="22"
                            fill="#fed7aa"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        />
                        <ellipse cx="210" cy="220" rx="120" ry="18" fill="#ffedd5" />
                        <ellipse cx="210" cy="220" rx="100" ry="14" fill="#fff7ed" />

                        {/* Bowl body */}
                        <path
                            d="M100 180 Q100 260 210 270 Q320 260 320 180 Z"
                            fill="#f97316"
                        />
                        <path
                            d="M110 180 Q110 255 210 265 Q310 255 310 180 Z"
                            fill="#fb923c"
                        />
                        {/* Bowl inner shadow */}
                        <path
                            d="M130 185 Q130 245 210 253 Q290 245 290 185 Z"
                            fill="#fdba74"
                        />

                        {/* Steam wisps */}
                        <motion.path
                            d="M175 165 Q168 145 175 125 Q182 105 175 85"
                            stroke="#fb923c"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        />
                        <motion.path
                            d="M210 155 Q203 135 210 115 Q217 95 210 75"
                            stroke="#f97316"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                        />
                        <motion.path
                            d="M245 165 Q238 145 245 125 Q252 105 245 85"
                            stroke="#fb923c"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                        />

                        {/* Noodles / food in bowl */}
                        <path d="M145 210 Q175 195 210 205 Q245 215 275 205" stroke="#c2410c" strokeWidth="4" strokeLinecap="round" fill="none" />
                        <path d="M148 220 Q178 208 210 217 Q242 226 272 216" stroke="#9a3412" strokeWidth="3" strokeLinecap="round" fill="none" />
                        <path d="M150 230 Q180 220 210 228 Q240 236 270 226" stroke="#c2410c" strokeWidth="3.5" strokeLinecap="round" fill="none" />

                        {/* 404 Text */}
                        <text
                            x="210"
                            y="140"
                            textAnchor="middle"
                            fontSize="88"
                            fontWeight="900"
                            fontFamily="system-ui, sans-serif"
                            fill="#f97316"
                            opacity="0.12"
                        >
                            404
                        </text>

                        {/* Fork left */}
                        <rect x="72" y="170" width="8" height="70" rx="4" fill="#d1d5db" />
                        <rect x="68" y="140" width="3" height="30" rx="1.5" fill="#9ca3af" />
                        <rect x="74" y="140" width="3" height="30" rx="1.5" fill="#9ca3af" />
                        <rect x="80" y="140" width="3" height="30" rx="1.5" fill="#9ca3af" />

                        {/* Spoon right */}
                        <rect x="342" y="170" width="8" height="70" rx="4" fill="#d1d5db" />
                        <ellipse cx="346" cy="148" rx="11" ry="16" fill="#e5e7eb" />
                        <ellipse cx="346" cy="149" rx="8" ry="12" fill="#f3f4f6" />

                        {/* Stars / sparkles */}
                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "50px 60px" }}
                        >
                            <circle cx="50" cy="60" r="4" fill="#fbbf24" opacity="0.7" />
                        </motion.g>
                        <motion.g
                            animate={{ rotate: -360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "370px 80px" }}
                        >
                            <circle cx="370" cy="80" r="3" fill="#f97316" opacity="0.6" />
                        </motion.g>
                        <motion.g
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            style={{ transformOrigin: "390px 150px" }}
                        >
                            <circle cx="390" cy="150" r="5" fill="#fbbf24" opacity="0.5" />
                        </motion.g>
                        <motion.g
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            style={{ transformOrigin: "30px 140px" }}
                        >
                            <circle cx="30" cy="140" r="4" fill="#fb923c" opacity="0.5" />
                        </motion.g>
                    </svg>
                </motion.div>

                {/* 404 Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 text-orange-600 text-sm font-semibold tracking-wide"
                >
                    <span className="text-base">🍽️</span> Error 404 — Page Not Found
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
                >
                    Oops! This Recipe
                    <span className="block text-orange-500">Went Missing</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6 }}
                    className="text-gray-500 text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed"
                >
                    The page you&apos;re looking for has been eaten up or never existed.
                    Let&apos;s get you back to something delicious!
                </motion.p>

                {/* Back Home Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="group relative inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:bg-orange-600 hover:shadow-orange-300 hover:scale-105 active:scale-95"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>

                    <Link
                        href="/recipes"
                        className="inline-flex items-center gap-2 rounded-2xl border-2 border-orange-200 bg-white px-8 py-4 text-base font-bold text-orange-500 transition-all duration-300 hover:border-orange-400 hover:bg-orange-50 hover:scale-105 active:scale-95"
                    >
                        🍳 Browse Recipes
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
