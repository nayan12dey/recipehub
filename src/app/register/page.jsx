"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import {
    Button,
    Description,
    FieldError,
    Fieldset,
    Form,
    Input,
    Label,
    Surface,
    ListBox,
    Select,
    TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BsGoogle, BsGooglePlay } from "react-icons/bs";
import { CgGoogle } from "react-icons/cg";
import Loader from "@/components/Loader";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <Loader />;
    }

    const validatePassword = (password) => {
        const validationErrors = {};

        if (!password || password.length < 6) {
            validationErrors.password =
                "Password must be at least 6 characters long.";
        } else if (!/[A-Z]/.test(password)) {
            validationErrors.password =
                "Password must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(password)) {
            validationErrors.password =
                "Password must contain at least one lowercase letter.";
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData.entries());
        // console.log(userData)

        const { data, error } = await authClient.signUp.email({
            ...userData,
            plan: "free"
        })

        if (data?.error) {
            toast.error("Registration not succeed...")
        }
        else {
            setLoading(false);
            redirect("/login")
        }
    };

    const handleGoogleSignin = async () => {
        setLoading(true);

        await authClient.signIn.social({
            provider: "google",
        });
    }


    return (
        //     <div className="min-h-screen
        // bg-gradient-to-br
        // from-orange-50 via-white to-orange-100
        // dark:from-gray-950 dark:via-gray-900 dark:to-black
        // flex items-center justify-center px-4 py-12">

        //         <div className="w-full max-w-md
        // rounded-3xl
        // bg-white dark:bg-gray-900
        // shadow-xl
        // border border-gray-100 dark:border-gray-800
        // p-8">
        //             <div className="text-center">
        //                 <div className="mx-auto flex h-16 w-16
        // items-center justify-center
        // rounded-full
        // bg-orange-100 dark:bg-orange-900/30
        // text-3xl">
        //                     🍳
        //                 </div>

        //                 <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
        //                     Create Your Account
        //                 </h1>

        //                 <p className="mt-2 text-gray-500 dark:text-gray-400">
        //                     Join RecipeHub and discover thousands of delicious recipes.
        //                 </p>
        //             </div>

        //             <Surface>
        //                 <Form onSubmit={handleSubmit} className="space-y-5">
        //                     <TextField isRequired name="name">
        //                         <Label>Name</Label>
        //                         <Input placeholder="John Doe" className={"dark:bg-gray-800 dark:text-white"} />
        //                         <FieldError />
        //                     </TextField>

        //                     <TextField isRequired name="email" type="email">
        //                         <Label>Email</Label>
        //                         <Input placeholder="john@example.com"  />
        //                         <FieldError />
        //                     </TextField>

        //                     <TextField isRequired name="image" type="url">
        //                         <Label>Image URL</Label>
        //                         <Input

        //                             placeholder="https://example.com/image.jpg"
        //                         />
        //                         <FieldError />
        //                     </TextField>

        //                     <TextField isRequired name="password" className="w-full">
        //                         <Label>Password</Label>

        //                         <div className="relative w-full">
        //                             <Input
        //                                 name="password"
        //                                 type={showPassword ? "text" : "password"}
        //                                 placeholder="Password"
        //                                 className="w-full pr-10"
        //                             />

        //                             <button
        //                                 type="button"
        //                                 onClick={() => setShowPassword(!showPassword)}
        //                                 className="    absolute right-2 top-1/2 -translate-y-1/2
        // text-gray-500 dark:text-gray-400"
        //                             >
        //                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        //                             </button>
        //                         </div>

        //                         <FieldError />
        //                     </TextField>

        //                     {errors.password && (
        //                         <p className="text-sm text-red-500 dark:text-red-400">
        //                             {errors.password}
        //                         </p>
        //                     )}

        //                     {/* <Select isRequired name="role" placeholder="Select role">
        //                         <Label>Register As</Label>
        //                         <Select.Trigger>
        //                             <Select.Value />
        //                             <Select.Indicator />
        //                         </Select.Trigger>

        //                         <Select.Popover>
        //                             <ListBox>
        //                                 <ListBox.Item id="admin" textValue="admin">
        //                                     Admin
        //                                     <ListBox.ItemIndicator />
        //                                 </ListBox.Item>

        //                                 <ListBox.Item id="user" textValue="user">
        //                                     User
        //                                     <ListBox.ItemIndicator />
        //                                 </ListBox.Item>
        //                             </ListBox>
        //                         </Select.Popover>
        //                     </Select> */}

        //                     <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500">
        //                         Register
        //                     </Button>
        //                     {/* Divider */}
        //                     <div className="flex items-center gap-4">
        //                         <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
        //                         <span className="text-sm text-gray-500 dark:text-gray-400">
        //                             OR
        //                         </span>
        //                         <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
        //                     </div>

        //                     <Button
        //                         type="button"
        //                         variant="secondary"
        //                         className="w-full"
        //                         onClick={handleGoogleSignin}
        //                     >
        //                         <FcGoogle size={20} />
        //                         Continue with Google
        //                     </Button>
        //                 </Form>
        //             </Surface>
        //             <p className="mt-6 text-center text-sm text-gray-600">
        //                 Already have an account?{" "}
        //                 <Link
        //                     href="/login"
        //                     className="font-semibold text-orange-500 hover:text-orange-600"
        //                 >
        //                     Login
        //                 </Link>
        //             </p>

        //         </div>
        //     </div>

        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center px-4 py-12 transition-colors duration-300">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 p-8 transition-colors duration-300">

                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950/50 text-3xl">
                        🍳
                    </div>

                    <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-gray-50">
                        Create Your Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Join RecipeHub and discover thousands of delicious recipes.
                    </p>
                </div>

                {/* HeroUI-er Surface component auto light/dark custom text follow kore tai className wrapper dewa holo */}
                <Surface className="mt-6 bg-transparent dark:bg-transparent shadow-none border-none p-0 text-gray-900 dark:text-gray-100">
                    <Form onSubmit={handleSubmit} className="space-y-5">

                        <TextField isRequired name="name">
                            <Label className="text-gray-700 dark:text-gray-300">Name</Label>
                            <Input placeholder="John Doe"  />
                            <FieldError className="text-red-500 dark:text-red-400" />
                        </TextField>

                        <TextField isRequired name="email" type="email">
                            <Label className="text-gray-700 dark:text-gray-300">Email</Label>
                            <Input placeholder="john@example.com"  />
                            <FieldError className="text-red-500 dark:text-red-400" />
                        </TextField>

                        <TextField isRequired name="image" type="url">
                            <Label className="text-gray-700 dark:text-gray-300">Image URL</Label>
                            <Input placeholder="https://example.com/image.jpg"  />
                            <FieldError className="text-red-500 dark:text-red-400" />
                        </TextField>

                        <TextField isRequired name="password" className="w-full">
                            <Label className="text-gray-700 dark:text-gray-300">Password</Label>
                            <div className="relative w-full">
                                <Input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <FieldError className="text-red-500 dark:text-red-400" />
                        </TextField>

                        {errors.password && (
                            <p className="text-sm text-red-500 dark:text-red-400 font-medium">
                                {errors.password}
                            </p>
                        )}

                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-medium shadow-sm transition-colors">
                            Register
                        </Button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 py-1">
                            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
                            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                OR
                            </span>
                            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
                        </div>

                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                            onClick={handleGoogleSignin}
                        >
                            <FcGoogle size={20} />
                            Continue with Google
                        </Button>
                    </Form>
                </Surface>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 underline-offset-4 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

