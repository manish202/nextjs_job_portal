'use client';

import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseBusiness, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const icons = {
    briefcase: BriefcaseBusiness,
    users: Users,
};

export const WelcomeCard = ({name}:{name:string|undefined}) => {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hello, {name}</h1>
            <p className="mt-2 text-sm text-gray-500">
                Welcome back! Here's an overview of your account and activity.
            </p>
        </div>
    )
}

interface OverviewCardProps {
    cls: string;
    icon: keyof typeof icons;
    title: string;
    nums: string;
}

export const OverviewCard = ({cls,icon,title,nums}: OverviewCardProps) => {
    const Icon: LucideIcon = icons[icon];
    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
                <div className="flex items-start justify-between">
                    <div>
                        <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${cls}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <h2 className="mt-1 text-3xl font-bold text-gray-900">{nums}</h2>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export const ProfileIncompleteWarning = () => {
    return (
        <Card className="border border-amber-200 bg-amber-50 shadow-sm">
            <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-medium text-amber-900">
                            Your employer profile is incomplete
                        </p>
                        <p className="text-sm text-amber-700">
                            Complete your profile to attract more candidates and
                            improve your hiring experience.
                        </p>
                    </div>
                </div>
                <Link
                    href="/dashboard/employer/settings"
                    className="shrink-0 text-sm font-semibold text-amber-700 underline underline-offset-4 hover:text-amber-900"
                >
                    Complete Profile
                </Link>
            </CardContent>
        </Card>
    )
}