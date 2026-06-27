import DashboardSideBar from "@/components/dashboard/DashboardSidebar";
import Navbar from "@/components/Navbar";



export default function DashboardLayout({ children }) {
    return (
        // <div className="flex min-h-screen bg-gray-50">
        //     <DashboardSideBar />

        //     <div className="flex-1">

        //         <main className="p-6">
        //             {children}
        //         </main>
        //     </div>
        // </div>

        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Sidebar Wrapper */}
            <div className="border-r border-gray-200/80 dark:border-gray-800/60 bg-white dark:bg-gray-900 transition-colors duration-300">
                <DashboardSideBar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
            
                {/* <Navbar /> */}

                <main className="p-6 md:p-8 flex-1 bg-transparent text-gray-900 dark:text-gray-100">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}









// export default function DashboardLayout({ children }) {
//     return (
//         <div className="flex h-screen bg-background">
//             <div className="flex flex-1 overflow-hidden">
//                 <div>Sidebar</div>

//                 <div className="flex flex-1 overflow-y-auto">

//                     <main className="p-5">
//                         {/* <div>Navbar</div> */}
//                         {children}
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// }




