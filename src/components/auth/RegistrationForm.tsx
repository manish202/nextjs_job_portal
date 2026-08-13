"use client";
import Link from "next/link";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {registrationSchema} from "@/zod_schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import registrationAction from "@/app/register/registrationAction";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC = () => {
    const router = useRouter();
    const form = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            name: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "applicant",
        },
    });
    const onSubmit = async (data: RegistrationFormData) => {
        const {status,message} = await registrationAction(data);
        if(status){
            toast.success(message);
            router.push('/login');
        }else{
            toast.error(message);
        }
    }
    return (
        <div className="mx-auto w-full max-w-md">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Join Our Job Portal
                </p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" {...form.register("name")} />
                    {form.formState.errors.name && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.name.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="userName">Username</Label>
                    <Input id="userName" placeholder="john_doe" {...form.register("userName")} />
                    {form.formState.errors.userName && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.userName.message}
                        </p>
                    )}
                </div>
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
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" {...form.register("confirmPassword")} />
                    {form.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>I Am A*</Label>
                    <Controller name="role" control={form.control}
                        render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="applicant">
                                    applicant
                                </SelectItem>
                                <SelectItem value="employer">
                                    employer
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        )}
                    />
                    {form.formState.errors.role && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.role.message}
                        </p>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
            </form>
            <p className="mt-2 text-sm text-muted-foreground">
                Already have account ? <Link href="/login" className="text-black">Sign in here</Link>
            </p>
        </div>
    );
}

export default RegistrationForm;