"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {loginSchema} from "@/zod_schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import loginAction from "@/app/login/loginAction";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
    const router = useRouter();
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: LoginFormData) => {
        const {status,message,role} = await loginAction(data);
        if(status){
            toast.success(message);
            // redirect user based upon role.
            switch(role){
                case "admin": return router.push('/dashboard/admin');
                case "applicant": return router.push('/dashboard/applicant');
                case "employer": return router.push('/dashboard/employer');
            }
        }else{
            toast.error(message);
        }
    };
    return (
        <div className="mx-auto w-full max-w-md">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Login At Our Job Portal
                </p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" {...form.register("email")} />
                    {form.formState.errors.email && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" {...form.register("password")} />
                    {form.formState.errors.password && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Login..." : "Login"}
                </Button>
            </form>
            <p className="mt-2 text-sm text-muted-foreground">
                Don't have account ? <Link href="/register" className="text-black">Sign up here</Link>
            </p>
        </div>
    );
}

export default LoginForm;