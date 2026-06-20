import DashboardSideBar from "@/components/dashboard/DashboardSidebar";
import Navbar from "@/components/Navbar";



export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-900">
            <DashboardSideBar />

            <div className="flex-1">

                <main className="p-6">
                    {children}
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




