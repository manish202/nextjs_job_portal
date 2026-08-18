import ApplicantSingleJobCard from "@/components/dashboard/ApplicantSingleJobCard";
import { getSingleJobDetailsAction, type GetSingleJobDetailsResponse } from "@/app/dashboard/applicant/ApplicantJobDataAction";

type Props = { params: Promise<{ job_id: string}>}

const EmployerJobPostingPage = async ({params}:Props) => {
    const {job_id} = await params;
    if(isNaN(Number(job_id))) return <h1>Invalid Job Id</h1>
    const response: GetSingleJobDetailsResponse = await getSingleJobDetailsAction(Math.abs(parseInt(job_id)));
    if(!response.status) return <h1>{response.message}</h1>
    if(!response.data) return <h1>Job Post Not Found</h1>
    return (
        <div className="space-y-8">
            <ApplicantSingleJobCard job={response.data} />
        </div>
    )
}

export default EmployerJobPostingPage;