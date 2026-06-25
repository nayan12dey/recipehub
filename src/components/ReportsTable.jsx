"use client";

import { FaTrash, FaTimes } from "react-icons/fa";

const ReportsTable = ({
    reports,
    handleDismiss,
    handleRemoveRecipe,
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">

                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                            Recipe
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                            Reporter
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                            Reason
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                            Status
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {reports.map((report) => (

                        <tr
                            key={report._id}
                            className="border-b hover:bg-gray-50 transition"
                        >
                            <td className="px-6 py-5 font-medium text-gray-800">
                                {report.recipeName}
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-600">
                                {report.reporterEmail}
                            </td>

                            <td className="px-6 py-5">

                                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                                    {report.reason}
                                </span>

                            </td>

                            <td className="px-6 py-5">

                                {report.status === "pending" && (
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        Pending
                                    </span>
                                )}

                                {report.status === "dismissed" && (
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                                        Dismissed
                                    </span>
                                )}

                                {report.status === "resolved" && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        Resolved
                                    </span>
                                )}

                            </td>

                            <td className="px-6 py-5">

                                {report.status === "pending" ? (

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() =>
                                                handleRemoveRecipe(
                                                    report.recipeId,
                                                    report._id
                                                )
                                            }
                                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition"
                                        >
                                            <FaTrash size={11} />
                                            Remove
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDismiss(
                                                    report._id
                                                )
                                            }
                                            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition"
                                        >
                                            <FaTimes size={11} />
                                            Dismiss
                                        </button>

                                    </div>

                                ) : (

                                    <div className="text-center text-sm text-gray-400">
                                        No Actions
                                    </div>

                                )}

                            </td>
                        </tr>

                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default ReportsTable;