import EmployerSettingsForm from "@/components/dashboard/EmployerSettingsForm";
import { getCurrentUserDetails } from "@/features/auth/sessions";

const EmployerSettingsPage = async () => {
    const {status,message,user,userDetails} = await getCurrentUserDetails('employer');
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
            <EmployerSettingsForm userDetails={userDetails} />
        </div>
    )
}

export default EmployerSettingsPage;