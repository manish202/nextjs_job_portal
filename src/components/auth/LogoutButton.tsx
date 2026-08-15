"use client";

import logoutAction from "@/app/dashboard/logoutAction";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LogoutButton = () => {
    const router = useRouter();
    const logoutUser = async (logoutType: 'current_device' | 'all_device') => {
        const {status,message} = await logoutAction(logoutType);
        status ? toast.success(message) : toast.error(message);
        if(status) router.push('/login');
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="outline">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                }
            />
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => logoutUser('current_device')}>
                    <LogOut className="mr-2 h-4 w-4" /> Current device
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logoutUser('all_device')}>
                    <LogOut className="mr-2 h-4 w-4" /> All devices
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default LogoutButton;