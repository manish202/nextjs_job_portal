'use client';

import { LayoutDashboard, PlusIcon, Building2, Users, Settings } from "lucide-react";

export const employerMenu = [
    {
        title: "Overview",
        href: "/dashboard/employer",
        icon: LayoutDashboard,
    },
    // {
    //     title: "Post a Job",
    //     href: "/dashboard/employer/post-job",
    //     icon: PlusIcon,
    // },
    // {
    //     title: "My Jobs",
    //     href: "/dashboard/employer/my-jobs",
    //     icon: Building2,
    // },
    // {
    //     title: "Saved Candidates",
    //     href: "/dashboard/employer/saved-candidates",
    //     icon: Users,
    // },
    {
        title: "Settings",
        href: "/dashboard/employer/settings",
        icon: Settings,
    },
];

export const applicantMenu = [
    
];

export const adminMenu = [

];