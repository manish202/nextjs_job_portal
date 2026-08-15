import React from "react";
import { getCurrentUser } from "@/features/auth/sessions";
import LogoutButton from "@/components/auth/LogoutButton";

const ApplicantDashboardPage: React.FC = async () => {
    const {user} = await getCurrentUser();
    return (
        <>
            <h1>ApplicantDashboardPage</h1>
            <LogoutButton />
        </>
    )
}

export default ApplicantDashboardPage;