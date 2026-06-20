"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

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
} from "react-icons/fa";

const DashboardSideBar = () => {
    const { data: session } = useSession();

    const handleLogout = async () => {


    };

    const userMenu = [
        {
            key: "overview",
            label: "Overview",
            icon: FaHome,
            href: "/dashboard",
        },
        {
            key: "add-recipe",
            label: "Add Recipe",
            icon: FaPlus,
            href: "/dashboard/add-recipe",
        },
        {
            key: "my-recipes",
            label: "My Recipes",
            icon: FaBookOpen,
            href: "/dashboard/my-recipes",
        },
        {
            key: "favorites",
            label: "Favorites",
            icon: FaHeart,
            href: "/dashboard/favorites",
        },
        {
            key: "purchased",
            label: "Purchased",
            icon: FaShoppingCart,
            href: "/dashboard/purchased",
        },
        {
            key: "profile",
            label: "Profile",
            icon: FaUserCircle,
            href: "/dashboard/profile",
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
            href: "/dashboard/manage-users",
        },
        {
            key: "manage-recipes",
            label: "Manage Recipes",
            icon: FaUtensils,
            href: "/dashboard/manage-recipes",
        },
        {
            key: "reports",
            label: "Reports",
            icon: FaFlag,
            href: "/dashboard/reports",
        },
        {
            key: "transactions",
            label: "Transactions",
            icon: FaMoneyBill,
            href: "/dashboard/transactions",
        },
    ];

    const role = session?.user?.role || "user";

    const menuItems =
        role === "admin"
            ? adminMenu
            : userMenu;

    return (
        <aside className="w-64 h-screen border-r border-white/5">
            <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">

                {/* User Profile */}
                <div className="px-6 py-5 border-b border-white/5">
                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 shrink-0">

                            <Image
                                width={40}
                                height={40}
                                src={
                                    session?.user?.image
                                }
                                alt="Avatar"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="overflow-hidden">
                            <p className="text-white text-sm font-bold truncate">
                                {session?.user?.name || "Guest User"}
                            </p>

                            <span
                                className={`text-xs font-semibold uppercase
                ${role === "admin"
                                        ? "text-yellow-400"
                                        : "text-green-400"
                                    }`}
                            >
                                {role}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">

                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3 pb-2">
                        Navigation
                    </p>

                    {menuItems.map(
                        ({ key, label, icon: Icon, href }) => (
                            <Link
                                key={key}
                                href={href}
                                className="
                  flex items-center gap-3
                  px-3 py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  text-slate-400
                  hover:text-white
                  hover:bg-white/5
                  transition-all
                "
                            >
                                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Icon size={18} />
                                </span>

                                <span>{label}</span>
                            </Link>
                        )
                    )}
                </nav>

                {/* Premium Badge */}
                {session?.user?.isPremium && (
                    <div className="mx-4 mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-center gap-2 text-yellow-400">
                            <FaCrown />
                            <span className="text-sm font-semibold">
                                Premium Member
                            </span>
                        </div>
                    </div>
                )}

                {/* Bottom Buttons */}
                <div className="px-3 py-4 border-t border-white/5 space-y-1">

                    {/* <Link
                        href="/"
                        className="
              flex items-center gap-3
              px-3 py-3
              rounded-xl
              text-sm
              font-semibold
              text-slate-400
              hover:text-white
              hover:bg-white/5
              transition-all
            "
                    >
                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                            <FaHome size={15} />
                        </span>

                        Back to Site
                    </Link> */}

                    <button
                        onClick={handleLogout}
                        className="
              w-full
              flex items-center gap-3
              px-3 py-3
              rounded-xl
              text-sm
              font-semibold
              text-slate-400
              hover:text-red-400
              hover:bg-red-500/10
              transition-all
              cursor-pointer
            "
                    >
                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                            <FaSignOutAlt size={15} />
                        </span>

                        Logout
                    </button>

                </div>

            </div>
        </aside>
    );
};

export default DashboardSideBar;