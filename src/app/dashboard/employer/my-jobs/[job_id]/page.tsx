import {EmployerJobPostingUpdateForm} from "@/components/dashboard/EmployerJobPostingForm";
import { getSingleJobDataAction, type GetSingleJobDataResponse } from "@/app/dashboard/employer/JobDataAction";

type Props = { params: Promise<{ job_id: string}>}

const EmployerJobPostingPage = async ({params}:Props) => {
    const {job_id} = await params;
    if(isNaN(Number(job_id))) return <h1>Invalid Job Id</h1>
    const response: GetSingleJobDataResponse = await getSingleJobDataAction(Math.abs(parseInt(job_id)));
    if(!response.status) return <h1>{response.message}</h1>
    if(!response.data) return <h1>Job Post Not Found</h1>
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Update Job</h1>
            <EmployerJobPostingUpdateForm initialData={response.data} />
        </div>
    )
}

export default EmployerJobPostingPage;