import React from "react";
import { getCurrentUser } from "@/features/auth/sessions";
import { WelcomeCard } from "@/components/dashboard/OverviewCards";

const ApplicantDashboardPage: React.FC = async () => {
    const {user} = await getCurrentUser();
    return (
        <div className="space-y-8">
            <WelcomeCard name={user?.name} />
        </div>
    )
}

export default ApplicantDashboardPage;