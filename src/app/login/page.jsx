
"use client";

import { useState } from "react";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    Surface,
    TextField,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import Loader from "@/components/Loader";


export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);



    const router = useRouter();

    if (loading) {
        return <Loader />;
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData.entries());
        // console.log(userData)

        const { data, error } = await authClient.signIn.email({
            ...userData,
        })

        // console.log(data, error)

        if (error) {
            toast.error(error.message)
            setLoading(false);
        }
        else {
            router.push("/")
        }

    }

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }




    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-3xl bg-white shadow-xl p-8">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
                        🍳
                    </div>

                    <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="my-2 text-gray-500">
                        Login to continue your RecipeHub journey.
                    </p>
                </div>

                <Surface>
                    <Form onSubmit={handleSubmit} className="space-y-5">

                        <TextField isRequired name="email" type="email">
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>

                        <TextField isRequired name="password">
                            <Label>Password</Label>

                            <div className="relative w-full">
                                <Input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full pr-10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            <FieldError />
                        </TextField>

                        {error && (
                            <p className="text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-500"
                        >
                            Login
                        </Button>

                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <span className="text-sm text-gray-500">
                                OR
                            </span>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>

                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full"
                            onClick={handleGoogleSignin}
                        >
                            <FcGoogle size={20} />
                            Continue with Google
                        </Button>
                    </Form>
                </Surface>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-orange-500 hover:text-orange-600"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}