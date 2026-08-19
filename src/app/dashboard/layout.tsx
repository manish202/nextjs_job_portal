import React from "react";
import type { LucideIcon } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import { employerMenu, applicantMenu, adminMenu } from "@/components/dashboard/sidebarMenu";
import { getCurrentUser } from "@/features/auth/sessions";

interface MenuItems{
    title: string,
    href: string,
    icon: LucideIcon
}

const EmployerLayout = async ({children}: Readonly<{children: React.ReactNode}>) => {
    const {user} = await getCurrentUser();
    let menuItems: MenuItems[] = [];
    switch(user?.role){
        case 'admin': menuItems = adminMenu; break;
        case 'applicant': menuItems = applicantMenu; break;
        case 'employer': menuItems = employerMenu; break;
    }
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar menuItems={menuItems} user={user!} />
            <main className="min-w-0 flex-1">
                <div className="mx-auto max-w-7xl p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

export const dynamic = "force-dynamic";
export default EmployerLayout;