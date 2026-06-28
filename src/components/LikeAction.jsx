"use client";

import { authClient } from "@/lib/auth-client";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LikeAction({ recipeId }) {
    const router = useRouter();

    const handleLike = async () => {

        const {data: token} = await authClient.token()
        console.log(token)


        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/like/${recipeId}`,
            {
                method: "PATCH",
                headers:{
                    authorization: `Bearer ${token?.token}`,
                }
            }
        );

        const data = await res.json();
        console.log(data)

        if (data.message === "Already Liked") {
            toast.error(
                "You already liked this recipe"
            );
            return;
        }

        if (res.ok) {
            toast.success(
                "Recipe liked"
            );
            router.refresh();
        }
    };

    return (
        <button onClick={handleLike} className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-600 font-semibold text-sm border border-pink-200 hover:border-pink-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
            <Heart className="w-4 h-4" />
            Like Recipe
        </button>
    );
}