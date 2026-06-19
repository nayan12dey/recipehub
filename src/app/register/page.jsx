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

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

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

        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData.entries());
        // console.log(userData)

        const {data, error} = await authClient.signUp.email({
            ...userData,
            plan: "free"
        }) 

        if(data?.error){
            toast.error("Registration not succeed...")
        }
        else{   
            redirect("/login")
        }

       
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 py-12">

            <div className="w-full max-w-md rounded-3xl bg-white shadow-xl p-8">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
                        🍳
                    </div>

                    <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                        Create Your Account
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Join RecipeHub and discover thousands of delicious recipes.
                    </p>
                </div>

                <Surface>
                    <Form onSubmit={handleSubmit} className="space-y-5">
                        <TextField isRequired name="name">
                            <Label>Name</Label>
                            <Input placeholder="John Doe" />
                            <FieldError />
                        </TextField>

                        <TextField isRequired name="email" type="email">
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>

                        <TextField isRequired name="image" type="url">
                            <Label>Image URL</Label>
                            <Input

                                placeholder="https://example.com/image.jpg"
                            />
                            <FieldError />
                        </TextField>

                        <TextField isRequired name="password" className="w-full">
                            <Label>Password</Label>

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
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <FieldError />
                        </TextField>

                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}

                        <Select isRequired name="role" placeholder="Select role">
                            <Label>Register As</Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>

                            <Select.Popover>
                                <ListBox>
                                    {/* <ListBox.Item id="admin" textValue="admin">
                                        Admin
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item> */}

                                    <ListBox.Item id="user" textValue="user">
                                        User
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500">
                            Register
                        </Button>
                        {/* Divider */}
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
                        >
                            <FcGoogle size={20} />
                            Continue with Google
                        </Button>
                    </Form>
                </Surface>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-orange-500 hover:text-orange-600"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

