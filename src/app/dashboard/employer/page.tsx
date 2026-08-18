import React from "react";
import { getCurrentUserDetails } from "@/features/auth/sessions";
import { WelcomeCard, OverviewCard, ProfileIncompleteWarning } from "@/components/dashboard/OverviewCards";

const EmployerDashboardPage: React.FC = async () => {
    const {status,message,user,userDetails} = await getCurrentUserDetails('employer');
    const {description,avatarUrl,organizationType,yearOfEstablishment}:any = userDetails;
    const isProfileCompleted = description && avatarUrl && organizationType && yearOfEstablishment;
    return (
        <div className="space-y-8">
            <WelcomeCard name={user?.name} />
            <div className="grid gap-5 md:grid-cols-2">
                <OverviewCard cls="bg-blue-50 text-blue-600" icon="briefcase" title="Open Jobs" nums="500" />
                <OverviewCard cls="bg-purple-50 text-purple-600" icon="users" title="Saved Candidates" nums="2,500" />
            </div>
            {!isProfileCompleted && (
                <ProfileIncompleteWarning
                    title="Your employer profile is incomplete"
                    desc="Complete your profile to attract more candidates and improve your hiring experience."
                    settingPage="/dashboard/employer/settings"
                />
            )}
        </div>
    )
}

export default EmployerDashboardPage;