"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function DashboardOverview() {

    const { data: session } = useSession();

    const [stats, setStats] = useState({});

    useEffect(() => {
        fetch(
            `http://localhost:5000/dashboard-stats/${session?.user?.email}`
        )
            .then((res) => res.json())
            .then((data) => setStats(data));
    }, []);

    return (
        <div className="grid grid-cols-4 gap-5">

            <div className="card">
                Total Recipes: {stats.totalRecipes || 0}
            </div>

            <div className="card">
                Favorites: {stats.totalFavorites || 0}
            </div>

            <div className="card">
                Likes: {stats.totalLikes || 0}
            </div>


        </div>
    );
}