"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { type UserDetails, applicantSchema } from "@/zod_schema/applicantSchema";
import updateUserDataAction from "@/app/dashboard/updateUserDataAction";
import { toast } from "react-toastify";
import { ReusableInput, ReusableDropDown, ReusableCalender } from "./EmployerJobPostingForm";
import { EDUCATION, GENDER, MARITIAL_STATUS } from "@/drizzle/table_schema/applicantsTableSchema";

const ApplicantSettingPage = ({userDetails}:any) => {
    const form = useForm<UserDetails>({
        resolver: zodResolver(applicantSchema),
        defaultValues: {
            biography: userDetails?.biography ?? "",
            dateOfBirth: userDetails.dateOfBirth ?? null,
            nationality: userDetails.nationality ?? "",
            maritialStatus: userDetails.maritialStatus ?? "single",
            gender: userDetails.gender ?? "male",
            education: userDetails.education ?? "high school",
            experience: userDetails.experience ?? "",
            websiteUrl: userDetails.websiteUrl ?? "",
            location: userDetails.location ?? "",
        },
    });
    const onSubmit = async (data: UserDetails) => {
        const {status,message} = await updateUserDataAction(data);
        status ? toast.success(message) : toast.error(message);
    };
    return (
        <div className="w-full rounded-xl border bg-white p-6 shadow-sm">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <ReusableInput form={form} fieldName="biography" label="Biography" placeholder="biography" />
                    <ReusableInput form={form} fieldName="nationality" label="Nationality" placeholder="nationality" />
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    <ReusableDropDown form={form} fieldName="maritialStatus" label="Maritial Status" placeholder="Select Maritial Status" items={MARITIAL_STATUS} />
                    <ReusableDropDown form={form} fieldName="gender" label="Gender" placeholder="Select Gender" items={GENDER} />
                    <ReusableDropDown form={form} fieldName="education" label="Education" placeholder="Select Education" items={EDUCATION} />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <ReusableCalender form={form} fieldName="dateOfBirth" label="Date Of Birth" placeholder="Select Date Of Birth" />
                    <ReusableInput form={form} fieldName="experience" label="Experience" placeholder="experience" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <ReusableInput form={form} fieldName="websiteUrl" label="Website URL" placeholder="website Url" />
                    <ReusableInput form={form} fieldName="location" label="Location" placeholder="location" />
                </div>
                <div className="space-y-2">
                    {form.formState.isDirty && <p>Form data has changed.</p>}
                </div>
                <div className="flex justify-start border-t pt-5">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ApplicantSettingPage;