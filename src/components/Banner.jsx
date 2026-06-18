
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
    return (
        <section className="relative h-[85vh] overflow-hidden">
            {/* Background Image */}
            <Image
                src="https://plus.unsplash.com/premium_photo-1728412897842-06f0fc4c2ec6?q=80&w=1245&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

                alt="Recipe Banner"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="max-w-4xl px-6 text-center text-white">
                    <span className="mb-4 inline-block rounded-full border border-orange-400/30 bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-300">
                        🍽️ Discover Delicious Recipes
                    </span>

                    <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                        Cook Amazing Meals
                        <span className="block text-orange-400">
                            Right From Your Kitchen
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
                        Explore thousands of delicious recipes, learn cooking tips,
                        and create unforgettable meals for your family and friends.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/recipes"
                            className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-600 hover:scale-102"
                        >
                            Browse Recipes
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                        >
                            Join Community
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        
    );
}




