import ApplicantSettingPage from "@/components/dashboard/ApplicantSettingPage";
import { getCurrentUserDetails } from "@/features/auth/sessions";

const ApplicantSettingsPage = async () => {
    const {status,message,user,userDetails} = await getCurrentUserDetails('applicant');
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
            <ApplicantSettingPage userDetails={userDetails} />
        </div>
    )
}

export default ApplicantSettingsPage;