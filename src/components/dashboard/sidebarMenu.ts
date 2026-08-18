'use client';

import { LayoutDashboard, PlusIcon, Building2, SearchIcon, Users, Settings } from "lucide-react";

export const employerMenu = [
    {
        title: "Overview",
        href: "/dashboard/employer",
        icon: LayoutDashboard,
    },
    {
        title: "Post a Job",
        href: "/dashboard/employer/post-job",
        icon: PlusIcon,
    },
    {
        title: "My Jobs",
        href: "/dashboard/employer/my-jobs",
        icon: Building2,
    },
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
    {
        title: "Home",
        href: "/dashboard/applicant",
        icon: LayoutDashboard,
    },
    {
        title: "Find Jobs",
        href: "/dashboard/applicant/find-jobs",
        icon: SearchIcon,
    },
    {
        title: "Settings",
        href: "/dashboard/applicant/settings",
        icon: Settings,
    },
];

export const adminMenu = [

];