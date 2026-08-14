import React from "react";
import { getCurrentUser } from "@/features/auth/sessions";

const EmployerDashboardPage: React.FC = async () => {
    const {user} = await getCurrentUser();
    return (
        <h1>EmployerDashboardPage</h1>
    )
}

export default EmployerDashboardPage;