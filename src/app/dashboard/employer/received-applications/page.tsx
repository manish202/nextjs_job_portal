import { getCurrentUserDetails } from "@/features/auth/sessions";

const ReceivedJobApplicationsPage = async () => {
    const {status,message,user,userDetails} = await getCurrentUserDetails('employer');
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Received Applications</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Review and manage candidates who applied to your job postings.
                </p>
            </div>
            <h1>now i am done with this project. D/19/08/2026</h1>
        </div>
    )
}

export default ReceivedJobApplicationsPage;