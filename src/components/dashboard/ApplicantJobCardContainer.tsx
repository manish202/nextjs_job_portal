'use client';
import { useState, useEffect, useTransition } from "react";
import ApplicantJobPostCard from "@/components/dashboard/ApplicantJobPostCard";
import DashboardLoader from "@/components/dashboard/DashboardLoader";
import { getAllJobDataAction, type GetAllJobDataResponse, type ApplicantJob } from "@/app/dashboard/applicant/ApplicantJobDataAction";
import { ReusableInput, ReusableDropDown } from "./EmployerJobPostingForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { JOB_TYPE, WORK_TYPE, JOB_LEVEL } from "@/drizzle/table_schema/jobsTableSchema";
import { Button } from "@/components/ui/button";

const initialState: {data:ApplicantJob[],isError:null|string} = {data:[],isError:null}
export interface DefaultValues{
    search: string,
    jobType: typeof JOB_TYPE[number] | string,
    workType: typeof WORK_TYPE[number] | string,
    jobLevel: typeof JOB_LEVEL[number] | string,
}

const defaultValues: DefaultValues = {
    search: "",
    jobType: "",
    workType: "",
    jobLevel: "",
}

const ApplicantJobCardContainer = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [state,setState] = useState(initialState);
    const [isPending,startTransition] = useTransition();
    const form = useForm<DefaultValues>({
        defaultValues: {
            search: searchParams.get("search") ?? "",
            jobType: searchParams.get("jobType") ?? "",
            workType: searchParams.get("workType") ?? "",
            jobLevel: searchParams.get("jobLevel") ?? "",
        }
    });
    const fetchJobs = (data:DefaultValues):void => {
        startTransition(async () => {
            const response: GetAllJobDataResponse = await getAllJobDataAction(data);
            setState(() => {
                return response.status ? {data:response.data,isError:null} : {data:[],isError:response.message};
            });
        });
    }
    const handleFilterChange = () => {
        let timer:any;
        return ({ values }: {values: DefaultValues}) => {
            if(timer){ clearTimeout(timer); }
            timer = setTimeout(() => {
                const params = new URLSearchParams();
                if (values.search) params.set("search", values.search);
                if (values.jobType) params.set("jobType", values.jobType);
                if (values.workType) params.set("workType", values.workType);
                if (values.jobLevel) params.set("jobLevel", values.jobLevel);
                router.replace(`?${params.toString()}`, { scroll: false });
            }, 500);
        }
    }
    useEffect(() => {
        const subscription = form.subscribe({
            formState: { values: true, },
            callback: handleFilterChange(),
        });
        return () => subscription();
    }, [form]);
    useEffect(() => {
        const search = searchParams.get("search") ?? "";
        const jobType = searchParams.get("jobType") ?? "";
        const workType = searchParams.get("workType") ?? "";
        const jobLevel = searchParams.get("jobLevel") ?? "";
        fetchJobs({search,jobType,workType,jobLevel});
    }, [searchParams]);
    return (
        <>
            <div className="w-full rounded-xl border bg-white p-6 shadow-sm">
                <form className="space-y-6">
                    <ReusableInput form={form} fieldName="search" label="Search" placeholder="search for job" />
                    <div className="grid gap-6 md:grid-cols-3">
                        <ReusableDropDown form={form} fieldName="jobType" label="Job Type" placeholder="Select Job Type" items={JOB_TYPE} />
                        <ReusableDropDown form={form} fieldName="workType" label="Work Type" placeholder="Select Work Type" items={WORK_TYPE} />
                        <ReusableDropDown form={form} fieldName="jobLevel" label="Job Level" placeholder="Select Job Level" items={JOB_LEVEL} />
                    </div>
                </form>
                <Button onClick={() => form.reset(defaultValues)} size="sm">Reset</Button>
            </div>
            {isPending ? (<DashboardLoader />) : !isPending && state.data.length === 0 ? (
                <p className="mt-2 text-sm text-gray-500">No Jobs Found...</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {state.data.map((job:ApplicantJob) => <ApplicantJobPostCard key={job.id} job={job} /> )}
                </div>  
            )}
        </>
    )
}

export default ApplicantJobCardContainer;