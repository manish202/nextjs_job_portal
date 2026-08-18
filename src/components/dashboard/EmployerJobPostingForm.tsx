"use client";

import { useForm, Controller, type UseFormReturn, type FieldPath, type FieldValues, type SubmitHandler, } from "react-hook-form";
import { addJobSchema, updateJobSchema, type JobPostInsertFormData, type JobPostUpdateFormData } from "@/zod_schema/jobSchema";
import { type Job, SALARY_CURRENCY, SALARY_PERIOD, JOB_TYPE, WORK_TYPE, JOB_LEVEL, MIN_EDUCATION } from "@/drizzle/table_schema/jobsTableSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { insertJobDataAction, updateJobDataAction } from "@/app/dashboard/employer/JobDataAction";

type ReusableInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    fieldName: FieldPath<T>;
    label: string;
    placeholder: string;
    type?: string;
};

export const ReusableInput = <T extends FieldValues>({form,fieldName,label,placeholder,type="text"}:ReusableInputProps<T>) => {
    const error = form.formState.errors[fieldName];
    return (
        <div className="space-y-2">
            <Label htmlFor={fieldName}>{label}</Label>
            <Input type={type} id={fieldName} placeholder={placeholder}
                {...form.register(fieldName,{
                    valueAsNumber: type === "number",
                })}
            />
            {error && (
                <p className="text-sm text-destructive">
                    {error.message?.toString()}
                </p>
            )}
        </div>
    )
}

type ReusableTextareaProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    fieldName: FieldPath<T>;
    label: string;
    placeholder: string;
};

const ReusableTextarea = <T extends FieldValues>({form,fieldName,label,placeholder}:ReusableTextareaProps<T>) => {
    const error = form.formState.errors[fieldName];
    return (
        <div className="space-y-2">
            <Label htmlFor={fieldName}>{label}</Label>
            <Textarea id={fieldName} placeholder={placeholder}
                rows={5} {...form.register(fieldName)}
            />
            {error && (
                <p className="text-sm text-destructive">
                    {error.message?.toString()}
                </p>
            )}
        </div>
    )
}

type ReusableDropDownProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    fieldName: FieldPath<T>;
    label: string;
    placeholder: string;
    items: readonly string[];
};

export const ReusableDropDown = <T extends FieldValues>({form,fieldName,label,placeholder,items}:ReusableDropDownProps<T>) => {
    const error = form.formState.errors[fieldName];
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Controller name={fieldName} control={form.control}
                render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map((val:string,i:number) => <SelectItem key={i} value={val}>{val}</SelectItem>)}
                    </SelectContent>
                </Select>
                )}
            />
            {error && (
                <p className="text-sm text-destructive">
                    {error.message?.toString()}
                </p>
            )}
        </div>
    )
}

type ReusableCalenderProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    fieldName: FieldPath<T>;
    label: string;
    placeholder: string;
};

const ReusableCalender = <T extends FieldValues>({form,fieldName,label,placeholder}:ReusableCalenderProps<T>) => {
    const expiresAt = form.watch(fieldName);
    const error = form.formState.errors[fieldName];
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Popover>
                <PopoverTrigger render={(
                    <Button type="button" variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {expiresAt ? format(expiresAt, "dd/MM/yyyy") : placeholder}
                    </Button>
                )} />
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={expiresAt ?? undefined}
                        onSelect={(date) => { (form.setValue as any)(fieldName, date ?? null); }}
                    />
                </PopoverContent>
            </Popover>
            {error && (
                <p className="text-sm text-destructive">
                    {error.message?.toString()}
                </p>
            )}
        </div>
    )
}

type ReusableSwitchProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    fieldName: FieldPath<T>;
    label: string;
    onPlaceholder: string;
    offPlaceholder: string;
};

