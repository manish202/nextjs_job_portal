'use client';
import { MapPin, BriefcaseBusiness, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type Job, currencySymbols } from "@/drizzle/table_schema/jobsTableSchema";

const JobPostCard = ({job}:{job:Job}) => {
    const handleDelete = async (jobId: number) => {
        if(confirm("Are you sure you want to delete this job?")){
            
        }
    }
    return (
        <Card className="group transition-shadow hover:shadow-md">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg font-semibold leading-6">
                        {job.title}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0 capitalize">
                        {job.jobType}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-50 text-green-600">
                        <Banknote className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Salary</p>
                        <p className="text-sm font-semibold text-gray-900">
                            {currencySymbols[job?.salaryCurrency ?? "INR"]}
                            {job.minSalary?.toLocaleString() ?? " Not Available"} -{" "}
                            {currencySymbols[job?.salaryCurrency ?? "INR"]}
                            {job.maxSalary?.toLocaleString() ?? " Not Available"}
                            <span className="ml-1 text-xs font-normal text-gray-500">
                                / {job.salaryPeriod}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                        <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900">{job.location}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-purple-50 text-purple-600">
                        <BriefcaseBusiness className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Work Type</p>
                        <p className="text-sm font-medium capitalize text-gray-900">{job.workType}</p>
                    </div>
                </div>
                <div className="mt-5 flex items-center justify-end gap-2 border-t pt-4">
                    <Button variant="outline" size="sm">
                        <Link href={`/dashboard/employer/my-jobs/${job.id}`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(job.id)}>
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default JobPostCard;