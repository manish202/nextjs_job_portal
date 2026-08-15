import React from "react";
import { getCurrentUser } from "@/features/auth/sessions";
import LogoutButton from "@/components/auth/LogoutButton";

const AdminDashboardPage: React.FC = async () => {
    const {user} = await getCurrentUser();
    return (
        <>
            <h1>AdminDashboardPage</h1>
            <LogoutButton />
        </>
    )
}

export default AdminDashboardPage;