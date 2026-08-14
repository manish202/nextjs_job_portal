import React from "react";
import { getCurrentUser } from "@/features/auth/sessions";

const ApplicantDashboardPage: React.FC = async () => {
    const {user} = await getCurrentUser();
    return (
        <h1>ApplicantDashboardPage</h1>
    )
}

export default ApplicantDashboardPage;