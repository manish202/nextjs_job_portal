import React from "react";
import { getCurrentUser } from "@/features/auth/sessions";

const AdminDashboardPage: React.FC = async () => {
    const {user} = await getCurrentUser();
    return (
        <h1>AdminDashboardPage</h1>
    )
}

export default AdminDashboardPage;