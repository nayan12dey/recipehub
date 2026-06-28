"use client";

import DashboardSideBar from "@/components/dashboard/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Menu } from "lucide-react";



export default function DashboardLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        //         // <div className="flex min-h-screen bg-gray-50">
        //         //     <DashboardSideBar />

        //         //     <div className="flex-1">

        //         //         <main className="p-6">
        //         //             {children}
        //         //         </main>
        //         //     </div>
        //         // </div>

        // <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        //     {/* Sidebar Wrapper */}
        //     <div className="border-r border-gray-200/80 dark:border-gray-800/60 bg-white dark:bg-gray-900 transition-colors duration-300">
        //         <DashboardSideBar />
        //     </div>

        //     {/* Main Content Area */}
        //     <div className="flex-1 flex flex-col min-w-0">

        //         {/* <Navbar /> */}

        //         <main className="p-6 md:p-8 flex-1 bg-transparent text-gray-900 dark:text-gray-100">
        //             <div className="max-w-7xl mx-auto">
        //                 {children}
        //             </div>
        //         </main>
        //     </div>
        // </div>

        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:static
        top-16 lg:top-0
        left-0
        h-[calc(100vh-4rem)] lg:h-screen
        w-72
        z-40
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        transform transition-transform duration-300 ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <DashboardSideBar />
            </div>

            {/* Main Content */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Mobile Navbar */}
                <div className="flex h-16 items-center border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Main Area */}
                <main className="flex-1 p-4 text-gray-900 dark:text-gray-100 md:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}







