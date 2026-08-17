'use client';
import { type Job } from "@/drizzle/table_schema/jobsTableSchema";
import { useState, useEffect, useTransition } from "react";
import { getJobDataAction, type GetJobDataResponse } from "@/app/dashboard/employer/JobDataAction";
import JobPostCard from "@/components/dashboard/JobPostCard";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

const initialState: {data:Job[],isError:null|string} = {data:[],isError:null}

const JobPostCardContainer = () => {
    const [state,setState] = useState(initialState);
    const [isPending,startTransition] = useTransition();
    const fetchJobs = ():void => {
        startTransition(async () => {
            const response: GetJobDataResponse = await getJobDataAction();
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
            {state.data.map((job:Job) => <JobPostCard key={job.id} job={job} fetchJobs={fetchJobs} /> )}
        </div>
    )
}

export default JobPostCardContainer;