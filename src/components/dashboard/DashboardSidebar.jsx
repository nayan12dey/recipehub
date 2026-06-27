"use client";

import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
    FaHome,
    FaPlus,
    FaHeart,
    FaUserCircle,
    FaSignOutAlt,
    FaUsers,
    FaUtensils,
    FaFlag,
    FaMoneyBill,
    FaCrown,
    FaBookOpen,
    FaShoppingCart,
    FaChartBar,
    FaArrowLeft,
} from "react-icons/fa";

const DashboardSideBar = () => {
    const { data: session } = useSession();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!session?.user?.email) return;

            const { data: token } = await authClient.token();

            const res = await fetch(
                `http://localhost:5000/user/${session.user.email}`,
                {
                    headers: {
                        authorization: `Bearer ${token?.token}`,
                    },
                }
            );

            const data = await res.json();
            setProfile(data);
        };

        fetchUser();
    }, [session]);

    const pathname = usePathname();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
        setIsOpen(false);
    };

    const userMenu = [
        {
            key: "overview",
            label: "Overview",
            icon: FaHome,
            href: "/dashboard/user",
        },
        {
            key: "add-recipe",
            label: "Add Recipe",
            icon: FaPlus,
            href: "/dashboard/user/add-recipe",
        },
        {
            key: "my-recipes",
            label: "My Recipes",
            icon: FaBookOpen,
            href: "/dashboard/user/my-recipes",
        },
        {
            key: "favorites",
            label: "Favorites",
            icon: FaHeart,
            href: "/dashboard/user/favorites",
        },
        {
            key: "purchased",
            label: "Purchased",
            icon: FaShoppingCart,
            href: "/dashboard/user/purchased",
        },
        {
            key: "profile",
            label: "Profile",
            icon: FaUserCircle,
            href: "/dashboard/user/profile",
        },
    ];

    const adminMenu = [
        {
            key: "admin-overview",
            label: "Admin Overview",
            icon: FaChartBar,
            href: "/dashboard/admin",
        },
        {
            key: "manage-users",
            label: "Manage Users",
            icon: FaUsers,
            href: "/dashboard/admin/manage-users",
        },
        {
            key: "manage-recipes",
            label: "Manage Recipes",
            icon: FaUtensils,
            href: "/dashboard/admin/manage-recipes",
        },
        {
            key: "reports",
            label: "Reports",
            icon: FaFlag,
            href: "/dashboard/admin/reports",
        },
        {
            key: "transactions",
            label: "Transactions",
            icon: FaMoneyBill,
            href: "/dashboard/admin/transactions",
        },
    ];

    const role = session?.user?.role || "user";
    const isAdmin = role === "admin";
    const isPremium = session?.user?.isPremium;
    const menuItems = isAdmin ? adminMenu : userMenu;

    return (
        // <aside className="w-64 h-screen flex-shrink-0 border-r border-gray-200 shadow-sm">
        //     <div className="h-full flex flex-col bg-white/80 backdrop-blur-xl">



        //         {/* ── User Profile Card ── */}
        //         <div className="px-4 py-4 border-b border-gray-100">
        //             <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-orange-50 border border-orange-100">

        //                 {/* Avatar */}
        //                 <div className="relative shrink-0">
        //                     <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-400 shadow-sm">
        //                         {session?.user?.image ? (
        //                             <Image
        //                                 width={40}
        //                                 height={40}
        //                                 src={session.user.image}
        //                                 alt="Avatar"
        //                                 className="object-cover w-full h-full"
        //                             />
        //                         ) : (
        //                             <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
        //                                 {session?.user?.name?.charAt(0)?.toUpperCase() || "?"}
        //                             </div>
        //                         )}
        //                     </div>
        //                     {/* Online dot */}
        //                     <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
        //                 </div>

        //                 {/* Info */}
        //                 <div className="overflow-hidden flex-1 min-w-0">
        //                     <p className="text-gray-800 text-sm font-bold truncate leading-tight">
        //                         {profile?.name || session?.user?.name}
        //                     </p>
        //                     <div className="flex items-center gap-1 mt-0.5">
        //                         {isAdmin && <FaCrown size={9} className="text-yellow-500 shrink-0" />}
        //                         <span className={`text-[11px] font-bold uppercase tracking-wide ${isAdmin ? "text-yellow-600" : isPremium ? "text-orange-500" : "text-gray-400"}`}>
        //                             {isAdmin ? "Admin" : isPremium ? "Premium" : "User"}
        //                         </span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* ── Navigation ── */}
        //         <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-0.5">

        //             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-3 pb-3">
        //                 {isAdmin ? "Admin Panel" : "My Dashboard"}
        //             </p>

        //             {menuItems.map(({ key, label, icon: Icon, href }) => {
        //                 {/* const isActive =
        //                     pathname === href ||
        //                     (href !== "/dashboard" && pathname?.startsWith(href)); */}


        //                 const isActive = pathname === href;

        //                 return (
        //                     <Link
        //                         key={key}
        //                         href={href}
        //                         className={`
        //                             relative flex items-center gap-3
        //                             px-3 py-2.5 rounded-xl
        //                             text-sm font-semibold
        //                             transition-all duration-200 group
        //                             ${isActive
        //                                 ? "text-orange-600 bg-orange-50 border border-orange-100 shadow-sm"
        //                                 : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
        //                             }
        //                         `}
        //                     >


        //                         {/* Active left bar */}
        //                         {isActive && (
        //                             <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-r-full" />
        //                         )}

        //                         {/* Icon box */}
        //                         <span className={`
        //                             w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200
        //                             ${isActive
        //                                 ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-sm shadow-orange-200"
        //                                 : "bg-gray-100 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500"
        //                             }
        //                         `}>
        //                             <Icon size={14} />
        //                         </span>

        //                         <span className="truncate">{label}</span>

        //                         {/* Active dot */}
        //                         {isActive && (
        //                             <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
        //                         )}
        //                     </Link>
        //                 );
        //             })}
        //         </nav>

        //         {/* ── Premium Banner (non-premium users) ── */}
        //         {/* {!isPremium && !isAdmin && (
        //             <div className="mx-3 mb-3">
        //                 <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 relative overflow-hidden shadow-md shadow-orange-200">
        //                     <div className="absolute -top-3 -right-3 w-16 h-16 bg-white/10 rounded-full" />
        //                     <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-white/10 rounded-full" />
        //                     <div className="flex items-center gap-2 mb-1.5">
        //                         <FaCrown size={13} className="text-yellow-200" />
        //                         <span className="text-white text-xs font-bold uppercase tracking-wide">Go Premium</span>
        //                     </div>
        //                     <p className="text-orange-100 text-[11px] leading-relaxed mb-3">
        //                         Unlock exclusive recipes and chef-level features.
        //                     </p>
        //                     <Link
        //                         href="/premium"
        //                         className="block w-full text-center py-1.5 rounded-lg bg-white text-orange-600 text-xs font-bold hover:bg-orange-50 transition-colors duration-200 shadow-sm"
        //                     >
        //                         Upgrade Now ✨
        //                     </Link>
        //                 </div>
        //             </div>
        //         )} */}

        //         {/* ── Premium Badge (premium members) ── */}
        //         {isPremium && !isAdmin && (
        //             <div className="mx-3 mb-3">
        //                 <div className="px-4 py-3 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center gap-2.5">
        //                     <div className="w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center">
        //                         <FaCrown size={13} className="text-yellow-500" />
        //                     </div>
        //                     <div>
        //                         <p className="text-yellow-700 text-xs font-bold">Premium Member</p>
        //                         <p className="text-yellow-500 text-[10px]">All features unlocked</p>
        //                     </div>
        //                 </div>
        //             </div>
        //         )}

        //         {/* ── Footer Actions ── */}
        //         <div className="px-3 py-3 border-t border-gray-100 space-y-0.5">

        //             <button
        //                 onClick={handleSignOut}
        //                 className="
        //                     w-full flex items-center gap-3
        //                     px-3 py-2.5 rounded-xl
        //                     text-sm font-semibold
        //                     text-gray-400 hover:text-red-500 hover:bg-red-50
        //                     transition-all duration-200 group cursor-pointer
        //                 "
        //             >
        //                 <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-red-100 group-hover:text-red-500 transition-all duration-200">
        //                     <FaSignOutAlt size={13} />
        //                 </span>
        //                 Logout
        //             </button>
        //         </div>
        //     </div>
        // </aside>

        <aside className="w-64 h-screen flex-shrink-0 border-r border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div className="h-full flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">

                {/* ── User Profile Card ── */}
                <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">

                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-400 dark:border-orange-500 shadow-sm">
                                {session?.user?.image ? (
                                    <Image
                                        width={40}
                                        height={40}
                                        src={session.user.image}
                                        alt="Avatar"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                                        {session?.user?.name?.charAt(0)?.toUpperCase() || "?"}
                                    </div>
                                )}
                            </div>
                            {/* Online dot */}
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white dark:border-gray-900" />
                        </div>

                        {/* Info */}
                        <div className="overflow-hidden flex-1 min-w-0">
                            <p className="text-gray-800 dark:text-gray-100 text-sm font-bold truncate leading-tight">
                                {profile?.name || session?.user?.name}
                            </p>
                            <div className="flex items-center gap-1 mt-0.5">
                                {isAdmin && <FaCrown size={9} className="text-yellow-500 shrink-0" />}
                                <span className={`text-[11px] font-bold uppercase tracking-wide ${isAdmin ? "text-yellow-600 dark:text-yellow-400" : isPremium ? "text-orange-500 dark:text-orange-400" : "text-gray-400 dark:text-gray-500"}`}>
                                    {isAdmin ? "Admin" : isPremium ? "Premium" : "User"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Navigation ── */}
                <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-0.5">

                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest px-3 pb-3">
                        {isAdmin ? "Admin Panel" : "My Dashboard"}
                    </p>

                    {menuItems.map(({ key, label, icon: Icon, href }) => {
                        const isActive = pathname === href;

                        return (
                            <Link
                                key={key}
                                href={href}
                                className={`
                            relative flex items-center gap-3
                            px-3 py-2.5 rounded-xl
                            text-sm font-semibold
                            transition-all duration-200 group
                            ${isActive
                                        ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/30 shadow-sm"
                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                    }
                        `}
                            >

                                {/* Active left bar */}
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-r-full" />
                                )}

                                {/* Icon box */}
                                <span className={`
                            w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200
                            ${isActive
                                        ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-sm shadow-orange-200 dark:shadow-none"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500 dark:group-hover:bg-orange-950/40 dark:group-hover:text-orange-400"
                                    }
                        `}>
                                    <Icon size={14} />
                                </span>

                                <span className="truncate">{label}</span>

                                {/* Active dot */}
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-orange-400 shrink-0" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Premium Banner (non-premium users) ── */}
                {/* {!isPremium && !isAdmin && (
            <div className="mx-3 mb-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 relative overflow-hidden shadow-md shadow-orange-200 dark:shadow-none">
                    <div className="absolute -top-3 -right-3 w-16 h-16 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-white/10 rounded-full" />
                    <div className="flex items-center gap-2 mb-1.5">
                        <FaCrown size={13} className="text-yellow-200" />
                        <span className="text-white text-xs font-bold uppercase tracking-wide">Go Premium</span>
                    </div>
                    <p className="text-orange-100 text-[11px] leading-relaxed mb-3">
                        Unlock exclusive recipes and chef-level features.
                    </p>
                    <Link
                        href="/premium"
                        className="block w-full text-center py-1.5 rounded-lg bg-white text-orange-600 text-xs font-bold hover:bg-orange-50 dark:hover:bg-zinc-100 transition-colors duration-200 shadow-sm"
                    >
                        Upgrade Now ✨
                    </Link>
                </div>
            </div>
        )} */}

                {/* ── Premium Badge (premium members) ── */}
                {isPremium && !isAdmin && (
                    <div className="mx-3 mb-3">
                        <div className="px-4 py-3 rounded-2xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30 flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center">
                                <FaCrown size={13} className="text-yellow-500 dark:text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-yellow-700 dark:text-yellow-400 text-xs font-bold">Premium Member</p>
                                <p className="text-yellow-500 dark:text-yellow-500/80 text-[10px]">All features unlocked</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Footer Actions ── */}
                <div className="px-3 py-3 border-t light:border-gray-200 dark:border-gray-800 space-y-0.5">
                    <button
                        onClick={handleSignOut}
                        className="
                    w-full flex items-center gap-3
                    px-3 py-2.5 rounded-xl
                    text-sm font-semibold
                    text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20
                    transition-all duration-200 group cursor-pointer
                "
                    >
                        <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-red-100 dark:group-hover:bg-red-950/40 group-hover:text-red-500 dark:group-hover:text-red-400 transition-all duration-200">
                            <FaSignOutAlt size={13} />
                        </span>
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSideBar;


