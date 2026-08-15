import React from "react";
import { getCurrentUser } from "@/features/auth/sessions";
import LogoutButton from "@/components/auth/LogoutButton";

const EmployerDashboardPage: React.FC = async () => {
    const {user} = await getCurrentUser();
    return (
        <>
            <h1>EmployerDashboardPage</h1>
            <LogoutButton />
        </>
    )
}

export default EmployerDashboardPage;