"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { employerSchema } from "@/zod_schema/employerSchema";
import updateUserDataAction from "@/app/dashboard/updateUserDataAction";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

type EmployerFormData = z.infer<typeof employerSchema>;
const orgTypeOptions = ["development","business","design"] as const;
const teamSizeOptions = ["1-5","6-20","21-50"] as const;
const currentYear: number = new Date().getFullYear();
const yearOfEstOptions: number[] = Array.from({length: currentYear - 1899}, (_,i) => currentYear - i);

const EmployerSettingsForm = ({userDetails}:any) => {
    const form = useForm<EmployerFormData>({
        resolver: zodResolver(employerSchema),
        defaultValues: {
            company_name: userDetails?.company_name ?? "",
            description: userDetails?.description ?? "",
            organizationType: userDetails?.organizationType ?? "development",
            teamSize: userDetails?.teamSize ?? "1-5",
            yearOfEstablishment: userDetails?.yearOfEstablishment ?? currentYear,
            location: userDetails?.location ?? "",
            websiteUrl: userDetails?.websiteUrl ?? "",
            // avatarUrl: userDetails?.avatarUrl ?? "",
            // bannerImageUrl: userDetails?.bannerImageUrl ?? "",
        },
    });
    const onSubmit = async (data: EmployerFormData) => {
        const {status,message} = await updateUserDataAction(data);
        status ? toast.success(message) : toast.error(message);
    };
    return (
        <div className="w-full rounded-xl border bg-white p-6 shadow-sm">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input id="company_name" placeholder="e.g. xyz services pvt ltd."
                        {...form.register("company_name")}
                    />
                    {form.formState.errors.company_name && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.company_name.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Tell candidates about your organization..."
                        rows={5} {...form.register("description")}
                    />
                    {form.formState.errors.description && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.description.message}
                        </p>
                    )}
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Organigation Type</Label>
                        <Controller name="organizationType" control={form.control}
                            render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Organigation Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {orgTypeOptions.map((org,i) => <SelectItem key={i} value={org}>{org}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            )}
                        />
                        {form.formState.errors.organizationType && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.organizationType.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>Team Size</Label>
                        <Controller name="teamSize" control={form.control}
                            render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Team Size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teamSizeOptions.map((size,i) => <SelectItem key={i} value={size}>{size}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            )}
                        />
                        {form.formState.errors.teamSize && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.teamSize.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Year Of Establishment</Label>
                        <Controller name="yearOfEstablishment" control={form.control}
                            render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Year Of Establishment" />
                                </SelectTrigger>
                                <SelectContent>
                                    {yearOfEstOptions.map((yr,i) => <SelectItem key={i} value={yr}>{yr}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            )}
                        />
                        {form.formState.errors.yearOfEstablishment && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.yearOfEstablishment.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g. Ahmedabad, Gujarat, India"
                            {...form.register("location")}
                        />
                        {form.formState.errors.location && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.location.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Website</Label>
                    <Input id="websiteUrl" type="url" placeholder="https://example.com"
                        {...form.register("websiteUrl")}
                    />
                    {form.formState.errors.websiteUrl && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.websiteUrl.message}
                        </p>
                    )}
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

export default EmployerSettingsForm;