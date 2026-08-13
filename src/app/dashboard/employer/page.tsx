import React from "react";
import { getCurrentUser } from "@/features/auth/sessions";

const EmployerDashboardPage: React.FC = async () => {
    const {status, message, user} = await getCurrentUser();
    if(!status) return <h1>{message}</h1>
    console.log({status, message, user});
    return (
        <h1>EmployerDashboardPage</h1>
    )
}

export default EmployerDashboardPage;