"use client";
import { ReusableInput } from "./EmployerJobPostingForm";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationsSchema, type JobApplicationData } from "@/zod_schema/applicationsSchema";
import { jobApplicationAction } from "@/app/dashboard/applicant/ApplicantJobDataAction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ApplyNowPopupForm = ({toggleForm,jobId}:{toggleForm: () => void,jobId:number}) => {
    const router = useRouter();
    const form = useForm<JobApplicationData>({
        resolver: zodResolver(applicationsSchema),
        defaultValues: {
            jobId: jobId,
            linkedinUrl: "",
            coverLetter: "",
        }
    });
    const onSubmit = async (data:JobApplicationData) => {
        const {status,message} = await jobApplicationAction(data);
        status ? toast.success(message) : toast.error(message);
        if(status) router.push('/dashboard/applicant/applied-jobs');
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-5 text-2xl font-bold">Apply Now</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <ReusableInput form={form} fieldName="linkedinUrl" label="Linkedin Url" placeholder="linkedin profile url" />
                    <ReusableInput form={form} fieldName="coverLetter" label="Cover Letter" placeholder="cover letter" />
                    <div className="flex items-center justify-between">
                        <Button variant="destructive" onClick={toggleForm} size="lg">Cancel</Button>
                        <Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Applying..." : "Apply Now"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ApplyNowPopupForm;