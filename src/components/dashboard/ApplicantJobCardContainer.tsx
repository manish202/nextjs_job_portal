'use client';
import { useState, useEffect, useTransition } from "react";
import ApplicantJobPostCard from "@/components/dashboard/ApplicantJobPostCard";
import DashboardLoader from "@/components/dashboard/DashboardLoader";
import { getAllJobDataAction, type GetAllJobDataResponse, type ApplicantJob } from "@/app/dashboard/applicant/ApplicantJobDataAction";

const initialState: {data:ApplicantJob[],isError:null|string} = {data:[],isError:null}

const ApplicantJobCardContainer = () => {
    const [state,setState] = useState(initialState);
    const [isPending,startTransition] = useTransition();
    const fetchJobs = ():void => {
        startTransition(async () => {
            const response: GetAllJobDataResponse = await getAllJobDataAction();
            setState(() => {
                return response.status ? {data:response.data,isError:null} : {data:[],isError:response.message};
            });
        });
    }
    useEffect(() => {
        fetchJobs();
    },[]);
    if(isPending) return <DashboardLoader />
    if(!isPending && state.data.length === 0){
        return (
            <p className="mt-2 text-sm text-gray-500">
                No Jobs Found...
            </p>
        )
    }
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {state.data.map((job:ApplicantJob) => <ApplicantJobPostCard key={job.id} job={job} /> )}
        </div>
    )
}

export default ApplicantJobCardContainer;