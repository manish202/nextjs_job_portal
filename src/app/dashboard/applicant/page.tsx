import React from "react";
import { getCurrentUserDetails } from "@/features/auth/sessions";
import { WelcomeCard, OverviewCard, ProfileIncompleteWarning } from "@/components/dashboard/OverviewCards";
import AppliedJobsTable from "@/components/dashboard/AppliedJobsTable";

const ApplicantDashboardPage: React.FC = async () => {
    const {status,message,user,userDetails} = await getCurrentUserDetails('applicant');
    const {biography,dateOfBirth,nationality,experience,websiteUrl,location}:any = userDetails;
    const isProfileCompleted = biography && dateOfBirth && nationality && experience && websiteUrl && location;
    return (
        <div className="space-y-8">
            <WelcomeCard name={user?.name} />
            <div className="grid gap-5 md:grid-cols-2">
                <OverviewCard cls="bg-blue-50 text-blue-600" icon="briefcase" title="Applied Jobs" nums="200" />
                <OverviewCard cls="bg-purple-50 text-purple-600" icon="users" title="Favourite Jobs" nums="600" />
            </div>
            {!isProfileCompleted && (
                <ProfileIncompleteWarning
                    title="Your applicant profile is incomplete"
                    desc="Complete your profile to attract more recuriters and improve your job experience."
                    settingPage="/dashboard/applicant/settings"
                />
            )}
            <AppliedJobsTable />
        </div>
    )
}

export default ApplicantDashboardPage;