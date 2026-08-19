import ApplicantAppliedJobCard from "@/components/dashboard/ApplicantAppliedJobCard";
import { getAllJobApplicationDataAction, type ApplicantApplication } from "@/app/dashboard/applicant/ApplicantJobDataAction";

const ApplicantAppliedJobsPage = async () => {
    const response = await getAllJobApplicationDataAction();
    if(!response.status) return <h1>{response.message}</h1>
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Applied Jobs</h1>
                <p className="mt-2 text-sm text-gray-500">
                    You have applied for <b>{response.data.length} jobs.</b>
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {response.data.map((obj:ApplicantApplication) => <ApplicantAppliedJobCard key={obj.applications.id} application={obj} /> )}
            </div>
        </div>
    )
}

export default ApplicantAppliedJobsPage;