"use client";

import { useEffect, useState } from "react";
import { FaCreditCard, FaCheckCircle, FaTimesCircle, FaReceipt, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import { authClient, useSession } from "@/lib/auth-client";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!session?.user?.email) return;

            setLoading(true);

            try {
                const { data: token } = await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/payments`,
                    {
                        headers: {
                            authorization: `Bearer ${token?.token} `,
                        },
                    }
                );

                const data = await res.json();

                setTransactions(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();


    }, [session]);

    if (loading) {
        return <Loader />;
    }

    return (
        //         <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4 overflow-hidden">
        //             {/* Ambient Lighting Glow (Signature Theme Component) */}
        //             <div className="absolute top-12 -left-24 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        //             <div className="absolute bottom-12 -right-24 w-96 h-96 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        //             <motion.div
        //                 initial={{ opacity: 0, y: 20 }}
        //                 animate={{ opacity: 1, y: 0 }}
        //                 transition={{ duration: 0.4 }}
        //                 className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/90 backdrop-blur-md rounded-3xl shadow-xl dark:shadow-none border border-orange-100/40 dark:border-gray-700 overflow-hidden relative z-10"
        //             >
        //                 {/* Brand Header Header */}
        //                 <div className="px-8 py-6 
        // bg-white dark:bg-gray-900 
        // border-b border-gray-100 dark:border-gray-700 
        // flex items-center justify-between flex-wrap gap-4">

        //                     <div className="flex items-center gap-3.5">

        //                         {/* Icon */}
        //                         <div className="p-3 
        //         bg-orange-100 dark:bg-orange-500/10 
        //         text-orange-600 dark:text-orange-300 
        //         rounded-2xl">
        //                             <FaCreditCard className="text-xl" />
        //                         </div>

        //                         {/* Text */}
        //                         <div>
        //                             <h2 className="text-2xl font-bold 
        //             text-gray-800 dark:text-white 
        //             tracking-tight">
        //                                 Transactions
        //                             </h2>

        //                             <p className="text-xs 
        //             text-gray-500 dark:text-gray-400 
        //             mt-0.5">
        //                                 Real-time ledger of incoming premium upgrades
        //                             </p>
        //                         </div>

        //                     </div>

        //                     {/* Badge */}
        //                     <span className="bg-orange-500 
        //     text-white text-xs font-semibold 
        //     px-4 py-2 rounded-xl 
        //     shadow-sm">
        //                         Processed: {transactions.length} Txns
        //                     </span>

        //                 </div>

        //                 {/* Glassmorphic Table Ledger */}
        //                 <div className="overflow-x-auto">
        //                     <table className="w-full table-fixed text-left border-collapse">
        //                         <thead>
        //                             <tr className="bg-gray-50/60 dark:bg-gray-800 text-gray-400 dark:text-gray-300 text-[11px] uppercase tracking-widest font-black font-mono border-b border-orange-100/20 dark:border-gray-700">
        //                                 <th className="w-[30%] py-4 px-8">User Account</th>
        //                                 <th className="w-[15%] py-4 px-6">Amount</th>
        //                                 <th className="w-[18%] py-4 px-6">Data</th>
        //                                 <th className="w-[15%] py-4 px-6">Payment Status</th>
        //                                 <th className="w-[22%] py-4 px-8 text-right">Transaction ID</th>
        //                             </tr>
        //                         </thead>

        //                         <tbody className="divide-y divide-gray-100/50 dark:divide-gray-700 text-sm">
        //                             {transactions.map((payment) => {
        //                                 const isPaid = payment.paymentStatus === "paid";

        //                                 return (
        //                                     <tr
        //                                         key={payment._id}
        //                                         className="hover:bg-orange-50/30 dark:hover:bg-gray-800 transition-all duration-200 group"
        //                                     >
        //                                         {/* User Column */}
        //                                         <td className="py-4 px-8">
        //                                             <span className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 block truncate">
        //                                                 {payment.userEmail}
        //                                             </span>
        //                                         </td>

        //                                         {/* Amount Column */}
        //                                         <td className="py-4 px-6">
        //                                             <span className="text-base font-black text-gray-800 dark:text-white font-sans tracking-tight">
        //                                                 ${payment.amount}
        //                                             </span>
        //                                         </td>

        //                                         {/* Date Column */}
        //                                         <td className="py-4 px-6">
        //                                             <div className="flex items-center gap-2 text-gray-500 font-medium text-xs">
        //                                                 <FaCalendarAlt className="text-gray-400 text-[11px]" />
        //                                                 <span>
        //                                                     {new Date(payment.purchasedAt).toLocaleDateString(undefined, {
        //                                                         year: 'numeric',
        //                                                         month: 'short',
        //                                                         day: 'numeric'
        //                                                     })}
        //                                                 </span>
        //                                             </div>
        //                                         </td>

        //                                         {/* Status Badge Column */}
        //                                         <td className="py-4 px-6">
        //                                             {isPaid ? (
        //                                                 <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-xl text-xs font-bold border border-emerald-100/50">
        //                                                     <FaCheckCircle className="text-xs" /> Paid
        //                                                 </span>
        //                                             ) : (
        //                                                 <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-2.5 py-1 rounded-xl text-xs font-bold border border-red-100/50">
        //                                                     <FaTimesCircle className="text-xs" /> {payment.paymentStatus || "failed"}
        //                                                 </span>
        //                                             )}
        //                                         </td>

        //                                         {/* Transaction Reference ID */}
        //                                         <td className="py-4 px-8 text-right">
        //                                             <div className="inline-flex items-center justify-end gap-1.5 bg-gray-50 group-hover:bg-orange-50/50 border border-gray-100 max-w-full px-2.5 py-1.5 rounded-xl transition-colors">
        //                                                 <FaReceipt className="text-gray-400 text-[10px] shrink-0" />
        //                                                 <span className="text-xs text-gray-500 font-mono tracking-tighter truncate max-w-[150px] md:max-w-[180px]">
        //                                                     {payment.stripeSessionId}
        //                                                 </span>
        //                                             </div>
        //                                         </td>
        //                                     </tr>
        //                                 );
        //                             })}
        //                         </tbody>
        //                     </table>
        //                 </div>

        //                 {/* Empty State Structure */}
        //                 {transactions.length === 0 && (
        //                     <div className="text-center py-16 text-gray-400 dark:text-gray-500 text-sm font-mono tracking-tight bg-white/50 dark:bg-gray-900">
        //                         No transaction logs processed through the gateway pipeline.
        //                     </div>
        //                 )}
        //             </motion.div>
        //         </div>



        <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4 overflow-hidden">

            {/* Ambient Glow */}
            <div className="absolute top-12 -left-24 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-12 -right-24 w-96 h-96 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/90 backdrop-blur-md rounded-3xl shadow-xl dark:shadow-none border border-orange-100/40 dark:border-gray-700 overflow-hidden relative z-10"
            >

                {/* Header (UNCHANGED) */}
                <div className="px-8 py-6 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap gap-4">

                    <div className="flex items-center gap-3.5">
                        <div className="p-3 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-300 rounded-2xl">
                            <FaCreditCard className="text-xl" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                                Transactions
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                Real-time ledger of incoming premium upgrades
                            </p>
                        </div>
                    </div>

                    <span className="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm">
                        Processed: {transactions.length} Txns
                    </span>
                </div>

                {/* ================= TABLE (LG+) ================= */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full table-fixed text-left border-collapse">

                        <thead>
                            <tr className="bg-gray-50/60 dark:bg-gray-800 text-gray-400 dark:text-gray-300 text-[11px] uppercase tracking-widest font-black font-mono border-b border-orange-100/20 dark:border-gray-700">
                                <th className="w-[30%] py-4 px-8">User Account</th>
                                <th className="w-[15%] py-4 px-6">Amount</th>
                                <th className="w-[18%] py-4 px-6">Data</th>
                                <th className="w-[15%] py-4 px-6">Payment Status</th>
                                <th className="w-[22%] py-4 px-8 text-right">Transaction ID</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100/50 dark:divide-gray-700 text-sm">
                            {transactions.map((payment) => {
                                const isPaid = payment.paymentStatus === "paid";

                                return (
                                    <tr
                                        key={payment._id}
                                        className="hover:bg-orange-50/30 dark:hover:bg-gray-800 transition-all duration-200 group"
                                    >
                                        <td className="py-4 px-8">
                                            <span className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 block truncate">
                                                {payment.userEmail}
                                            </span>
                                        </td>

                                        <td className="py-4 px-6">
                                            <span className="text-base font-black text-gray-800 dark:text-white">
                                                ${payment.amount}
                                            </span>
                                        </td>

                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 text-gray-500 font-medium text-xs">
                                                <FaCalendarAlt className="text-gray-400 text-[11px]" />
                                                <span>
                                                    {new Date(payment.purchasedAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6">
                                            {isPaid ? (
                                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-xl text-xs font-bold border border-emerald-100/50">
                                                    <FaCheckCircle className="text-xs" /> Paid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-2.5 py-1 rounded-xl text-xs font-bold border border-red-100/50">
                                                    <FaTimesCircle className="text-xs" />
                                                    {payment.paymentStatus || "failed"}
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-4 px-8 text-right">
                                            <div className="inline-flex items-center justify-end gap-1.5 bg-gray-50 group-hover:bg-orange-50/50 border border-gray-100 px-2.5 py-1.5 rounded-xl">
                                                <FaReceipt className="text-gray-400 text-[10px]" />
                                                <span className="text-xs text-gray-500 font-mono truncate max-w-[150px]">
                                                    {payment.stripeSessionId}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>

                {/* ================= CARD (MOBILE + TABLET < LG) ================= */}
                <div className="lg:hidden space-y-3 p-4">

                    {transactions.map((payment) => {
                        const isPaid = payment.paymentStatus === "paid";

                        return (
                            <div
                                key={payment._id}
                                className="bg-white dark:bg-gray-900 border border-orange-100/40 rounded-2xl p-4 shadow-sm"
                            >

                                {/* Top */}
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-gray-700 dark:text-gray-200 text-sm truncate">
                                        {payment.userEmail}
                                    </span>

                                    {isPaid ? (
                                        <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-xl text-xs font-bold border border-emerald-100">
                                            Paid
                                        </span>
                                    ) : (
                                        <span className="bg-red-50 text-red-600 px-2 py-1 rounded-xl text-xs font-bold border border-red-100">
                                            {payment.paymentStatus || "failed"}
                                        </span>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="text-xs text-gray-600 space-y-1">
                                    <p><span className="font-medium">Amount:</span> ${payment.amount}</p>

                                    <p className="flex items-center gap-1">
                                        <FaCalendarAlt className="text-gray-400 text-[10px]" />
                                        {new Date(payment.purchasedAt).toLocaleDateString()}
                                    </p>

                                    <p className="truncate">
                                        <span className="font-medium">ID:</span> {payment.stripeSessionId}
                                    </p>
                                </div>

                            </div>
                        );
                    })}
                </div>

                {/* Empty */}
                {transactions.length === 0 && (
                    <div className="text-center py-16 text-gray-400 dark:text-gray-500 text-sm font-mono">
                        No transaction logs processed through the gateway pipeline.
                    </div>
                )}

            </motion.div>
        </div>
    );
}