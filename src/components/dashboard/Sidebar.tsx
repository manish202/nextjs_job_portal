"use client";

import type { LucideIcon } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MenuItems{
    title: string,
    href: string,
    icon: LucideIcon
}

const Sidebar = ({menuItems,user}: {menuItems:MenuItems[],user:{name:string,role:"admin" | "applicant" | "employer" | null}}) => {
    const pathname = usePathname();
    return (
        <aside className="flex h-screen w-72 flex-col border-r bg-white">
            <div className="border-b px-5 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">
                            {user.role === 'admin' && 'Admin Account'}
                            {user.role === 'applicant' && 'Applicant Account'}
                            {user.role === 'employer' && 'Employer Account'}
                        </p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.href === pathname;
                    return (
                        <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",isActive ? "bg-primary text-primary-foreground" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900")}>
                            <Icon className="h-5 w-5" />
                            <span>{item.title}</span>
                        </Link>
                    )
                })}
            </nav>
            <div className="border-t p-4">
                <LogoutButton />
            </div>
        </aside>
    )
}

export default Sidebar;