'use client';
import { MapPin, BriefcaseBusiness, Banknote, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { currencySymbols } from "@/drizzle/table_schema/jobsTableSchema";
import { type ApplicantJob } from "@/app/dashboard/applicant/ApplicantJobDataAction";
import getPublishedTime from "@/lib/getPublishedTime";

const ApplicantJobPostCard = ({job}:{job:ApplicantJob}) => {
    const currency = currencySymbols[job.salaryCurrency ?? "INR"];
    return (
        <Card className="group transition-shadow hover:shadow-md">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <CardTitle className="text-lg font-semibold leading-6">{job.title}</CardTitle>
                        {job.companyName && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                <Building2 className="h-4 w-4 shrink-0" />
                                <span>{job.companyName}</span>
                            </div>
                        )}
                    </div>
                    {job.workType && (
                        <Badge variant="secondary" className="shrink-0 capitalize">{job.workType}</Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {job.location && (
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                                <MapPin className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Location</p>
                                <p className="text-sm font-medium text-gray-900">{job.location}</p>
                            </div>
                        </div>
                    )}
                    {(job.minSalary !== null && job.maxSalary !== null) && (
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-50 text-green-600">
                                <Banknote className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Salary</p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {currency} {job.minSalary.toLocaleString()}
                                    {" - "}
                                    {currency} {job.maxSalary.toLocaleString()}
                                    {job.salaryPeriod && (
                                        <span className="ml-1 text-xs font-normal text-gray-500">
                                            / {job.salaryPeriod}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-wrap items-center gap-3">
                        {job.workType && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <BriefcaseBusiness className="h-4 w-4" />
                                <span className="capitalize">{job.workType}</span>
                            </div>
                        )}
                        <span className="text-sm text-gray-400">•</span>
                        <p className="text-sm text-gray-500">
                            Published {getPublishedTime(job.createdAt)}
                        </p>
                    </div>
                    <div className="mt-5 flex justify-end border-t pt-4">
                        <Button size="sm">
                            <Link href={`/dashboard/applicant/find-jobs/${job.id}`}>View Details</Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ApplicantJobPostCard;