const ReusableSwitch = <T extends FieldValues>({form,fieldName,label,onPlaceholder,offPlaceholder}:ReusableSwitchProps<T>) => {
    const error = form.formState.errors[fieldName];
    return (
        <div className="space-y-2">
            <Label htmlFor={fieldName} className="mb-4">{label}</Label>
            <Controller name={fieldName} control={form.control}
                render={({ field }) => (
                    <div className="flex items-center gap-3">
                        <Switch
                            id={fieldName}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <Label htmlFor={fieldName} className="cursor-pointer">
                            {field.value ? onPlaceholder : offPlaceholder}
                        </Label>
                    </div>
                )}
            />
            {error && (
                <p className="text-sm text-destructive">
                    {error.message?.toString()}
                </p>
            )}
        </div>
    )
}

export const EmployerJobPostingAddForm = () => {
    const router = useRouter();
    const form = useForm<JobPostInsertFormData>({
        resolver: zodResolver(addJobSchema),
        defaultValues: {
            id: null,
            title: "",
            jobType: "on-site",
            workType: "full-time",
            jobLevel: "junior",
            location: "",
            tags: "",
            minSalary: null,
            maxSalary: null,
            salaryCurrency: "INR",
            salaryPeriod: "monthly",
            minEducation: "undergraduate",
            expiresAt: null,
            experience: "",
            isFeatured: false,
            description: "",
        }
    });
    const onSubmit: SubmitHandler<JobPostInsertFormData> = async (data: JobPostInsertFormData) => {
        const {status,message} = await insertJobDataAction(data);
        status ? toast.success(message) : toast.error(message);
        if(status) router.push('/dashboard/employer/my-jobs');
    };
    return (
        <div className="w-full rounded-xl border bg-white p-6 shadow-sm">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <ReusableInput form={form} fieldName="title" label="Job Title" placeholder="e.g. web application developer" />
                <div className="grid gap-6 md:grid-cols-3">
                    <ReusableDropDown form={form} fieldName="jobType" label="Job Type" placeholder="Select Job Type" items={JOB_TYPE} />
                    <ReusableDropDown form={form} fieldName="workType" label="Work Type" placeholder="Select Work Type" items={WORK_TYPE} />
                    <ReusableDropDown form={form} fieldName="jobLevel" label="Job Level" placeholder="Select Job Level" items={JOB_LEVEL} />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <ReusableInput form={form} fieldName="location" label="Job Location" placeholder="e.g. Ahmedabad, Delhi, Mumbai" />
                    <ReusableInput form={form} fieldName="tags" label="Job Tags" placeholder="e.g. React, Typescript, Node" />
                </div>
                <div className="grid gap-6 md:grid-cols-4">
                    <ReusableInput form={form} fieldName="minSalary" label="Min Salary" placeholder="e.g. 10000" type="number" />
                    <ReusableInput form={form} fieldName="maxSalary" label="Max Salary" placeholder="e.g. 50000" type="number" />
                    <ReusableDropDown form={form} fieldName="salaryCurrency" label="Salary Currency" placeholder="Select Salary Currency" items={SALARY_CURRENCY} />
                    <ReusableDropDown form={form} fieldName="salaryPeriod" label="Salary Period" placeholder="Select Salary Period" items={SALARY_PERIOD} />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <ReusableDropDown form={form} fieldName="minEducation" label="Min Education" placeholder="Select Min Education" items={MIN_EDUCATION} />
                    <ReusableCalender form={form} fieldName="expiresAt" label="Expiry Date" placeholder="Select expiry date" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <ReusableInput form={form} fieldName="experience" label="Experience" placeholder="e.g. worked as a jr. software engineer" />
                    <ReusableSwitch form={form} fieldName="isFeatured" label="Is Featured Job" onPlaceholder="Featured" offPlaceholder="Not Featured" />
                </div>
                <ReusableTextarea form={form} fieldName="description" label="Description" placeholder="Tell candidates about this job post..." />
                <div className="space-y-2">
                    {form.formState.isDirty && <p>Form data has changed.</p>}
                </div>
                <div className="flex justify-start border-t pt-5">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export const EmployerJobPostingUpdateForm = ({initialData}:{initialData:JobPostUpdateFormData | Job}) => {
    const router = useRouter();
    const form = useForm<JobPostUpdateFormData>({
        resolver: zodResolver(updateJobSchema),
        defaultValues: {
            id: initialData?.id ?? null,
            title: initialData?.title ?? "",
            jobType: initialData?.jobType ?? "on-site",
            workType: initialData?.workType ?? "full-time",
            jobLevel: initialData?.jobLevel ?? "junior",
            location: initialData?.location ?? "",
            tags: initialData?.tags ?? "",
            minSalary: initialData?.minSalary ?? null,
            maxSalary: initialData?.maxSalary ?? null,
            salaryCurrency: initialData?.salaryCurrency ?? "INR",
            salaryPeriod: initialData?.salaryPeriod ?? "monthly",
            minEducation: initialData?.minEducation ?? "undergraduate",
            expiresAt: initialData?.expiresAt ?? null,
            experience: initialData?.experience ?? "",
            isFeatured: initialData?.isFeatured ?? false,
            description: initialData?.description ?? "",
        }
    });
    const onSubmit: SubmitHandler<JobPostUpdateFormData> = async (data: JobPostUpdateFormData) => {
        const {status,message} = await updateJobDataAction(data);
        status ? toast.success(message) : toast.error(message);
        if(status) router.push('/dashboard/employer/my-jobs');
    };
    return (
        <div className="w-full rounded-xl border bg-white p-6 shadow-sm">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <ReusableInput form={form} fieldName="title" label="Job Title" placeholder="e.g. web application developer" />
                <div className="grid gap-6 md:grid-cols-3">
                    <ReusableDropDown form={form} fieldName="jobType" label="Job Type" placeholder="Select Job Type" items={JOB_TYPE} />
                    <ReusableDropDown form={form} fieldName="workType" label="Work Type" placeholder="Select Work Type" items={WORK_TYPE} />
                    <ReusableDropDown form={form} fieldName="jobLevel" label="Job Level" placeholder="Select Job Level" items={JOB_LEVEL} />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <ReusableInput form={form} fieldName="location" label="Job Location" placeholder="e.g. Ahmedabad, Delhi, Mumbai" />
                    <ReusableInput form={form} fieldName="tags" label="Job Tags" placeholder="e.g. React, Typescript, Node" />
                </div>
                <div className="grid gap-6 md:grid-cols-4">
                    <ReusableInput form={form} fieldName="minSalary" label="Min Salary" placeholder="e.g. 10000" type="number" />
                    <ReusableInput form={form} fieldName="maxSalary" label="Max Salary" placeholder="e.g. 50000" type="number" />
                    <ReusableDropDown form={form} fieldName="salaryCurrency" label="Salary Currency" placeholder="Select Salary Currency" items={SALARY_CURRENCY} />
                    <ReusableDropDown form={form} fieldName="salaryPeriod" label="Salary Period" placeholder="Select Salary Period" items={SALARY_PERIOD} />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <ReusableDropDown form={form} fieldName="minEducation" label="Min Education" placeholder="Select Min Education" items={MIN_EDUCATION} />
                    <ReusableCalender form={form} fieldName="expiresAt" label="Expiry Date" placeholder="Select expiry date" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <ReusableInput form={form} fieldName="experience" label="Experience" placeholder="e.g. worked as a jr. software engineer" />
                    <ReusableSwitch form={form} fieldName="isFeatured" label="Is Featured Job" onPlaceholder="Featured" offPlaceholder="Not Featured" />
                </div>
                <ReusableTextarea form={form} fieldName="description" label="Description" placeholder="Tell candidates about this job post..." />
                <div className="space-y-2">
                    {form.formState.isDirty && <p>Form data has changed.</p>}
                </div>
                <div className="flex justify-start border-t pt-5">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Updatting..." : "Update"}
                    </Button>
                </div>
            </form>
        </div>
    )
}